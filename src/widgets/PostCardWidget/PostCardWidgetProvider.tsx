import React from "react";
import {
    Post,
    User,
    useUser,
    Comment,
    usePost,
    useComments
} from "../../entities";
import { Get } from "../../processes";

interface postCardWidgetContext {
    post: Get<Post | undefined>;
    user: Get<User | undefined>;
    comments: Get<Comment[]>;
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

    const user = useUser(post.state?.userId);

    const comments = useComments({
        postId: post.state?.id,
        userId: user.state?.id
    });

    React.useEffect(() => {
        const interval = setInterval(() => {
            comments.refetch();
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [comments.refetch]);

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
