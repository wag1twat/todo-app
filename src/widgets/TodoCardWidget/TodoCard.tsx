import React from "react";
import {
    Heading,
    Stack,
    chakra,
    BoxProps,
    Skeleton,
    Text
} from "@chakra-ui/react";
import { CompletedIcon, Paper, RouterLink } from "../../shared";
import { TodoDto } from "../../processes/core/Api";
import { route } from "../../processes";

interface TodoCardProps {
    todo: TodoDto | undefined;
    author: React.ReactNode;
    useNavigate?: boolean;
}

const TodoCardWrapper: React.FC<React.PropsWithChildren<BoxProps>> = (
    props
) => {
    return <Paper minWidth={"260px"} maxWidth={"400px"} p={4} {...props} />;
};

const TodoCard: React.FC<TodoCardProps> = React.memo(
    ({ todo, author, useNavigate }) => {
        return (
            <TodoCardWrapper>
                <Stack direction={"column"} spacing={4}>
                    <Heading size="md" position={"relative"} paddingRight={4}>
                        <chakra.span>{todo?.title}</chakra.span>
                        <RouterLink
                            to={route().todo().link(String(todo?.id)).exec()}
                            isDisabled={todo?.id === undefined}
                            marginLeft={2}
                            hidden={!useNavigate}
                        >
                            #{todo?.id}
                        </RouterLink>
                        <chakra.span
                            width={4}
                            position={"absolute"}
                            top={0}
                            right={0}
                        >
                            <CompletedIcon
                                isCompleted={Boolean(todo?.completed)}
                            />
                        </chakra.span>
                    </Heading>
                    <Text>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Aperiam nostrum vero sed officiis blanditiis
                        labore qui! Expedita minima nostrum corporis vel
                        delectus modi. Ex ipsam incidunt, itaque odit dolorem a!
                    </Text>
                    {author}
                </Stack>
            </TodoCardWrapper>
        );
    }
);

const FallbackTodoCard = () => {
    return (
        <TodoCardWrapper>
            <Skeleton height={12} />
        </TodoCardWrapper>
    );
};

export { FallbackTodoCard, TodoCard };
