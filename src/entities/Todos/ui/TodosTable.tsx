import { Box, Flex } from "@chakra-ui/react";
import React, { useTransition } from "react";
import { Column } from "react-table";
import { useArrayPaging, useArraySort } from "shulga-app-core/hooks";
import { Table } from "src/entities/Table";
import { Pagination } from "src/features";
import { TodoDto } from "src/processes/core/api/dto";
import { CompletedIcon, RouterLink, TransitionBackdrop } from "src/shared";

interface TodosTableProps {
    todos: TodoDto[] | undefined;
    getAuthor: (userId: number) => string | undefined;
}

const TodosTable: React.FC<React.PropsWithChildren<TodosTableProps>> = ({
    todos = [],
    getAuthor
}) => {
    const [isPending, startTransition] = useTransition();

    const sort = useArraySort({
        collection: todos,
        order: "ASC",
        orders: ["ASC", "DESC", "default"],
        field: "id"
    });

    const { collection, ...pagingProps } = useArrayPaging({
        startsWith: 1,
        pageSize: 15,
        paginationSize: 6,
        collection: sort.collection || [],
        onMount: true
    });

    const columns = React.useMemo<Column<TodoDto>[]>(() => {
        return [
            {
                Header: (props) => {
                    return (
                        <Box
                            onClick={() => {
                                startTransition(() => {
                                    sort.update({
                                        field: "id",
                                        noUpdateOrderFalsyEqualXPath: true
                                    });
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
                                // TODO: link for todo page
                                to={"/"}
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
                                    sort.update({
                                        field: "title",
                                        noUpdateOrderFalsyEqualXPath: true
                                    });
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
                                    sort.update({
                                        field: "completed",
                                        noUpdateOrderFalsyEqualXPath: true
                                    });
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
                                    sort.update({
                                        field: {
                                            xpath: "userId",
                                            handler: (item) =>
                                                item
                                                    ? getAuthor(item)
                                                    : undefined
                                        },
                                        noUpdateOrderFalsyEqualXPath: true
                                    });
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getAuthor, sort.update]);

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
                    <Table data={collection} columns={columns} />
                </Box>
            </Flex>
            <Flex p={2} justifyContent={"flex-end"}>
                <Pagination {...pagingProps} />
            </Flex>
        </TransitionBackdrop>
    );
};

export { TodosTable };
