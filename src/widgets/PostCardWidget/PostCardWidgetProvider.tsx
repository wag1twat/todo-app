import React from "react";
import { UseQueryResult } from "react-query/types/react";
import {
    Post,
    User,
    useUser,
    Comment,
    usePost,
    useComments
} from "../../entities";

interface postCardWidgetContext {
    post: UseQueryResult<Post>;
    user: UseQueryResult<User>;
    comments: UseQueryResult<Comment[]>;
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
