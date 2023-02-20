import { Button } from "@chakra-ui/button";
import { Stack } from "@chakra-ui/layout";
import { useTransition } from "react";
import { useNavigate } from "react-router-dom";
import { renderVariantKey } from "../../features/ToggleRenderVariantUrlQuery/model";
import { Core } from "../../processes";
import { Serializer } from "../../processes/core/Queries";
import { HeaderLayout } from "../../processes/theme";

const Header = () => {
    const [isPending, startTransition] = useTransition();

    const navigate = useNavigate();

    return (
        <HeaderLayout>
            <Stack float="right" spacing={4} direction="row">
                <Button
                    size={"sm"}
                    onClick={() =>
                        startTransition(() => {
                            navigate({
                                pathname: Core.route().todos().link().exec(),
                                search: Serializer.query({
                                    [renderVariantKey]: "list"
                                })
                            });
                        })
                    }
                    isDisabled={isPending}
                >
                    Todos
                </Button>
                <Button
                    size="sm"
                    colorScheme={"cyan"}
                    onClick={() =>
                        startTransition(() => {
                            navigate(Core.route().analytics().link().exec());
                        })
                    }
                    isDisabled={isPending}
                >
                    Analytics
                </Button>
            </Stack>
        </HeaderLayout>
    );
};

export { Header };
