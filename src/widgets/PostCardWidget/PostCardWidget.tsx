import React from "react";
import { PostCard } from "./PostCard";
import { usePostCardWidget } from "./PostCardWidgetProvider";

const PostCardWidget = () => {
    const { post, user, comments } = usePostCardWidget();

    return (
        <PostCard
            post={post.data}
            isLoadingPost={post.isLoading}
            user={user.data}
            isLoadingUser={user.isLoading}
            comments={comments.data || []}
            isLoadingComments={comments.isLoading}
        />
    );
};

export { PostCardWidget };
