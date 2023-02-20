import { Box, Stack } from "@chakra-ui/react";
import { DateTime } from "luxon";
import React, { useTransition } from "react";
import { Column } from "react-table";
import { Table } from "src/entities/Table";
import { Pagination, useCollectionPaging } from "src/features";
import {
    AnalitycsErrorEvent,
    analytics,
    route,
    useCollectionSorting
} from "src/processes";
import { RouterLink, TransitionBackdrop } from "src/shared";
interface AnalitycsTableProps {
    events: (AnalitycsErrorEvent & { key: string })[];
}

const keyModifier = (event: AnalitycsErrorEvent & { key: string }) =>
    analytics().getDateTime(event.key)?.ordinal;
const localeStringDate = (dateTime?: DateTime) =>
    dateTime
        ? dateTime.toLocaleString({ dateStyle: "medium", timeStyle: "medium" })
        : "";

const AnalitycsTable: React.FC<
    React.PropsWithChildren<AnalitycsTableProps>
> = ({ events }) => {
    const [isPending, startTransition] = useTransition();

    const collectionSorting = useCollectionSorting(
        events,
        React.useMemo(
            () => ({
                defaultField: "key",
                defaultOrder: "DESC",
                modifiers: {
                    key: keyModifier
                }
            }),
            []
        )
    );

    const collectionPaging = useCollectionPaging(
        collectionSorting.collection,
        20
    );

    const columns = React.useMemo<
        Column<AnalitycsErrorEvent & { key: string }>[]
    >(() => {
        return [
            {
                Header: () => (
                    <Box
                        onClick={() => {
                            startTransition(() => {
                                collectionSorting.sort("name");
                            });
                        }}
                    >
                        Name
                    </Box>
                ),
                Cell: (props) => (
                    <Box>
                        <RouterLink
                            to={route()
                                .analyticsErrorEvent()
                                .link(props.row.original.key)
                                .exec()}
                        >
                            {props.row.original.name}
                        </RouterLink>
                    </Box>
                ),
                accessor: "name",
                disableSortBy: true
            },
            {
                Header: () => (
                    <Box
                        onClick={() => {
                            startTransition(() => {
                                collectionSorting.sort("key");
                            });
                        }}
                    >
                        Date
                    </Box>
                ),
                Cell: (props) => {
                    const dateTime = analytics().getDateTime(
                        props.row.original.key
                    );

                    return <Box>{localeStringDate(dateTime)}</Box>;
                },
                accessor: "key",
                disableSortBy: true
            },
            {
                Header: () => <Box>Message</Box>,
                Cell: (props) => (
                    <Box
                        overflow={"hidden"}
                        textOverflow="ellipsis"
                        whiteSpace={"nowrap"}
                    >
                        {props.row.original.message}
                    </Box>
                ),
                accessor: "message",
                disableSortBy: true,
                maxWidth: "300px",
                display: ["none", "none", "none", "table-cell", "table-cell"]
            }
        ];
    }, [collectionSorting.sort]);

    return (
        <TransitionBackdrop isActive={isPending}>
            <Stack spacing={4}>
                <Table data={collectionPaging.collection} columns={columns} />;
                <Pagination
                    count={collectionPaging.count}
                    page={collectionPaging.page}
                    setPage={collectionPaging.setPage}
                    nextPage={collectionPaging.nextPage}
                    prevPage={collectionPaging.prevPage}
                    justifyContent={[
                        "center",
                        "center",
                        "center",
                        "flex-end",
                        "flex-end"
                    ]}
                />
            </Stack>
        </TransitionBackdrop>
    );
};

export { AnalitycsTable };
