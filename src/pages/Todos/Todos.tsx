import { Box, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { CellProps } from "react-table";
import { Table, Todo, useTodos } from "../../entities";

const Todos: React.FC = React.memo(() => {
    const todos = useTodos();

    return (
        <Stack>
            <Text>Todos</Text>
            <Table
                data={todos.state}
                columns={[
                    {
                        Header: (props) => {
                            return <Box>id</Box>;
                        },
                        Cell: (props: CellProps<Todo>) => {
                            return <Box>id {props.row.original.id}</Box>;
                        },
                        accessor: "id"
                    },
                    {
                        Header: (props) => {
                            return <Box>title</Box>;
                        },
                        Cell: (props: CellProps<Todo>) => {
                            return <Box>title {props.row.original.title}</Box>;
                        },
                        accessor: "title"
                    },
                    {
                        Header: (props) => {
                            return <Box>completed</Box>;
                        },
                        Cell: (props: CellProps<Todo>) => {
                            return (
                                <Box>
                                    completed {props.row.original.completed}
                                </Box>
                            );
                        },
                        accessor: "completed"
                    },
                    {
                        Header: (props) => {
                            return <Box>userId</Box>;
                        },
                        Cell: (props: CellProps<Todo>) => {
                            return (
                                <Box>userId {props.row.original.userId}</Box>
                            );
                        },
                        accessor: "userId"
                    }
                ]}
            />
        </Stack>
    );
});

export { Todos };
