type RenderVariant = 'list' | 'card'
const renderVariantKey = "renderVariant" as const;
const defRenderVariant = "list" as const;
const defRenderVariants: RenderVariant[] = ["card", "list"];

export type { RenderVariant }
export { defRenderVariants, defRenderVariant, renderVariantKey }