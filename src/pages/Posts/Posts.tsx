import { Heading, Stack } from "@chakra-ui/react";
import { usePosts } from "../../entities";
import { Layout, ReloadHeader } from "../../shared";
import { PostCardWidget, PostCardWidgetProvider } from "../../widgets";

const Posts = () => {
    const posts = usePosts({ _start: 0, _limit: 5 });

    return (
        <Layout>
            <Stack spacing={4}>
                <ReloadHeader
                    isLoading={posts.isLoading}
                    isDisabled={posts.isLoading || posts.isFetching}
                    refetch={posts.refetch}
                >
                    Posts
                </ReloadHeader>
                {posts.state.map((post) => {
                    return (
                        <PostCardWidgetProvider key={post.id} id={post.id}>
                            <PostCardWidget />
                        </PostCardWidgetProvider>
                    );
                })}
            </Stack>
        </Layout>
    );
};

const FallbackPosts = () => {
    return (
        <Layout>
            <Stack width="100%" spacing={4}>
                <Heading>Posts</Heading>
            </Stack>
        </Layout>
    );
};

export { FallbackPosts };
export default Posts;
