import { ArrowDownOutlined } from "@ant-design/icons";
import { Icon, Flex, IconButton, Stack } from "@chakra-ui/react";
import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { usePosts } from "../../entities";
import { Transform } from "../../processes";
import { ContentLayout, ScrollLayout } from "../../processes/theme";
import { ReloadHeader } from "../../shared";
import { PostCardWidget, PostCardWidgetProvider } from "../../widgets";

const Posts = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();
    const location = useLocation();

    const _start = Number(Transform.identy(searchParams.get("_start")));
    const _limit = Number(Transform.identy(searchParams.get("_limit")));

    const posts = usePosts({
        _start,
        _limit
    });

    const showMore = React.useCallback(() => {
        setSearchParams({
            _start: String(_start),
            _limit: String(_limit + 5)
        });
    }, [_start, _limit]);

    const scrollRef = React.useRef<HTMLDivElement | null>(null);

    const scrollEnd = React.useCallback(() => {
        scrollRef.current?.scrollTo({
            left: 0,
            top: scrollRef.current.scrollHeight,
            behavior: "smooth"
        });
    }, []);

    const onScroll = React.useCallback(
        (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
            const bottom =
                e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
                e.currentTarget.clientHeight;
            if (bottom) {
                showMore();
            }
        },
        [showMore]
    );

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
                    onScroll={onScroll}
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
                        onClick={scrollEnd}
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
