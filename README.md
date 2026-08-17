# Smit — Graphic Design Portfolio

A responsive editorial portfolio for graphic designer Smit Patel, built with
React, TypeScript, Vinext and Vite. The site includes 24 real portfolio visuals,
category filtering, an immersive project viewer, services, toolkit, process,
About route, WhatsApp contact and an email-based inquiry form.

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
- email, phone and availability
- WhatsApp and Instagram URLs
- projects, categories, services and software

Portfolio artwork is stored in `public/portfolio`. Project records support
optional year, client and brand fields plus hero and gallery image arrays, so
future case studies can be expanded without changing the page structure.
