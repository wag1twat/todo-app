import { IconButton, Icon } from "@chakra-ui/react";
import { BarsOutlined, AppstoreOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { useTransition } from "react";
import {
    defRenderVariant,
    defRenderVariants,
    RenderVariant,
    renderVariantKey
} from "./model/types";
import { useToggleRenderVariant } from "./model";

const ToggleRenderVariantUrlQuery = (props: { variants?: RenderVariant[] }) => {
    const { variants = defRenderVariants } = props;

    const [searchParams] = useSearchParams();

    const variant = searchParams.get(renderVariantKey) || defRenderVariant;

    const [isPending, startTransition] = useTransition();

    const toggle = useToggleRenderVariant(variants);

    if (variant === "card") {
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

    if (variant === "list") {
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
