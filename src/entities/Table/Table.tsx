import {
    Table as ChakraTable,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import { Column, useSortBy, useTable } from "react-table";
import { ScrollLayout } from "../../processes/theme";

interface TableProps<T extends object = object> {
    data: T[] | undefined;
    columns: Column<T>[];
}

const Table = <T extends object = object>(props: TableProps<T>) => {
    const { data = [], columns } = props;

    const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
        useTable(
            {
                data,
                columns
            },
            useSortBy
        );

    return (
        <ScrollLayout width="100%" height="100%">
            <ChakraTable
                width="100%"
                __css={{
                    borderCollapse: "collapse"
                }}
                {...getTableProps()}
            >
                <Thead position={"sticky"} top={0} zIndex={1}>
                    {
                        // Loop over the header rows
                        headerGroups.map((headerGroup) => (
                            // Apply the header row props
                            <Tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    // Loop over the headers in each row
                                    headerGroup.headers.map((column) => (
                                        // Apply the header cell props

                                        <Th
                                            {...column.getHeaderProps(
                                                column.getSortByToggleProps()
                                            )}
                                            p={2}
                                            maxWidth={column.maxWidth}
                                            display={column.display}
                                            position={"sticky"}
                                            top={0}
                                            zIndex={1}
                                            backgroundColor="#fff"
                                        >
                                            {
                                                // Render the header
                                                column.render("Header")
                                            }
                                        </Th>
                                    ))
                                }
                            </Tr>
                        ))
                    }
                </Thead>
                {/* Apply the table body props */}
                <Tbody {...getTableBodyProps()}>
                    {
                        // Loop over the table rows
                        rows.map((row) => {
                            // Prepare the row for display
                            prepareRow(row);
                            return (
                                // Apply the row props
                                <Tr {...row.getRowProps()}>
                                    {
                                        // Loop over the rows cells
                                        row.cells.map((cell) => {
                                            // Apply the cell props
                                            return (
                                                <Td
                                                    {...cell.getCellProps()}
                                                    p={2}
                                                    maxWidth={
                                                        cell.column.maxWidth
                                                    }
                                                    display={
                                                        cell.column.display
                                                    }
                                                >
                                                    {
                                                        // Render the cell contents
                                                        cell.render("Cell")
                                                    }
                                                </Td>
                                            );
                                        })
                                    }
                                </Tr>
                            );
                        })
                    }
                </Tbody>
            </ChakraTable>
        </ScrollLayout>
    );
};

export { Table };
