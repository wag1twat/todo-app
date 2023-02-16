
class RoutesManager {
    static todosManager = {
        todos: {
            link: '/todos',
            route: '/todos',
        },
        todo: {
            link: (id: number) => `${this.todosManager.todos.link}/${id}`,
            route: () => `${this.todosManager.todos.link}/:id`
        }
    }

    static analyticsManager = {
        analytics: {
            link: '/analytics',
            route: '/analytics',
        },
    }
    // static postsManager = () => new UrlManager('/posts')	
    // static commentsManager = () => new UrlManager('/comments')	
    // static albumsManager = () => new UrlManager('/albums')
    // static photosManager = () => new UrlManager('/photos')	
    // static usersManager = () => new UrlManager('/users')
}

export { RoutesManager }