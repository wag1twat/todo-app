import {
    ButtonGroup,
    IconButton,
    Icon,
    Button,
    ButtonGroupProps
} from "@chakra-ui/react";
import {
    DoubleLeftOutlined,
    DoubleRightOutlined,
    LeftOutlined,
    RightOutlined
} from "@ant-design/icons";
import React from "react";
import { useCollectionPaging } from "./model";

const option = 5;

interface PaginationProps extends ButtonGroupProps {
    count: number;
    page: number;
    setPage: (page: number) => void;
    nextPage: () => void;
    prevPage: () => void;
}
const Pagination: React.FC<PaginationProps> = ({
    count,
    page,
    setPage,
    prevPage,
    nextPage,
    ...props
}) => {
    const pages = React.useMemo(() => Array.from(Array(count).keys()), [count]);

    const pagination = useCollectionPaging(pages, option);

    return (
        <ButtonGroup {...props}>
            <IconButton
                size="sm"
                aria-label="Left pagination"
                onClick={() => {
                    const lastOfPaging = pagination.items.at(-1);

                    if (typeof lastOfPaging === "number") {
                        setPage(lastOfPaging + 1 - option);
                    }

                    pagination.prevPage();
                }}
                isDisabled={pagination.page === 1}
            >
                <Icon as={DoubleLeftOutlined} />
            </IconButton>
            <IconButton
                size="sm"
                aria-label="Left pagination"
                onClick={() => {
                    const firstOfPaging = pagination.items.at(0);

                    if (
                        typeof firstOfPaging === "number" &&
                        page === firstOfPaging + 1
                    ) {
                        pagination.prevPage();
                    }
                    prevPage();
                }}
                isDisabled={page === 1}
            >
                <Icon as={LeftOutlined} />
            </IconButton>
            {pagination.items.map((item) => {
                return (
                    <Button
                        key={item}
                        size="sm"
                        isActive={item + 1 === page}
                        onClick={() => setPage(item + 1)}
                        _active={{
                            backgroundColor: "cyan.200"
                        }}
                    >
                        {item + 1}
                    </Button>
                );
            })}
            <IconButton
                size="sm"
                aria-label="Right pagination"
                onClick={() => {
                    const lastOfPaging = pagination.items.at(-1);

                    if (
                        typeof lastOfPaging === "number" &&
                        page === lastOfPaging + 1
                    ) {
                        pagination.nextPage();
                    }
                    nextPage();
                }}
                isDisabled={page === count}
            >
                <Icon as={RightOutlined} />
            </IconButton>
            <IconButton
                size="sm"
                aria-label="Right pagination"
                onClick={() => {
                    const firstOfPaging = pagination.items.at(0);

                    if (typeof firstOfPaging === "number") {
                        setPage(firstOfPaging + 1 + option);
                    }

                    pagination.nextPage();
                }}
                isDisabled={pagination.count === pagination.page}
            >
                <Icon as={DoubleRightOutlined} />
            </IconButton>
        </ButtonGroup>
    );
};

export { Pagination };
