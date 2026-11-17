import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
let server;
async function render(path = "/") {
  server ??= (await import("../.vercel/output/functions/__server.func/index.mjs")).default;
  const response = await server.fetch(new Request("https://portfolio.example" + path, { headers: { accept: "text/html", host: "localhost" } }));
  assert.equal(response.status, 200, path);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html/i);
  return response.text();
}
test("homepage keeps its existing creative animation", async () => {
  const html = await render("/");
  assert.match(html, /Smit Patel/);
  assert.match(html, /<img\b/);
  assert.doesNotMatch(html, /class="secondary-site"/);
});
for (const [path, title] of [["/work", "Selected Work"], ["/services", "Graphic Design Services"], ["/about", "About Smit Patel"], ["/contact", "Contact Smit Patel"]]) {
  test(path + " is complete and server-rendered", async () => {
    const html = await render(path);
    assert.ok(html.includes(title));
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
    assert.match(html, /id="main-content"/);
    assert.match(html, /Skip to content/);
    assert.match(html, /Footer navigation/);
    assert.match(html, /Pause motion/);
    if (path === "/work") {
      assert.equal((html.match(/<img\b/g) ?? []).length, 30);
      for (const file of ["01-poster-design", "02-brand-identity", "03-social-creatives", "04-campaign-visuals", "05-logo-identity", "06-type-layout"]) {
        assert.ok(html.includes(`/portfolio/work-concepts/${file}.jpg`));
        assert.ok((await readFile(new URL(`../public/portfolio/work-concepts/${file}.jpg`, import.meta.url))).length > 0);
      }
    } else assert.doesNotMatch(html, /<img\b|<picture\b|<svg\b|<video\b/i);
    assert.doesNotMatch(html, /mailto:|smitptl\.888@gmail\.com/);
    for (const route of ["/work", "/about", "/services", "/contact"]) assert.ok(html.includes('href="' + route + '"'));
  });
}
test("all existing project records and filters are retained", async () => {
  const html = await render("/work");
  assert.equal((html.match(/class="sub-project-entry"/g) ?? []).length, 24);
  assert.match(html, /Fashion Banner Direction/);
  assert.match(html, /Industrial Campaign Systems/);
  assert.match(html, /Product Comparison &amp; Information/);
  assert.match(html, /Filter projects/);
});
test("every collection has at least seven distinct existing and attributed artworks", async () => {
  const ts = await import("typescript");
  const original = await readFile(new URL("../app/portfolio-data.ts", import.meta.url), "utf8");
  const galleries = (await readFile(new URL("../app/work-gallery-data.ts", import.meta.url), "utf8")).replace(/^import .*;\r?\n/, "");
  const source = ts.transpileModule(original + "\n" + galleries, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  const { workProjects } = await import("data:text/javascript;base64," + Buffer.from(source).toString("base64"));
  assert.equal(workProjects.length, 24);
  for (const project of workProjects) {
    assert.ok(project.artworks.length >= 7, project.title);
    assert.equal(new Set(project.artworks.map(item => item.src)).size, project.artworks.length, project.title);
    for (const artwork of project.artworks) {
      assert.ok(artwork.title);
      assert.ok(["Supplied artwork", "AI-assisted concept"].includes(artwork.provenance));
      assert.ok((await readFile(new URL("../public" + artwork.src, import.meta.url))).length > 0, artwork.src);
    }
  }
});
test("all services and toolkit entries remain present", async () => {
  const html = await render("/services");
  assert.equal((html.match(/class="sub-service-row"/g) ?? []).length, 9);
  assert.equal((html.match(/class="sub-tool-row"/g) ?? []).length, 10);
  assert.match(html, /AI-Assisted Visuals/);
});
test("inquiries are drafts and never claim to be sent", async () => {
  const html = await render("/contact");
  for (const name of ["name","email","phone","brand","service","budget","timeline","details","consent"]) assert.ok(html.includes('name="' + name + '"'));
  assert.match(html, /Prepare inquiry/);
  assert.match(html, /Nothing is sent automatically/);
  assert.match(html, /76986 41630/);
});
test("styles have no image resources and respect motion preferences", async () => {
  const css = await readFile(new URL("../app/secondary.css", import.meta.url), "utf8");
  assert.doesNotMatch(css, /url\(/i);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /max-width:760px/);
});
