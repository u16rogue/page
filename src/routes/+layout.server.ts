import { base } from "$app/paths";
import type { LayoutServerLoad } from "./$types";
import fs from "node:fs";
import { load_metadata } from "$lib/server/core/routemeta";

export const prerender = true;

export const load: LayoutServerLoad = async function (event) {
  const routes_dir = 'src/routes';
  const visible_nav_routes = [
    {
      href: `${base}/`,
      display: 'home',
    } as any,
  ];

  for (const file of fs.readdirSync(routes_dir)) {
    const route_metadata = load_metadata(file);

    if (!route_metadata.ok) {
      console.warn(`skipped ${file} due to: ${route_metadata.message}`);
      continue;
    }

    if (route_metadata?.data?.nav?.include === true) {
      const href =
           route_metadata?.data?.nav?.display?.href
        || `${base}/${/src\/routes\/(.*)*\/\+page\.server\.ts/g.exec(route_metadata.filepath)?.[1] || 'error?reason=invalidroute'}`
      ;
      const display = route_metadata?.data?.nav?.display?.text || /\/page[\w\d]*\/(.*)*/g.exec(href)?.[1] || '<no display text>';
      visible_nav_routes.push({ href, display });
    }
  }

  return {
    _meta: {
      nav: {
        display: undefined,
        href: undefined,
        navs: visible_nav_routes.map((x: any) => {
          return {
            ...x,
          };
        }),
      },
      page: {
        title: undefined,
      },
    },
  };
};
