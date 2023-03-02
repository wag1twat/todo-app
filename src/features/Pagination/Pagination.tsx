import { ButtonGroup, IconButton, Icon, Button } from "@chakra-ui/react";
import {
    DoubleLeftOutlined,
    DoubleRightOutlined,
    LeftOutlined,
    RightOutlined
} from "@ant-design/icons";
import { CollectionPagingResult } from "shulga-app-core/hooks";

interface PaginationProps<T extends unknown[]>
    extends Omit<CollectionPagingResult<T>, "collection"> {}

const Pagination = <T extends unknown[]>({
    updatePage,
    nextPage,
    prevPage,
    nextPagingPage,
    prevPagingPage,
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
                onClick={prevPagingPage}
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
                onClick={nextPagingPage}
                isDisabled={isLastPagingPage}
            >
                <Icon as={DoubleRightOutlined} />
            </IconButton>
        </ButtonGroup>
    );
};

export { Pagination };
