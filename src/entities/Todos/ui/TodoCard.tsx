import React from "react";
import { Flex, Heading, Stack, chakra } from "@chakra-ui/react";
import { CompletedIcon, Paper } from "../../../shared";
import { Todo } from "../model";

interface TodoCardProps {
    todo: Todo | undefined;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {
    return (
        <Paper maxWidth={"400px"}>
            <Stack direction={"column"} p={4} spacing={4}>
                <Heading size="md" position={"relative"} paddingRight={4}>
                    {todo?.title}
                    <chakra.span
                        width={3}
                        position={"absolute"}
                        top={0}
                        right={0}
                    >
                        <CompletedIcon isCompleted={Boolean(todo?.completed)} />
                    </chakra.span>
                </Heading>
            </Stack>
        </Paper>
    );
};

export { TodoCard };
