import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
const site = process.env.PUBLIC_SITE_URL || 'https://bastide-horizons-wellness.ngoc521346a.chatgpt.site';
export default defineConfig({
 site,
 integrations:[sitemap({
  filter:page=>new URL(page).pathname!=='/',
  i18n:{defaultLocale:'fr',locales:{fr:'fr-FR',en:'en-GB',nl:'nl-NL',de:'de-DE',vi:'vi-VN'}},
  serialize:item=>({...item,links:[...(item.links||[]),{lang:'x-default',url:new URL(`/fr/${new URL(item.url).pathname.replace(/^\/(?:fr|en|nl|de|vi)\//,'')}`,site).href}]})
 })],
 output:'static', trailingSlash:'always', devToolbar:{enabled:false}
});
