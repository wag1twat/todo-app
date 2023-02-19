import { Box, Stack } from "@chakra-ui/react";
import React from "react";
import { Column } from "react-table";
import { Pagination, useCollectionPaging } from "../../../features";
import { Core } from "../../../processes";
import { CompletedIcon, RouterLink } from "../../../shared";
import { Table } from "../../Table";
import { Todo } from "../model";

interface TodosTableProps {
    todos: Todo[];
    getAuthor: (userId: number) => string | undefined;
}

const TodosTable: React.FC<React.PropsWithChildren<TodosTableProps>> = ({
    todos,
    getAuthor
}) => {
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
                                to={Core.route()
                                    .todo()
                                    .link(`${props.row.original.id}`)
                                    .exec()}
                            >
                                #{props.row.original.id}
                            </RouterLink>
                        </Box>
                    );
                },
                accessor: "id",
                disableSortBy: true
            },
            {
                Header: (props) => {
                    return <Box>title</Box>;
                },
                Cell: (props) => {
                    return <Box>{props.row.original.title}</Box>;
                },
                accessor: "title",
                disableSortBy: true
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
                accessor: "completed",
                maxWidth: 60,
                disableSortBy: true
            },
            {
                Header: (props) => {
                    return <Box>Author</Box>;
                },
                Cell: (props) => {
                    return <Box>{getAuthor(props.row.original.userId)}</Box>;
                },
                accessor: "userId",
                maxWidth: 60,
                disableSortBy: true
            }
        ];
    }, [getAuthor]);

    const collectionPaging = useCollectionPaging(todos);

    return (
        <Stack spacing={4}>
            <Table data={collectionPaging.items} columns={columns} />
            <Pagination
                count={collectionPaging.count}
                page={collectionPaging.page}
                setPage={collectionPaging.setPage}
                nextPage={collectionPaging.nextPage}
                prevPage={collectionPaging.prevPage}
                justifyContent="flex-end"
            />
        </Stack>
    );
};

export { TodosTable };
