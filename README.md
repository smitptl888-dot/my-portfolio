# Smit Patel — Portfolio

Image-free, responsive secondary pages using the existing content: 24 project
records, 9 services, 10 creative tools, design process, About, and Contact.
The existing homepage is unchanged, including its images, motion and hover effects.
Secondary-page styles are isolated under `.secondary-site` with `sub-` class names
so they cannot redesign the homepage, including after client-side navigation.
No new images, fonts, accounts, or third-party UI dependencies are required.

## Only remaining setup: email

In `app/contact-settings.ts`, set `contactEmail` to your email address.
It is intentionally blank. This one setting enables the email address on Contact,
the secondary-page footer email link, and "Open email draft" in the inquiry form.
The existing homepage contact data is deliberately unchanged.

The form validates the visitor's details and prepares a reviewable message.
It does **not** send email from a server or claim a message was delivered.
Visitors send the draft from their own email or WhatsApp app, or copy it.
Existing phone, WhatsApp, and Instagram contacts remain available before email setup.

## Development

Node.js 22.13+ and pnpm 11:
```sh
pnpm install
pnpm run dev
```
Preview: http://localhost:3000

## Verification

```sh
pnpm run lint
node node_modules/typescript/bin/tsc --noEmit
pnpm test
```
The test command runs the production Vercel build followed by server-rendered tests.
`pnpm build` is also available for a standalone production build.

## Pages and interactions

- Home: preserved original layout, artwork trail, hover, toolkit and content.
- Work: all 24 existing projects, URL-addressable category filters, keyboard-accessible
  project details and next-project navigation.
- Services: 9 services linking to a preselected inquiry, toolkit, process and AI workflow.
- About: existing designer information and design focus, without a portrait.
- Contact: validated inquiry preparation, clear sharing controls and existing contact links.
- A native modal mobile menu provides focus trapping, Escape dismissal and focus restoration.
- Secondary-page footer motion control pauses decorative animation; system reduced-motion is respected.
- No scroll hijacking or autoplay media.

The supplied Mondragon reference returned "Site Not Found" during this revision.
The design therefore preserves the reference-inspired black/paper/orange editorial
direction and typographic motion from the existing portfolio rather than claiming
a verified pixel-for-pixel match to an unavailable site.

Existing Vercel hosting configuration and Git remote remain unchanged.
This revision is local until approved for publication.
