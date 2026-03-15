/**
 * Sanitizers — the single source of truth for what leaves the API.
 * All endpoints MUST go through these. Never return raw DB documents.
 */

export function sanitizeUser(user: any, stats?: { products: number; updates: number; followers: number; following: number }) {
  return {
    username: user.username,
    displayName: user.displayName,
    profileImage: user.profileImage ?? null,
    bio: user.bio ?? null,
    location: user.location ?? null,
    website: user.website ?? null,
    skills: user.skills ?? [],
    socialLinks: user.socialLinks ?? [],
    openTo: user.openTo ?? null,
    stats: stats ?? null,
    joinedAt: user.createdAt,
  };
}

export function sanitizeProduct(product: any, owner?: any) {
  return {
    id: product._id.toString(),
    name: product.name,
    slug: product.slug,
    tagline: product.tagline,
    description: product.description ?? null,
    logo: product.logo ?? null,
    website: product.website ?? null,
    github: product.github ?? null,
    status: product.status,
    keywords: product.keywords ?? [],
    isOpenSource: !!product.isOpenSource,
    sourceCodeUrl: product.sourceCodeUrl ?? null,
    category: product.category ?? null,
    platforms: product.platforms ?? [],
    productType: product.productType ?? null,
    priceType: product.priceType ?? null,
    stats: {
      upvotes: product.stats?.upvotes ?? 0,
      updates: product.stats?.updates ?? 0,
    },
    owner: owner
      ? {
          username: owner.username,
          displayName: owner.displayName,
          profileImage: owner.profileImage ?? null,
        }
      : null,
    launchDate: product.launchDate ?? null,
    createdAt: product.createdAt,
  };
}

export function sanitizeUpdate(update: any, author?: any, product?: any) {
  return {
    id: update._id.toString(),
    type: update.type,
    title: update.title ?? null,
    content: update.content,
    media: (update.media ?? []).map((m: any) => ({
      type: m.type,
      url: m.url,
      caption: m.caption ?? null,
    })),
    engagement: {
      likes: update.engagement?.likes ?? 0,
      comments: update.engagement?.comments ?? 0,
    },
    author: author
      ? {
          username: author.username,
          displayName: author.displayName,
          profileImage: author.profileImage ?? null,
        }
      : null,
    product: product
      ? {
          slug: product.slug,
          name: product.name,
          logo: product.logo ?? null,
        }
      : null,
    publishedAt: update.publishedAt,
  };
}
