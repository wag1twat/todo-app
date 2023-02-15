import { Button } from "@chakra-ui/button";
import { Stack } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";

const Header = () => {
    return (
        <Flex justifyContent="flex-end" p={6}>
            <Stack spacing={6} direction="row">
                <Button>Todos</Button>
                <Button>Analytics</Button>
            </Stack>
        </Flex>
    );
};

export { Header };
