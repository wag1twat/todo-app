import { Box, Flex, Stack } from "@chakra-ui/react";
import React, { useTransition } from "react";
import { Column } from "react-table";
import { Pagination, useCollectionPaging } from "../../../features";
import { Core, useCollectionSorting } from "../../../processes";
import { CompletedIcon, RouterLink, TransitionBackdrop } from "../../../shared";
import { Table } from "../../Table";
import { Todo } from "../model";

interface TodosTableProps {
    todos: Todo[] | undefined;
    getAuthor: (userId: number) => string | undefined;
}

const TodosTable: React.FC<React.PropsWithChildren<TodosTableProps>> = ({
    todos = [],
    getAuthor
}) => {
    const [isPending, startTransition] = useTransition();

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
            [getAuthor]
        )
    );

    const collectionPaging = useCollectionPaging(
        collectionSorting.collection,
        20
    );

    const columns = React.useMemo<Column<Todo>[]>(() => {
        return [
            {
                Header: (props) => {
                    return (
                        <Box
                            onClick={() => {
                                startTransition(() => {
                                    collectionSorting.sort("id");
                                });
                            }}
                        >
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
                        <Box
                            onClick={() => {
                                startTransition(() => {
                                    collectionSorting.sort("title");
                                });
                            }}
                        >
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
                            onClick={() => {
                                startTransition(() => {
                                    collectionSorting.sort("completed");
                                });
                            }}
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
                        <Box
                            onClick={() => {
                                startTransition(() => {
                                    collectionSorting.sort("userId");
                                });
                            }}
                        >
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
        <TransitionBackdrop
            isActive={isPending}
            display="flex"
            flexDirection={"column"}
            flexGrow={1}
        >
            <Flex flexGrow={1} position={"relative"}>
                <Box
                    position={"absolute"}
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                >
                    <Table
                        data={collectionPaging.collection}
                        columns={columns}
                    />
                </Box>
            </Flex>
            <Flex p={2} justifyContent={"flex-end"}>
                <Pagination
                    count={collectionPaging.count}
                    page={collectionPaging.page}
                    setPage={collectionPaging.setPage}
                    nextPage={collectionPaging.nextPage}
                    prevPage={collectionPaging.prevPage}
                    justifyContent="flex-end"
                />
            </Flex>
        </TransitionBackdrop>
    );
};

export { TodosTable };
