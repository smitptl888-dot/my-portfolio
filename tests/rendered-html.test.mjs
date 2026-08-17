import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const serverUrl = new URL(
    "../.vercel/output/functions/__server.func/index.mjs",
    import.meta.url,
  );
  serverUrl.searchParams.set("test", process.pid + "-" + Date.now());
  const { default: server } = await import(serverUrl.href);

  return server.fetch(
    new Request(`https://portfolio.example${pathname}`, {
      headers: { accept: "text/html", host: "localhost" },
    }),
  );
}

test("server-renders the finished portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Smit Patel \| Graphic Designer Portfolio<\/title>/i);
  assert.match(html, /Graphic Designer Portfolio/i);
  assert.match(html, /Design specialist/i);
  assert.match(html, /Creative Toolkit/i);
  assert.match(html, /Interactive creative trail/i);
  assert.match(html, /Adobe Photoshop/i);
  assert.match(html, /Adobe Illustrator/i);
  assert.match(html, /Adobe Lightroom/i);
  assert.match(html, /Figma/i);
  assert.match(html, /Canva Pro/i);
  assert.match(html, /Adobe InDesign/i);
  assert.match(html, /Adobe Premiere Pro/i);
  assert.match(html, /After Effects/i);
  assert.match(html, /WordPress/i);
  assert.match(html, /Filmora/i);
  assert.match(html, /software-tube/i);
  assert.match(html, /draggable software loop/i);
  assert.match(html, /smit-patel-profile-2026\.jpg/i);
  for (let index = 1; index <= 16; index += 1) {
    assert.match(html, new RegExp(`radial-creative-${String(index).padStart(2, "0")}\\.jpg`, "i"));
  }
  assert.equal((html.match(/data-radial-card/g) ?? []).length, 16);
  assert.equal((html.match(/data-radial-leader="true"/g) ?? []).length, 1);
  assert.match(html, /data-radial-leader="true"[\s\S]*?radial-creative-15\.jpg/i);
  assert.match(html, /playful kinetic design character in motion/i);
  assert.match(html, /MOVE ✦ MIX ✦ MAKE ✦ PLAY/i);
  assert.match(html, /AI-assisted creative/i);
  assert.match(html, /LET(?:&#x27;|')S(?:<br\s*\/?>|\s+)WORK/i);
  assert.match(html, /smitptl\.888@gmail\.com/i);
  assert.match(html, /instagram\.com\/smit8\._/i);
  assert.doesNotMatch(html, /Featured Works/i);
  assert.doesNotMatch(html, /LET(?:&#x27;|')S TALK/i);
  assert.doesNotMatch(html, /name="details"/i);
  assert.doesNotMatch(html, /Concept Project/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/i);
});

test("includes the finished social sharing image", async () => {
  await access(new URL("../public/og.png", import.meta.url));
});

test("server-renders the preserved About route as the services experience", async () => {
  const response = await render("/about");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /09 focused services/i);
  assert.match(html, /Portrait of Smit Patel/i);
  assert.match(html, /AI-assisted creative/i);
});

test("server-renders the dedicated Services route", async () => {
  const response = await render("/services");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Graphic Design Services/i);
  assert.match(html, /Software expertise/i);
  assert.match(html, /AI-Assisted Visuals/i);
  assert.match(html, /Adobe Photoshop/i);
});

test("server-renders the dedicated Work route", async () => {
  const response = await render("/work");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /All work/i);
  assert.match(html, /Fashion Banner Direction/i);
  assert.match(html, /Campaign Visual Frame/i);
  assert.match(html, /Typography\/Layout/i);
});

test("server-renders the dedicated Contact route and inquiry fields", async () => {
  const response = await render("/contact");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Contact Smit Patel/i);
  assert.match(html, /Available for freelance projects/i);
  assert.match(html, /Start a design project/i);
  assert.match(html, /LET(?:&#x27;|')S CONTACT/i);
  assert.match(html, /name="name"/i);
  assert.match(html, /name="email"/i);
  assert.match(html, /name="phone"/i);
  assert.match(html, /name="brand"/i);
  assert.match(html, /name="service"/i);
  assert.match(html, /name="budget"/i);
  assert.match(html, /name="timeline"/i);
  assert.match(html, /name="details"/i);
  assert.match(html, />SUBMIT</i);
  assert.match(html, /76986 41630/i);
});
