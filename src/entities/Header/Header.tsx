import { Button } from "@chakra-ui/button";
import { Stack } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { RoutesManager } from "../../processes";

const Header = () => {
    const navigate = useNavigate();
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
        >
            <Stack spacing={4} direction="row">
                <Button
                    size={"sm"}
                    onClick={() =>
                        navigate(RoutesManager.todosManager.todos.link)
                    }
                >
                    Todos
                </Button>
                <Button
                    size="sm"
                    colorScheme={"cyan"}
                    onClick={() =>
                        navigate(RoutesManager.analyticsManager.analytics.link)
                    }
                >
                    Analytics
                </Button>
            </Stack>
        </Flex>
    );
};

export { Header };
