import {
    Box,
    Button,
    Heading,
    IconButton,
    Skeleton,
    Stack,
    Text
} from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import React from "react";
import { Column } from "react-table";
import {
    MergeUserIntoTodo,
    mergeUsersIntoTodo,
    Table,
    useTodos,
    useUsers
} from "../../entities";
import { CompletedIcon, Loader } from "../../shared";

const Todos: React.FC = React.memo(() => {
    const users = useUsers();
    const todos = useTodos();

    const mergedUsersIntoTodo = React.useMemo(
        () => mergeUsersIntoTodo(todos.state, users.state),
        [todos.state, users.state]
    );

    const columns = React.useMemo<Column<MergeUserIntoTodo>[]>(() => {
        return [
            {
                Header: (props) => {
                    return <Box>id</Box>;
                },
                Cell: (props) => {
                    return <Box>{props.row.original.id}</Box>;
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
                    return <Box>{props.row.original.author}</Box>;
                },
                accessor: "author"
            }
        ];
    }, []);
    return (
        <Stack>
            <Stack direction={"row"} spacing={4} alignItems="flex-end">
                <Heading>Todos</Heading>
                <IconButton
                    aria-label="Refetch todos"
                    size="sm"
                    isLoading={todos.isLoading}
                    onClick={todos.refetch}
                >
                    <RepeatIcon />
                </IconButton>
            </Stack>
            <Loader
                isLoading={todos.isLoading}
                error={undefined}
                LoaderElement={<Skeleton height={6} />}
            >
                <Table data={mergedUsersIntoTodo} columns={columns} />
            </Loader>
        </Stack>
    );
});

const FallbackTodos = () => {
    return (
        <Stack>
            <Heading>Todos</Heading>
            <Skeleton height={6} />
        </Stack>
    );
};

export { FallbackTodos };
export default Todos;
