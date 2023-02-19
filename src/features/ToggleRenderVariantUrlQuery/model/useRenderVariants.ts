import { Serializer } from "../../../processes/core/Queries";

const renderVariants = ["card", "list"] as const;
const renderVariantKey = 'renderVariant' as const

type RenderVariant = typeof renderVariants[number];


const isRenderVariant = (renderVariant: string | null | undefined): renderVariant is RenderVariant => {
    if(renderVariant === null || renderVariant === undefined) {
        return false
    }
    if(renderVariants.includes(renderVariant as RenderVariant)) {
        return true
    }
    return false
}

const useRenderVariants = () => {
    return {
        variants: renderVariants,
        queries: renderVariants.reduce<Record<RenderVariant, string>>(
            (acc, renderVariant) => {
                return {
                    ...acc,
                    [renderVariant]: `?${Serializer.query({ renderVariant })}`
                };
            },
            {} as Record<RenderVariant, string>
        )
    };
};

export type { RenderVariant }
export { renderVariantKey, isRenderVariant, useRenderVariants }