import { ArrowDownOutlined } from "@ant-design/icons";
import { Icon, Flex, IconButton, Stack } from "@chakra-ui/react";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { EventHandling } from "shulga-app-core";
import { usePosts } from "src/entities";
import Transform from "src/processes/core/Transform";
import { ContentLayout, ScrollLayout } from "src/processes/theme";
import { ReloadHeader } from "src/shared";
import { PostCardWidget, PostCardWidgetProvider } from "src/widgets";

const step = 5;

const Posts = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const posts = usePosts({
        _start: Number(searchParams.get("_start") || 0),
        _limit: Number(searchParams.get("_limit") || 5)
    });

    const showMore = React.useCallback(() => {
        setSearchParams((prev) => {
            prev.set("_start", "0");
            prev.set(
                "_limit",
                String(Number(searchParams.get("_limit") || 0) + step)
            );
            return prev;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const scrollRef = React.useRef<HTMLDivElement | null>(null);

    return (
        <ContentLayout>
            <Stack spacing={4}>
                <ReloadHeader
                    isLoading={posts.isLoading}
                    isDisabled={posts.isLoading || posts.isFetching}
                    refetch={posts.refetch}
                >
                    Posts
                </ReloadHeader>
                <ScrollLayout
                    p={2}
                    flexGrow={1}
                    ref={scrollRef}
                    onScroll={EventHandling.onScrollBottom(
                        showMore,
                        !posts.isLoading || !posts.isFetching
                    )}
                >
                    <Stack spacing={4}>
                        {posts.data?.map((post) => {
                            return (
                                <PostCardWidgetProvider
                                    key={post.id}
                                    id={post.id}
                                >
                                    <PostCardWidget />
                                </PostCardWidgetProvider>
                            );
                        })}
                    </Stack>
                </ScrollLayout>
                <Flex pb={4} justifyContent={"center"} alignItems={"center"}>
                    <IconButton
                        aria-label="Down list"
                        isLoading={posts.isLoading}
                        isDisabled={posts.isLoading || posts.isFetching}
                        size="sm"
                        colorScheme={"cyan"}
                        onClick={() => EventHandling.toScrollBottom(scrollRef)}
                    >
                        <Icon as={ArrowDownOutlined} color="white" />
                    </IconButton>
                </Flex>
            </Stack>
        </ContentLayout>
    );
};

const FallbackPosts = () => {
    return (
        <ContentLayout>
            <Stack spacing={4}>
                <ReloadHeader isLoading={false} isDisabled={true}>
                    Posts
                </ReloadHeader>
            </Stack>
        </ContentLayout>
    );
};

export { FallbackPosts };
export default Posts;
