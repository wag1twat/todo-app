import { Box, Stack } from "@chakra-ui/react";
import { DateTime } from "luxon";
import React from "react";
import { Column } from "react-table";
import { Pagination, useCollectionPaging } from "../../../features";
import {
    Core,
    AnalitycsErrorEvent,
    useCollectionSorting
} from "../../../processes";
import {} from "../../../processes/core/Analytics";
import { RouterLink } from "../../../shared";
import { Table } from "../../Table";

interface AnalitycsTableProps {
    events: (AnalitycsErrorEvent & { key: string })[];
}

const keyModifier = (event: AnalitycsErrorEvent & { key: string }) =>
    Core.analytics().getDateTime(event.key)?.ordinal;
const localeStringDate = (dateTime?: DateTime) =>
    dateTime
        ? dateTime.toLocaleString({ dateStyle: "medium", timeStyle: "medium" })
        : "";

const AnalitycsTable: React.FC<
    React.PropsWithChildren<AnalitycsTableProps>
> = ({ events }) => {
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

    const collectionPaging = useCollectionPaging(collectionSorting.collection);

    const columns = React.useMemo<
        Column<AnalitycsErrorEvent & { key: string }>[]
    >(() => {
        return [
            {
                Header: () => (
                    <Box onClick={() => collectionSorting.sort("name")}>
                        Name
                    </Box>
                ),
                Cell: (props) => (
                    <Box>
                        <RouterLink
                            to={Core.route()
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
                    <Box onClick={() => collectionSorting.sort("key")}>
                        Date
                    </Box>
                ),
                Cell: (props) => {
                    const dateTime = Core.analytics().getDateTime(
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
    );
};

export { AnalitycsTable };
