import { useState } from "react";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRoute, createRouter, lazyRouteComponent } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Container } from "@mui/material";
import AbcIcon from "@mui/icons-material/Abc.js";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft.js";
import DrawIcon from "@mui/icons-material/Draw.js";
import MenuIcon from "@mui/icons-material/Menu.js";
import MuiAppBar from "@mui/material/AppBar/index.js";
import Box$1 from "@mui/material/Box/index.js";
import CssBaseline from "@mui/material/CssBaseline/index.js";
import Divider from "@mui/material/Divider/index.js";
import MuiDrawer from "@mui/material/Drawer/index.js";
import IconButton$1 from "@mui/material/IconButton/index.js";
import List from "@mui/material/List/index.js";
import ListItem from "@mui/material/ListItem/index.js";
import ListItemButton from "@mui/material/ListItemButton/index.js";
import ListItemIcon from "@mui/material/ListItemIcon/index.js";
import ListItemText from "@mui/material/ListItemText/index.js";
import Toolbar from "@mui/material/Toolbar/index.js";
import Typography$1 from "@mui/material/Typography/index.js";
import { styled, useTheme } from "@mui/material/styles/index.js";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region src/components/NavLayout.tsx
var drawerWidth = 240;
var openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen
	}),
	overflowX: "hidden"
});
var closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: { width: `calc(${theme.spacing(8)} + 1px)` }
});
var DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar
}));
var AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	backgroundColor: "#80cbc4",
	color: "#424242",
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	...open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	}
}));
var Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme)
	},
	...!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme)
	}
}));
function NavLayout({ children }) {
	useTheme();
	const [open, setOpen] = useState(false);
	return /* @__PURE__ */ jsxs(Box$1, {
		sx: { display: "flex" },
		children: [
			/* @__PURE__ */ jsx(CssBaseline, {}),
			/* @__PURE__ */ jsx(AppBar, {
				position: "fixed",
				open,
				children: /* @__PURE__ */ jsxs(Toolbar, { children: [/* @__PURE__ */ jsx(IconButton$1, {
					color: "inherit",
					"aria-label": "open drawer",
					onClick: () => setOpen(true),
					edge: "start",
					sx: {
						marginRight: 5,
						...open && { display: "none" }
					},
					children: /* @__PURE__ */ jsx(MenuIcon, {})
				}), /* @__PURE__ */ jsx(Link, {
					to: "/",
					style: {
						color: "inherit",
						textDecoration: "inherit"
					},
					children: /* @__PURE__ */ jsx(Typography$1, {
						variant: "h6",
						noWrap: true,
						component: "div",
						children: "Language Games"
					})
				})] })
			}),
			/* @__PURE__ */ jsxs(Drawer, {
				variant: "permanent",
				open,
				children: [
					/* @__PURE__ */ jsx(DrawerHeader, { children: /* @__PURE__ */ jsx(IconButton$1, {
						onClick: () => setOpen(false),
						children: /* @__PURE__ */ jsx(ChevronLeftIcon, {})
					}) }),
					/* @__PURE__ */ jsx(Divider, {}),
					/* @__PURE__ */ jsxs(List, { children: [/* @__PURE__ */ jsx(ListItem, {
						disablePadding: true,
						sx: { display: "block" },
						children: /* @__PURE__ */ jsx(Link, {
							to: "/scribbler",
							style: {
								color: "inherit",
								textDecoration: "inherit"
							},
							children: /* @__PURE__ */ jsxs(ListItemButton, {
								sx: {
									minHeight: 48,
									justifyContent: open ? "initial" : "center",
									px: 2.5
								},
								children: [/* @__PURE__ */ jsx(ListItemIcon, {
									sx: {
										minWidth: 0,
										mr: open ? 3 : "auto",
										justifyContent: "center"
									},
									children: /* @__PURE__ */ jsx(DrawIcon, {})
								}), /* @__PURE__ */ jsx(ListItemText, {
									primary: "Scribbler",
									sx: { opacity: open ? 1 : 0 }
								})]
							})
						})
					}), /* @__PURE__ */ jsx(ListItem, {
						disablePadding: true,
						sx: { display: "block" },
						children: /* @__PURE__ */ jsx(Link, {
							to: "/boggle",
							style: {
								color: "inherit",
								textDecoration: "inherit"
							},
							children: /* @__PURE__ */ jsxs(ListItemButton, {
								sx: {
									minHeight: 48,
									justifyContent: open ? "initial" : "center",
									px: 2.5
								},
								children: [/* @__PURE__ */ jsx(ListItemIcon, {
									sx: {
										minWidth: 0,
										mr: open ? 3 : "auto",
										justifyContent: "center"
									},
									children: /* @__PURE__ */ jsx(AbcIcon, {})
								}), /* @__PURE__ */ jsx(ListItemText, {
									primary: "Boggle",
									sx: { opacity: open ? 1 : 0 }
								})]
							})
						})
					})] })
				]
			}),
			/* @__PURE__ */ jsxs(Box$1, {
				component: "main",
				sx: {
					flexGrow: 1,
					p: 3
				},
				children: [/* @__PURE__ */ jsx(DrawerHeader, {}), children]
			})
		]
	});
}
//#endregion
//#region src/routes/__root.tsx
var Route$5 = createRootRoute({
	head: () => ({ meta: [
		{ charSet: "utf-8" },
		{
			name: "viewport",
			content: "width=device-width, initial-scale=1"
		},
		{ title: "Language Games" },
		{
			name: "description",
			content: "A site for playing games in different languages."
		}
	] }),
	component: RootComponent
});
function RootComponent() {
	return /* @__PURE__ */ jsx(RootDocument, { children: /* @__PURE__ */ jsx(NavLayout, { children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(Outlet, {}) }) }) });
}
function RootDocument({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", {
			style: {
				backgroundColor: "rgba(243, 246, 249, 0.6)",
				margin: 0
			},
			children: [children, /* @__PURE__ */ jsx(Scripts, {})]
		})]
	});
}
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter$4 = () => import("./routes-7vsMgRON.js");
var Route$4 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
//#endregion
//#region src/routes/boggle.tsx
var $$splitComponentImporter$3 = () => import("./boggle-CAhl0d2r.js");
var Route$3 = createFileRoute("/boggle")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
//#endregion
//#region src/routes/scribbler.tsx
var $$splitComponentImporter$2 = () => import("./scribbler-xA3aGEcJ.js");
var Route$2 = createFileRoute("/scribbler")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
//#endregion
//#region src/routes/scribbler.join.tsx
var $$splitComponentImporter$1 = () => import("./scribbler.join-CufHfxq0.js");
var Route$1 = createFileRoute("/scribbler/join")({
	validateSearch: (search) => ({ roomCode: typeof search.roomCode === "string" ? search.roomCode : "" }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
//#endregion
//#region src/routes/scribbler.new.tsx
var $$splitComponentImporter = () => import("./scribbler.new-Baqy-2ZY.js");
var Route = createFileRoute("/scribbler/new")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
//#endregion
//#region src/routeTree.gen.ts
var IndexRoute = Route$4.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$5
});
var BoggleRoute = Route$3.update({
	id: "/boggle",
	path: "/boggle",
	getParentRoute: () => Route$5
});
var ScribblerRoute = Route$2.update({
	id: "/scribbler",
	path: "/scribbler",
	getParentRoute: () => Route$5
});
var ScribblerRouteChildren = {
	ScribblerJoinRoute: Route$1.update({
		id: "/join",
		path: "/join",
		getParentRoute: () => ScribblerRoute
	}),
	ScribblerNewRoute: Route.update({
		id: "/new",
		path: "/new",
		getParentRoute: () => ScribblerRoute
	})
};
var rootRouteChildren = {
	IndexRoute,
	BoggleRoute,
	ScribblerRoute: ScribblerRoute._addFileChildren(ScribblerRouteChildren)
};
var routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		scrollRestoration: true
	});
}
//#endregion
export { getRouter, Route$1 as n, router_exports as t };
