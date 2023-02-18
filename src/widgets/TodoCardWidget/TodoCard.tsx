import React from "react";
import {
    Heading,
    Stack,
    chakra,
    BoxProps,
    Skeleton,
    Box,
    Icon,
    Text
} from "@chakra-ui/react";
import { CompletedIcon, Paper } from "../../shared";
import { Todo } from "../../entities/Todos/model";
import { UserOutlined } from "@ant-design/icons";

interface TodoCardProps {
    todo: Todo | undefined;
    author: string | undefined;
}

const TodoCardWrapper: React.FC<React.PropsWithChildren<BoxProps>> = (
    props
) => {
    return <Paper minWidth={"260px"} maxWidth={"400px"} {...props} />;
};

const SkeletonTodoCard = () => {
    return (
        <TodoCardWrapper>
            <Skeleton height={12} />
        </TodoCardWrapper>
    );
};

const TodoCard: React.FC<TodoCardProps> = React.memo(({ author, todo }) => {
    if (todo === undefined) {
        return <SkeletonTodoCard />;
    }
    return (
        <TodoCardWrapper>
            <Stack direction={"column"} p={4} spacing={4}>
                <Heading size="md" position={"relative"} paddingRight={4}>
                    {todo?.title}
                    <chakra.span
                        width={4}
                        position={"absolute"}
                        top={0}
                        right={0}
                    >
                        <CompletedIcon isCompleted={Boolean(todo?.completed)} />
                    </chakra.span>
                </Heading>
                <Text>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Aperiam nostrum vero sed officiis blanditiis labore qui!
                    Expedita minima nostrum corporis vel delectus modi. Ex ipsam
                    incidunt, itaque odit dolorem a!
                </Text>
                {author && (
                    <Box textAlign={"end"}>
                        <chakra.span>{author}</chakra.span>
                        <chakra.span ml={2}>
                            <Icon as={UserOutlined} fontSize="16px" />
                        </chakra.span>
                    </Box>
                )}
            </Stack>
        </TodoCardWrapper>
    );
});

export { TodoCard };
