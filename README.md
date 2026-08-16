# Smit — Graphic Design Portfolio

A responsive portfolio for an independent graphic designer, built with React,
TypeScript, vinext and Vite. The site includes filtered concept work, campaign
showcases, services, a software toolkit, process, about and an email-based
inquiry form.

## Local development

Requirements:

- Node.js 22.13 or newer
- pnpm 11

~~~bash
pnpm install
pnpm dev
~~~

Open http://localhost:3000.

## Production verification

~~~bash
pnpm lint
pnpm build
pnpm test
~~~

## Personal details

Edit app/portfolio-data.ts to update:

- name and professional title
- email and location
- WhatsApp URL
- Instagram URL
- projects, services and software

Empty WhatsApp and Instagram values intentionally keep those public links
hidden until valid URLs are supplied.

All demo projects are labelled as concept work and make no real client or
performance claims.
