import { Box, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Table, useTodos } from "../../entities";

const Todos: React.FC = React.memo(() => {
    const todos = useTodos();

    return (
        <Stack>
            <Text>Todos</Text>
            <Table
                data={todos.state}
                columns={[
                    {
                        Header: () => <Box>id</Box>,
                        Cell: (props) => {
                            return <Box>{props.origin.id}</Box>;
                        },
                        key: "id"
                    },
                    {
                        Header: () => <Box>title</Box>,
                        Cell: (props) => {
                            return <Box>{props.origin.title}</Box>;
                        },
                        key: "title"
                    }
                ]}
            />
        </Stack>
    );
});

export { Todos };
