import React from "react";
import {
    Box,
    Table as ChakraTable,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import { Column, TableManager } from "../../processes";

interface TableProps<T extends object = object> {
    data: T[] | undefined;
    columns: Column<T>[];
}

const Table = <T extends object = object>({
    data = [],
    columns
}: TableProps<T>) => {
    const { headers, rows } = React.useMemo(
        () => new TableManager(data, columns),
        [data, columns]
    );

    console.log(headers);
    console.log(rows);

    return (
        <TableContainer>
            <ChakraTable variant="simple">
                <Thead>
                    <Tr>
                        {headers.map((header) => {
                            return <Th key={header.key}>{header.Cell({})}</Th>;
                        })}
                    </Tr>
                </Thead>
                <Tbody>
                    {rows.map((row) => {
                        return (
                            <Tr key={row.key}>
                                {row.cells.map((cell) => {
                                    return (
                                        <Td key={cell.key}>{cell.Cell({})}</Td>
                                    );
                                })}
                            </Tr>
                        );
                    })}
                </Tbody>
            </ChakraTable>
        </TableContainer>
    );
};

export { Table };
