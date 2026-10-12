import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
const site = process.env.PUBLIC_SITE_URL || 'https://ngocngoccm1.github.io';
const base = `/${(process.env.PUBLIC_BASE_PATH || '/Bastide-Horizons-Wellness/').replace(/^\/+|\/+$/g, '')}/`.replace(/^\/\/$/, '/');
export default defineConfig({
 site,base,
 integrations:[sitemap({
  filter:page=>new URL(page).pathname!==base,
  i18n:{defaultLocale:'fr',locales:{fr:'fr-FR',en:'en-GB',nl:'nl-NL',de:'de-DE',vi:'vi-VN'}},
  serialize:item=>({...item,links:[...(item.links||[]),{lang:'x-default',url:new URL(`${base}fr/${new URL(item.url).pathname.slice(base.length).replace(/^(?:fr|en|nl|de|vi)\//,'')}`,site).href}]})
 })],
 output:'static', trailingSlash:'always', devToolbar:{enabled:false}
});
