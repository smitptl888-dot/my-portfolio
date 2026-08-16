import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

async function render() {
  const serverUrl = new URL(
    "../.vercel/output/functions/__server.func/index.mjs",
    import.meta.url,
  );
  serverUrl.searchParams.set("test", process.pid + "-" + Date.now());
  const { default: server } = await import(serverUrl.href);

  return server.fetch(
    new Request("https://portfolio.example/", {
      headers: { accept: "text/html", host: "localhost" },
    }),
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
