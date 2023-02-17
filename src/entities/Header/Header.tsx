import { Button } from "@chakra-ui/button";
import { Stack } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { useTransition } from "react";
import { useNavigate } from "react-router-dom";
import { Managers, useMaxZIndex } from "../../processes";
import { useViewsQueries } from "../../shared";

const Header = () => {
    const [isPending, startTransition] = useTransition();

    const navigate = useNavigate();

    const viewsQueries = useViewsQueries();

    const zIndex = useMaxZIndex();
    return (
        <Flex
            justifyContent="flex-end"
            p={6}
            position="fixed"
            top={0}
            left={0}
            right={0}
            width="100%"
            backgroundColor="#fff"
            zIndex={zIndex}
        >
            <Stack spacing={4} direction="row">
                <Button
                    size={"sm"}
                    onClick={() =>
                        startTransition(() => {
                            navigate({
                                pathname: Managers.route()
                                    .todos()
                                    .link()
                                    .exec(),
                                search: viewsQueries.queries.list
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
                            navigate(
                                Managers.route().analytics().link().exec()
                            );
                        })
                    }
                    isDisabled={isPending}
                >
                    Analytics
                </Button>
            </Stack>
        </Flex>
    );
};

export { Header };
