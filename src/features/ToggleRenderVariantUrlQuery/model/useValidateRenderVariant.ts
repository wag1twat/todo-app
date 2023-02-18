import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { isRenderVariant, renderVariantKey, useRenderVariants } from "./useRenderVariants";

const useValidateRenderVariant = () => {
    const renderVariants = useRenderVariants();

    const location = useLocation();

    const navigate = useNavigate();

    const renderVariant = React.useMemo(() => {
        const urlSearchParams = new URLSearchParams(location.search)

        const renderVariant = urlSearchParams.get(renderVariantKey)

        if(isRenderVariant(renderVariant)) {
            return renderVariant
        }
    }, [location.search])

    React.useEffect(() => {
        if (renderVariant === undefined) {
            navigate(location.pathname + renderVariants.queries.list, {
                replace: true
            });
        }
    }, [renderVariant, location.pathname]);

    return { renderVariant, renderVariants };
};

export { useValidateRenderVariant }