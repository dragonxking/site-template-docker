import en from "@/locales/en.json";

/**
 * 站点级配置：所有「游戏专属」且不随语言变化的数据都集中在这里。
 *
 * 新建站点时需要替换的内容（完整清单见 README.md「新站替换清单」）：
 *   1. 本文件：官方链接、YouTube 视频 ID、主题色、关键页面路径。
 *   2. `src/locales/*.json`：站点名称、首页文案、页脚、侧栏兑换码、SEO 元数据。
 *   3. `src/config/navigation.ts`：内容分类（与 `content/{locale}/{category}/` 目录一致）。
 *   4. `public/` 下的 favicon / logo / hero 图。
 *
 * 站点域名不写在代码里，统一来自环境变量 `NEXT_PUBLIC_SITE_URL`。
 */

const PLACEHOLDER_SITE_URL = "https://example.com";

function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) {
    if (process.env.NODE_ENV === "production") {
      console.warn(
        `[site] NEXT_PUBLIC_SITE_URL is not set; falling back to ${PLACEHOLDER_SITE_URL}. ` +
          "canonical / sitemap / robots will point to the wrong domain.",
      );
    }
    return PLACEHOLDER_SITE_URL;
  }
  return raw.replace(/\/+$/, "");
}

export const siteConfig = {
  /** 站点绝对地址（无尾部斜杠），来自 NEXT_PUBLIC_SITE_URL */
  url: resolveSiteUrl(),

  /** 品牌名，来自 src/locales/en.json 的 `site`（非英语页面的 JSON-LD 等也使用英文品牌名） */
  name: en.site.name,
  shortName: en.site.shortName,
  wikiName: en.site.wikiName,
  /** 顶部 logo 方块里显示的 1-3 个字母 */
  initials: en.site.initials,

  /** PWA manifest 颜色（hex）；站点主题色本身在 src/app/globals.css 的 --nav-theme */
  themeColor: "#9f4623",
  backgroundColor: "#0d0d0d",

  /** 首页 hero 区 trailer 的 YouTube 视频 ID；留空则不显示 trailer 区块 */
  youtubeVideoId: "",

  /** 外链：留空字符串则对应入口自动隐藏 */
  links: {
    /** 游戏官网 / 商店页 / Roblox 游戏页（用于 footer 与首页 CTA） */
    play: "",
    discord: "",
    youtube: "",
    /** 社区工具（如 Skill Planner）；按钮文案为 locales 的 `footer.communityTool` */
    communityTool: "",
  },

  images: {
    /** 默认 OG / Twitter 图（1200x630） */
    hero: "/images/hero.webp",
    trailerThumbnail: "/images/hero-trailer-thumbnail.jpg",
    logo: "/android-chrome-512x512.png",
  },

  /**
   * 首页与侧栏会链接到的关键页面（站内路径，不含语言前缀）。
   * 必须指向真实存在的页面：内容分类列表页（如 "/guide"）或某篇文章。
   */
  paths: {
    /** 首页「新手指南」按钮 */
    beginnerGuide: "/guide",
    /** 首页「全部指南」按钮 */
    guides: "/guide",
    /** 侧栏「查看全部兑换码」；没有兑换码页的站点保持 locales 的 sidebarCodes 为空数组即可 */
    codes: "/codes",
  },
};

export type SiteConfig = typeof siteConfig;
