import { BookOpen, Code2, Map, Trophy } from "lucide-react";

/**
 * 导航与内容类型的唯一来源。
 *
 * 每个 `isContentType: true` 的条目对应：
 *   - 内容目录 `content/{locale}/{path 去掉斜杠}/`
 *   - 站内列表页 `/{locale}/{path 去掉斜杠}`
 *   - 翻译键 `nav.{key}`（每个 locale 的 JSON 都要有）
 *
 * 这里只是通用默认分类。新站应按 P4 关键词分类结果增删（建议不超过 8 项），
 * 同时更新 `src/locales/*.json` 的 `nav`，以及 `site.ts` 的 `paths`。
 */
export const NAVIGATION_CONFIG = [
  { key: "guides", path: "/guide", icon: BookOpen, isContentType: true },
  { key: "codes", path: "/codes", icon: Code2, isContentType: true },
  { key: "tierList", path: "/tier-list", icon: Trophy, isContentType: true },
  { key: "maps", path: "/maps", icon: Map, isContentType: true },
] as const;

export type NavKey = (typeof NAVIGATION_CONFIG)[number]["key"];

export const CONTENT_TYPES: string[] = NAVIGATION_CONFIG.filter((item) => item.isContentType).map((item) => item.path.replace(/^\//, ""));
