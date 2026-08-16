import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", process.pid + "-" + Date.now());
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html", host: "localhost" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the finished portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Smit — Graphic Designer &amp; Visual Creative<\/title>/i);
  assert.match(html, /Bold visuals/i);
  assert.match(html, /Selected work/i);
  assert.match(html, /Software cards are editable/i);
  assert.match(html, /smitptl\.888@gmail\.com/i);
  assert.match(html, /Concept Project/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/i);
});

test("includes the finished social sharing image", async () => {
  await access(new URL("../public/og.png", import.meta.url));
});
