import { ButtonGroup, IconButton, Icon, Button } from "@chakra-ui/react";
import {
    DoubleLeftOutlined,
    DoubleRightOutlined,
    LeftOutlined,
    RightOutlined
} from "@ant-design/icons";
import { ArrayPaging } from "shulga-app-core/hooks";

interface PaginationProps<T extends unknown[]>
    extends Omit<ArrayPaging<T>, "collection"> {}

const Pagination = <T extends unknown[]>({
    updatePage,
    nextPage,
    prevPage,
    nextPaginationPage,
    prevPaginationPage,
    isFirstPage,
    isLastPage,
    isFirstPagingPage,
    isLastPagingPage,
    pages = [],
    page
}: PaginationProps<T>) => {
    return (
        <ButtonGroup>
            <IconButton
                size="sm"
                aria-label="Left pagination"
                onClick={prevPaginationPage}
                isDisabled={isFirstPagingPage}
            >
                <Icon as={DoubleLeftOutlined} />
            </IconButton>
            <IconButton
                size="sm"
                aria-label="Left pagination"
                onClick={prevPage}
                isDisabled={isFirstPage}
            >
                <Icon as={LeftOutlined} />
            </IconButton>
            {pages.map((item) => {
                return (
                    <Button
                        key={item}
                        size="sm"
                        isActive={item === page}
                        onClick={() => updatePage(item)}
                        _active={{
                            backgroundColor: "cyan.200"
                        }}
                    >
                        {item}
                    </Button>
                );
            })}
            <IconButton
                size="sm"
                aria-label="Right pagination"
                onClick={nextPage}
                isDisabled={isLastPage}
            >
                <Icon as={RightOutlined} />
            </IconButton>
            <IconButton
                size="sm"
                aria-label="Right pagination"
                onClick={nextPaginationPage}
                isDisabled={isLastPagingPage}
            >
                <Icon as={DoubleRightOutlined} />
            </IconButton>
        </ButtonGroup>
    );
};

export { Pagination };
