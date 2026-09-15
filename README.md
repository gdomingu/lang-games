# Language Games

A [TanStack Start](https://tanstack.com/start) app containing Boggle and Scribbler.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). This starts Vite and the local Socket.IO relay together. To run only the web app, use `npm run dev:web`.

## Checks

```bash
npm run typecheck
npm run build
```

## Deploy to Vercel

Import the repository into Vercel. The checked-in `vercel.json` selects Vite and runs the TanStack Start production build.

Scribbler uses Socket.IO. Vercel Functions do not provide a persistent WebSocket server, so deploy `server.cjs` to a long-running Node host and set this Vercel environment variable:

```text
VITE_SOCKET_URL=https://your-socket-service.example.com
```

Set `APP_ORIGIN` on the Socket.IO host to the deployed Vercel URL. The relay listens on `SOCKET_PORT` (default `3001`). Boggle and the rest of the site need no additional services.
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
