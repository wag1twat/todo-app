import React from "react";
import { PostCard } from "./PostCard";
import { usePostCardWidget } from "./PostCardWidgetProvider";

const PostCardWidget = () => {
    const { post, user, comments } = usePostCardWidget();

    return (
        <PostCard
            post={post.data}
            user={user.data}
            comments={comments.data || []}
        />
    );
};

export { PostCardWidget };
