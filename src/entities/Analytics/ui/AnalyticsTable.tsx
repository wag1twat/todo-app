import { Box, Stack } from "@chakra-ui/react";
import React from "react";
import { Column } from "react-table";
import { Pagination, useCollectionPaging } from "../../../features";
import { Core, AnalitycsErrorEvent } from "../../../processes";
import {} from "../../../processes/core/Analytics";
import { RouterLink } from "../../../shared";
import { Table } from "../../Table";

interface AnalitycsTableProps {
    events: (AnalitycsErrorEvent & { key: string })[];
}

const AnalitycsTable: React.FC<
    React.PropsWithChildren<AnalitycsTableProps>
> = ({ events }) => {
    const columns = React.useMemo<
        Column<AnalitycsErrorEvent & { key: string }>[]
    >(() => {
        return [
            {
                Header: () => <Box>Name</Box>,
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
                accessor: "name"
            },
            {
                Header: () => <Box>Message</Box>,
                Cell: (props) => <Box>{props.row.original.message}</Box>,
                accessor: "message"
            }
        ];
    }, []);

    const collectionPaging = useCollectionPaging(events);

    return (
        <Stack spacing={4}>
            <Table data={collectionPaging.items} columns={columns} />;
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

export { AnalitycsTable };
