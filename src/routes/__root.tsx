import {Container} from "@mui/material";
import {HeadContent, Outlet, Scripts, createRootRoute} from "@tanstack/react-router";
import type {ReactNode} from "react";
import NavLayout from "../components/NavLayout";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {charSet: "utf-8"},
      {name: "viewport", content: "width=device-width, initial-scale=1"},
      {title: "Language Games"},
      {name: "description", content: "A site for playing games in different languages."},
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <NavLayout>
        <Container>
          <Outlet />
        </Container>
      </NavLayout>
    </RootDocument>
  );
}

function RootDocument({children}: Readonly<{children: ReactNode}>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body style={{backgroundColor: "rgba(243, 246, 249, 0.6)", margin: 0}}>
        {children}
        <Scripts />
      </body>
    </html>
  );
}