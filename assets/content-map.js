const contentMap = {
  sections: [
    {
      id: "intro",
      title: "平台概览",
      tags: ["华体会", "体育", "盘口"],
      items: [
        { label: "首页", slug: "/", keywords: ["华体会", "首页"] },
        { label: "体育投注", slug: "/sports", keywords: ["华体会", "体育", "投注"] },
        { label: "真人娱乐", slug: "/live-casino", keywords: ["华体会", "真人", "娱乐"] }
      ]
    },
    {
      id: "promotions",
      title: "优惠活动",
      tags: ["华体会", "奖金", "抽奖"],
      items: [
        { label: "新人礼包", slug: "/promo/welcome", keywords: ["华体会", "新人", "礼包"] },
        { label: "每日返水", slug: "/promo/cashback", keywords: ["华体会", "返水", "每日"] },
        { label: "邀请有奖", slug: "/promo/invite", keywords: ["华体会", "邀请", "奖励"] }
      ]
    },
    {
      id: "help",
      title: "帮助中心",
      tags: ["华体会", "客服", "教程"],
      items: [
        { label: "常见问题", slug: "/help/faq", keywords: ["华体会", "FAQ", "帮助"] },
        { label: "存款指南", slug: "/help/deposit", keywords: ["华体会", "存款", "支付"] },
        { label: "取款指南", slug: "/help/withdraw", keywords: ["华体会", "取款", "到账"] }
      ]
    }
  ],
  siteUrl: "https://mapp-hth.com.cn",
  defaultKeywords: ["华体会", "娱乐", "平台"]
};

function searchContent(query, map = contentMap) {
  const lowerQuery = query.toLowerCase().trim();
  const results = [];

  for (const section of map.sections) {
    for (const item of section.items) {
      const matchKeyword = item.keywords.some(kw =>
        kw.toLowerCase().includes(lowerQuery) || lowerQuery.includes(kw.toLowerCase())
      );
      const matchTag = section.tags.some(tag =>
        tag.toLowerCase().includes(lowerQuery) || lowerQuery.includes(tag.toLowerCase())
      );
      if (matchKeyword || matchTag) {
        results.push({
          section: section.title,
          label: item.label,
          url: map.siteUrl + item.slug,
          matchedOn: matchKeyword ? "keyword" : "tag"
        });
      }
    }
  }

  return results;
}

function getAllTags(map = contentMap) {
  const tagSet = new Set();
  for (const section of map.sections) {
    for (const tag of section.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet);
}

function getSectionByTag(tag, map = contentMap) {
  const lowerTag = tag.toLowerCase().trim();
  for (const section of map.sections) {
    if (section.tags.some(t => t.toLowerCase() === lowerTag)) {
      return section;
    }
  }
  return null;
}

if (typeof window !== "undefined") {
  window.contentMap = contentMap;
  window.searchContent = searchContent;
  window.getAllTags = getAllTags;
  window.getSectionByTag = getSectionByTag;
}