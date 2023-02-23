import {
    BoxProps,
    Flex,
    Stack,
    chakra,
    Text,
    CircularProgress
} from "@chakra-ui/react";
import React from "react";
import { CommentDto, PostDto, UserDto } from "src/processes/core/api/dto";
import { Paper, RouterLink, UserLink } from "src/shared";

interface PostCardProps {
    post: PostDto | undefined;
    isLoadingPost?: boolean;
    user: UserDto | undefined;
    isLoadingUser?: boolean;
    comments: CommentDto[];
    isLoadingComments?: boolean;
}

const PostCardWrapper: React.FC<React.PropsWithChildren<BoxProps>> = (
    props
) => {
    return <Paper minWidth={"260px"} maxWidth={"400px"} p={4} {...props} />;
};

const PostCard: React.FC<PostCardProps> = ({
    post,
    isLoadingPost,
    user,
    isLoadingUser,
    comments,
    isLoadingComments
}) => {
    return (
        <PostCardWrapper>
            <Stack spacing={2}>
                <Flex justifyContent={"flex-start"}>
                    <UserLink id={user?.id}>{user?.username}</UserLink>
                </Flex>
                <Flex>{<chakra.span>{post?.title}</chakra.span>}</Flex>
                <Text fontSize="sm">{post?.body}</Text>
                <Flex justifyContent={"flex-end"}>
                    <RouterLink to="/" fontSize={"small"}>
                        comments
                        <chakra.span>{"("}</chakra.span>
                        <chakra.span>
                            {isLoadingComments ? (
                                <CircularProgress
                                    isIndeterminate
                                    color="cyan.500"
                                    size="12px"
                                />
                            ) : (
                                comments.length || 0
                            )}
                        </chakra.span>
                        <chakra.span>{")"}</chakra.span>
                    </RouterLink>
                </Flex>
            </Stack>
        </PostCardWrapper>
    );
};

export { PostCard };
