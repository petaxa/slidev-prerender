import type { SeoMeta } from "@slidev/types";
import type { ResolvableLink } from "unhead/types";
import { escapeHtml } from "markdown-it/lib/common/utils.mjs";
import { createHead, transformHtmlTemplate } from "unhead/server";
import { parseHtmlForUnheadExtraction } from "unhead/parser";

function toAttrValue(unsafe: unknown) {
  // Slidevと同じ：JSON.stringify + escapeHtml
  return JSON.stringify(escapeHtml(String(unsafe)));
}

export type BuildHeadOptions = {
  lang?: string;
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  twitterCard?: string;
  favicon?: string;
  webFonts?: ResolvableLink[];
  seoMeta?: Partial<SeoMeta>;
};

export async function applyHead(
  html: string,
  slug: string,
  opt: BuildHeadOptions,
): Promise<string> {
  // 1) まず「既存HTMLに書かれているhead」をunhead入力として回収
  const extracted = parseHtmlForUnheadExtraction(html).input;

  const description = opt.description ? toAttrValue(opt.description) : null;

  const head = createHead({
    init: [
      extracted,
      {
        htmlAttrs: opt.lang ? { lang: opt.lang } : undefined,
        title: opt.title ?? slug,

        link: [
          opt.favicon ? { rel: "icon", href: opt.favicon } : null,
          ...(opt.webFonts ?? []),
          opt.canonicalUrl
            ? { rel: "canonical", href: opt.canonicalUrl }
            : null,
        ].filter(Boolean),

        meta: [
          { name: "description", content: description },

          // OGP
          { property: "og:title", content: opt.seoMeta?.ogTitle || opt.title },
          {
            property: "og:description",
            content: opt.seoMeta?.ogDescription || description,
          },
          {
            property: "og:image",
            content: opt.ogImage ?? opt.seoMeta?.ogImage,
          },
          {
            property: "og:url",
            content: opt.seoMeta?.ogUrl || opt.canonicalUrl,
          },

          // Twitter
          {
            name: "twitter:card",
            content: opt.twitterCard ?? opt.seoMeta?.twitterCard,
          },
          {
            name: "twitter:title",
            content: opt.seoMeta?.twitterTitle || opt.title,
          },
          {
            name: "twitter:description",
            content: opt.seoMeta?.twitterDescription || description,
          },
          {
            name: "twitter:image",
            content:
              (opt.seoMeta?.twitterImage || opt.ogImage) ??
              opt.seoMeta?.ogImage,
          },
          {
            name: "twitter:url",
            content: opt.seoMeta?.twitterUrl || opt.canonicalUrl,
          },
        ]
          // Slidev同様：contentが空のものを落とす
          .filter((x) => (x as any).content),
      },
    ],
  });

  return await transformHtmlTemplate(head, html);
}
