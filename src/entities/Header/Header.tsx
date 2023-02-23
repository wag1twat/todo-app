import { Button } from "@chakra-ui/button";
import { Stack } from "@chakra-ui/layout";
import { useTransition } from "react";
import { useNavigate } from "react-router-dom";
import routes from "src/processes/core/routes";
import { HeaderLayout } from "src/processes/theme";

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
                            navigate(routes.todosRouteWithDefaultQueries.path);
                        })
                    }
                    isDisabled={isPending}
                >
                    Todos
                </Button>
                <Button
                    size={"sm"}
                    onClick={() =>
                        startTransition(() => {
                            navigate(routes.postsRoute.path);
                        })
                    }
                    isDisabled={isPending}
                >
                    Posts
                </Button>
            </Stack>
        </HeaderLayout>
    );
};

export { Header };
