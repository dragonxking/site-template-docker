#!/usr/bin/env node
/**
 * 上线前检查：确认模板占位内容已替换、导航/链接/内容目录相互一致。
 *
 *   npm run check:site
 *
 * 有 error 时退出码为 1（部署工作流会在构建前运行本脚本）；warning 仅提示。
 * 模板仓库本身存在占位内容，运行会报错，这是预期行为。
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];
const warnings = [];
const read = (file) => (fs.existsSync(path.join(root, file)) ? fs.readFileSync(path.join(root, file), "utf8") : "");
const readJson = (file) => JSON.parse(read(file) || "{}");

// 与 src/lib/content.ts 的 fileNameToSlug 保持一致
const fileNameToSlug = (name) =>
  name.replace(/\.mdx$/, "").replace(/[^a-zA-Z0-9\-_]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");

function listMdx(dir, base = []) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory()) return listMdx(path.join(dir, entry.name), [...base, entry.name]);
    return entry.name.endsWith(".mdx") ? [[...base, fileNameToSlug(entry.name)].join("/")] : [];
  });
}

// 1. 占位内容
const PLACEHOLDER = /Example Game|EXAMPLECODE|\bPlaceholder\b/;
const localesDir = path.join(root, "src/locales");
const locales = fs.readdirSync(localesDir).filter((f) => f.endsWith(".json")).map((f) => f.replace(/\.json$/, ""));
for (const locale of locales) {
  const text = read(`src/locales/${locale}.json`);
  const hit = text.match(PLACEHOLDER);
  if (hit) errors.push(`src/locales/${locale}.json 仍含模板占位内容："${hit[0]}"`);
}
const wrangler = read("wrangler.jsonc");
if (wrangler && /example\.com|example-game-site/.test(wrangler)) errors.push("wrangler.jsonc 的 name / routes.pattern 仍是占位值");
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
if (!siteUrl) errors.push("环境变量 NEXT_PUBLIC_SITE_URL 未设置");
else if (/example\.com|localhost/.test(siteUrl)) errors.push(`NEXT_PUBLIC_SITE_URL 不是正式域名：${siteUrl}`);
else if (wrangler) {
  const host = new URL(siteUrl).host;
  if (!wrangler.includes(`"${host}"`)) warnings.push(`wrangler.jsonc 的 routes.pattern 与 NEXT_PUBLIC_SITE_URL 的域名（${host}）不一致`);
}

// 2. 导航
const nav = read("src/config/navigation.ts");
const navItems = [...nav.matchAll(/key:\s*"(\w+)",\s*path:\s*"\/([\w-]+)"/g)].map((m) => ({ key: m[1], type: m[2] }));
const contentTypes = navItems.map((item) => item.type);
if (navItems.length === 0) errors.push("src/config/navigation.ts 中没有解析到任何内容分类");
const en = readJson("src/locales/en.json");
for (const { key } of navItems) {
  if (!en.nav?.[key]) errors.push(`src/locales/en.json 缺少 nav.${key}`);
}

// 3. 内容目录
const hasContent = new Map();
for (const locale of locales) {
  const localeDir = path.join(root, "content", locale);
  if (!fs.existsSync(localeDir)) continue;
  for (const entry of fs.readdirSync(localeDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (!contentTypes.includes(entry.name)) {
      warnings.push(`content/${locale}/${entry.name}/ 不在 navigation.ts 的内容分类中，页面不会生成、导航不会显示`);
    }
  }
}
for (const type of contentTypes) hasContent.set(type, listMdx(path.join(root, "content/en", type)));
const totalArticles = [...hasContent.values()].reduce((sum, list) => sum + list.length, 0);
if (totalArticles === 0) errors.push("content/en/ 下没有任何 .mdx 文章");
for (const [type, list] of hasContent) {
  if (list.length === 0) warnings.push(`分类 /${type} 没有英文文章（列表页将为空）`);
}

// 4. 站内链接必须指向真实页面：explore.modules[].href 与 site.ts 的 paths
function checkInternalPath(href, source) {
  if (!href.startsWith("/")) return errors.push(`${source}: "${href}" 不是站内路径`);
  const [type, ...rest] = href.replace(/^\//, "").split("/");
  if (!contentTypes.includes(type)) return errors.push(`${source}: "${href}" 的分类 "${type}" 不在 navigation.ts 中（页面不存在）`);
  if (rest.length > 0 && !(hasContent.get(type) ?? []).includes(rest.join("/"))) {
    errors.push(`${source}: "${href}" 在 content/en/${type}/ 下找不到对应文章`);
  }
}
for (const mod of en.home?.explore?.modules ?? []) checkInternalPath(mod.href, `home.explore.modules[${mod.order}].href`);
const sitePaths = read("src/config/site.ts").match(/paths:\s*\{([\s\S]*?)\}/);
for (const m of (sitePaths?.[1] ?? "").matchAll(/(\w+):\s*"([^"]+)"/g)) {
  if (m[1] === "codes" && (en.sidebarCodes ?? []).length === 0) continue; // 没有侧栏兑换码时不会渲染该链接
  checkInternalPath(m[2], `site.ts paths.${m[1]}`);
}

// 5. 可选项提醒
const siteTs = read("src/config/site.ts");
if (/youtubeVideoId:\s*""/.test(siteTs)) warnings.push("site.ts 的 youtubeVideoId 为空：首页不显示 trailer");
if (/play:\s*""/.test(siteTs)) warnings.push("site.ts 的 links.play 为空：footer 与首页 CTA 不显示游戏入口");

for (const w of warnings) console.warn(`warn  ${w}`);
for (const e of errors) console.error(`error ${e}`);
if (errors.length > 0) {
  console.error(`\ncheck:site 失败：${errors.length} 个错误，${warnings.length} 个警告`);
  process.exit(1);
}
console.log(`check:site 通过（${warnings.length} 个警告）`);
