import { BoxProps, Flex, Stack, chakra, Text } from "@chakra-ui/react";
import React from "react";
import { CommentDto, PostDto, UserDto } from "../../processes/core/Api";
import { Paper, RouterLink, UserLink } from "../../shared";

interface PostCardProps {
    post: PostDto | undefined;
    user: UserDto | undefined;
    comments: CommentDto[];
}

const PostCardWrapper: React.FC<React.PropsWithChildren<BoxProps>> = (
    props
) => {
    return <Paper minWidth={"260px"} maxWidth={"400px"} p={4} {...props} />;
};

const PostCard: React.FC<PostCardProps> = ({ post, user, comments }) => {
    return (
        <PostCardWrapper>
            <Stack spacing={2}>
                <Flex justifyContent={"flex-start"}>
                    <UserLink id={user?.id}>{user?.username}</UserLink>
                </Flex>
                <Flex>
                    <chakra.span>{post?.title}</chakra.span>
                </Flex>
                <Text fontSize="sm">{post?.body}</Text>
                <Flex justifyContent={"flex-end"}>
                    <RouterLink to="/">
                        comments{`(${comments.length || 0})`}
                    </RouterLink>
                </Flex>
            </Stack>
        </PostCardWrapper>
    );
};

export { PostCard };
