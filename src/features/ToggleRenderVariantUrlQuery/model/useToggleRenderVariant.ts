import React from "react";
import { useSearchParams } from "react-router-dom";
import { defRenderVariant, defRenderVariants, RenderVariant, renderVariantKey } from "./types";

const useToggleRenderVariant = (variants: RenderVariant[] = defRenderVariants) => {
    const [searchParams, setSearchParams] = useSearchParams()

    return React.useCallback(() => {
        const index = defRenderVariants.indexOf(
            (searchParams.get(renderVariantKey) as RenderVariant) ||
                defRenderVariant
        );

        let renderVariant: RenderVariant;

        if (index >= variants.length - 1) {
            renderVariant = variants[0];
        } else {
            renderVariant = variants[index + 1];
        }

        setSearchParams(prev => {
            prev.set(renderVariantKey, renderVariant)
            return prev
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [variants]);
}

export { useToggleRenderVariant }