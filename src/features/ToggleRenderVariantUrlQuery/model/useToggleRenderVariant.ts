import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { defRenderVariant, defRenderVariants, RenderVariant, renderVariantKey } from "./types";

const useToggleRenderVariant = (variants: RenderVariant[] = defRenderVariants) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams] = useSearchParams()

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

        searchParams.set(renderVariantKey, renderVariant);

        navigate(
            {
                pathname: location.pathname,
                search: searchParams.toString()
            },
            { replace: true }
        );
    }, [variants, location.pathname]);
}

export { useToggleRenderVariant }