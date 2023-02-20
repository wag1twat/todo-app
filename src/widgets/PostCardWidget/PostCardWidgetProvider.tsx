import React from "react";
import { UseQueryResult } from "react-query/types/react";
import { useUser, usePost, useComments } from "../../entities";
import { CommentDto, PostDto, UserDto } from "../../processes/core/Api";

interface postCardWidgetContext {
    post: UseQueryResult<PostDto>;
    user: UseQueryResult<UserDto>;
    comments: UseQueryResult<CommentDto[]>;
}
const postCardWidgetContext = React.createContext<postCardWidgetContext>(
    {} as postCardWidgetContext
);

const usePostCardWidget = () => {
    return React.useContext(postCardWidgetContext);
};

interface PostCardWidgetProviderProps {
    id: number | undefined;
}
const PostCardWidgetProvider: React.FC<
    React.PropsWithChildren<PostCardWidgetProviderProps>
> = ({ id, ...props }) => {
    const post = usePost(id);

    const user = useUser(post.data?.userId);

    const comments = useComments({
        postId: post.data?.id,
        userId: user.data?.id
    });

    return (
        <postCardWidgetContext.Provider
            value={{
                user,
                post,
                comments
            }}
            {...props}
        />
    );
};

export { usePostCardWidget, postCardWidgetContext, PostCardWidgetProvider };
