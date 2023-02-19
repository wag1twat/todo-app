import React from "react";
import { PostCard } from "./PostCard";
import { usePostCardWidget } from "./PostCardWidgetProvider";

const PostCardWidget = () => {
    const { post, user, comments } = usePostCardWidget();

    return (
        <PostCard
            post={post.state}
            user={user.state}
            comments={comments.state}
        />
    );
};

export { PostCardWidget };
