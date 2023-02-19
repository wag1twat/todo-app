import { Box, Stack } from "@chakra-ui/react";
import React from "react";
import { Column } from "react-table";
import { Pagination, useCollectionPaging } from "../../../features";
import { Core, useCollectionSorting } from "../../../processes";
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
    const collectionSorting = useCollectionSorting(
        todos,
        React.useMemo(
            () => ({
                defaultField: "id",
                defaultOrder: "ASC",
                modifiers: {
                    userId: (todo) => getAuthor(todo.userId)
                }
            }),
            []
        )
    );

    const collectionPaging = useCollectionPaging(collectionSorting.collection);

    const columns = React.useMemo<Column<Todo>[]>(() => {
        return [
            {
                Header: (props) => {
                    return (
                        <Box onClick={() => collectionSorting.sort("id")}>
                            id
                        </Box>
                    );
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
                    return (
                        <Box onClick={() => collectionSorting.sort("title")}>
                            title
                        </Box>
                    );
                },
                Cell: (props) => {
                    return <Box>{props.row.original.title}</Box>;
                },
                accessor: "title",
                disableSortBy: true
            },
            {
                Header: (props) => {
                    return (
                        <Box
                            onClick={() => collectionSorting.sort("completed")}
                        >
                            completed
                        </Box>
                    );
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
                    return (
                        <Box onClick={() => collectionSorting.sort("userId")}>
                            Author
                        </Box>
                    );
                },
                Cell: (props) => {
                    return <Box>{getAuthor(props.row.original.userId)}</Box>;
                },
                accessor: "userId",
                maxWidth: 60,
                disableSortBy: true
            }
        ];
    }, [getAuthor, collectionSorting.sort]);

    return (
        <Stack spacing={4}>
            <Table data={collectionPaging.collection} columns={columns} />
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
