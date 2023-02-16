import { Box, Heading, IconButton, Stack } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import React from "react";
import { Column } from "react-table";
import { Table, Todo, useTodos, useUsers } from "../../entities";
import { CompletedIcon, Loader, RouterLink } from "../../shared";
import { RoutesManager } from "../../processes";

const Todos: React.FC = React.memo(() => {
    const users = useUsers();
    const todos = useTodos();

    const getAuthor = React.useCallback(
        (userId: number) => {
            return users.state.find((user) => user.id === userId)?.username;
        },
        [users.state]
    );

    const columns = React.useMemo<Column<Todo>[]>(() => {
        return [
            {
                Header: (props) => {
                    return <Box>id</Box>;
                },
                Cell: (props) => {
                    return (
                        <Box>
                            <RouterLink
                                to={RoutesManager.todosManager.todo.link(
                                    props.row.original.id
                                )}
                            >
                                {props.row.original.id}
                            </RouterLink>
                        </Box>
                    );
                },
                accessor: "id"
            },
            {
                Header: (props) => {
                    return <Box>title</Box>;
                },
                Cell: (props) => {
                    return <Box>{props.row.original.title}</Box>;
                },
                accessor: "title"
            },
            {
                Header: (props) => {
                    return <Box>completed</Box>;
                },
                Cell: (props) => {
                    return (
                        <Box>
                            <CompletedIcon
                                isCompleted={props.row.original.completed}
                            />
                        </Box>
                    );
                },
                accessor: "completed"
            },
            {
                Header: (props) => {
                    return <Box>Author</Box>;
                },
                Cell: (props) => {
                    return <Box>{getAuthor(props.row.original.userId)}</Box>;
                },
                accessor: "userId"
            }
        ];
    }, [getAuthor]);
    return (
        <Stack>
            <Stack direction={"row"} spacing={4} alignItems="flex-end">
                <Heading>Todos</Heading>
                <IconButton
                    aria-label="Refetch todos"
                    size="sm"
                    isLoading={todos.isLoading}
                    isDisabled={todos.isLoading || todos.isFetching}
                    onClick={todos.refetch}
                >
                    <RepeatIcon />
                </IconButton>
            </Stack>
            <Loader isLoading={todos.isLoading} error={undefined}>
                <Table data={todos.state} columns={columns} />
            </Loader>
        </Stack>
    );
});

const FallbackTodos = () => {
    return (
        <Stack>
            <Heading>Todos</Heading>
        </Stack>
    );
};

export { FallbackTodos };
export default Todos;
