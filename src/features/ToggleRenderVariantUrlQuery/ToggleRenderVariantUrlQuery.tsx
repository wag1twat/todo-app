import { IconButton, Icon } from "@chakra-ui/react";
import { BarsOutlined, AppstoreOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useTransition } from "react";
import { useValidateRenderVariant } from "./model";

const ToggleRenderVariantUrlQuery = () => {
    const [isPending, startTransition] = useTransition();
    const location = useLocation();
    const navigate = useNavigate();
    const { renderVariant, renderVariants } = useValidateRenderVariant();

    console.log(renderVariant);

    const toggle = React.useCallback(() => {
        if (renderVariant) {
            const index = renderVariants.variants.indexOf(renderVariant);

            if (index >= renderVariants.variants.length - 1) {
                navigate({
                    pathname: location.pathname,
                    search: renderVariants.queries[renderVariants.variants[0]]
                });

                return;
            }

            navigate({
                pathname: location.pathname,
                search: renderVariants.queries[
                    renderVariants.variants[index + 1]
                ]
            });

            return;
        }
    }, [renderVariant, renderVariants, location.pathname]);

    if (renderVariant === "card") {
        return (
            <IconButton
                size="sm"
                aria-label="Switch list view"
                onClick={() => {
                    startTransition(() => {
                        toggle();
                    });
                }}
                isDisabled={isPending}
            >
                <Icon as={AppstoreOutlined} />
            </IconButton>
        );
    }

    if (renderVariant === "list") {
        return (
            <IconButton
                size="sm"
                aria-label="Switch list view"
                onClick={() => {
                    startTransition(() => {
                        toggle();
                    });
                }}
                isDisabled={isPending}
            >
                <Icon as={BarsOutlined} />
            </IconButton>
        );
    }

    return null;
};

export { ToggleRenderVariantUrlQuery };
