import { Array } from "runtypes"
import { axiosInstance } from "../../axios"
import { LimiterQueries, Queries, Query } from "../types"
import { Url } from "../Url"
import { commentDto, CommentDto, postDto, PostDto, todoDto, TodoDto, userDto, UserDto } from "./dto"

class Api extends Url  {
    private get<T extends unknown>() {
        return axiosInstance.get<T>(this.exec())
    }
    private todos() {
        return this.slash('todos')
    }
    private todo(args: Query<'id'>) {
        const { id } = args
        return this.todos().slash(id)
    }
    private users() {
        return this.slash('users')
    }
    private user(args: Query<'id'>) {
        const { id } = args
        return this.users().slash(id)
    }
    private posts(args: Queries<LimiterQueries> = {}) {
        const { queries = {} } = args
        return this.slash('posts').query(queries)
    }
    private post(args: Query<'id'>) {
        const { id } = args
        return this.posts().slash(id)
    }
    private comments(args: Queries<Query<'postId' | 'userId'>>) {
        const { queries = {} } = args
        return this.slash('comments').query(queries)
    }

    async getTodos(...rest: Parameters<Api['todos']>){
        this.todos(...rest)
        return this.get<TodoDto[]>().then((response) => {
            // Array(todoDto).check(response.data)
            return response
        })
    }
    async getTodo(...rest: Parameters<Api['todo']>){
        this.todo(...rest)
        return this.get<TodoDto>().then(response => {
            // todoDto.check(response.data)
            return response
        })
    }
    async getUsers(...rest: Parameters<Api['users']>){
        this.users(...rest)
        return this.get<UserDto[]>().then(response => {
            // Array(userDto).check(response.data)
            return response
        })
    }
    async getUser(...rest: Parameters<Api['user']>){
        this.user(...rest)
        return this.get<UserDto>().then(response => {
            // userDto.check(response.data)
            return response
        })
    }
    async getPosts(...rest: Parameters<Api['posts']>) {
        this.posts(...rest)
        return this.get<PostDto[]>().then(response => {
            // Array(postDto).check(response.data)
            return response
        })
    }
    async getPost(...rest: Parameters<Api['post']>){
        this.post(...rest)
        return this.get<PostDto>().then(response => {
            // postDto.check(response.data)
            return response
        })
    }
    async getComments(...rest: Parameters<Api['comments']>){
        this.comments(...rest)
        return this.get<CommentDto[]>().then(response => {
            // Array(commentDto).check(response.data)
            return response
        })
    }

    constructor(api: string) {
        super(api)

        this.get = this.get.bind(this)
        this.comments = this.comments.bind(this)
        this.user = this.user.bind(this)
        this.users = this.users.bind(this)
        this.post = this.post.bind(this)
        this.posts = this.posts.bind(this)
        this.todo = this.todo.bind(this)
        this.todos = this.todos.bind(this)
        this.getComments = this.getComments.bind(this)
        this.getUser = this.getUser.bind(this)
        this.getUsers = this.getUsers.bind(this)
        this.getPost = this.getPost.bind(this)
        this.getPosts = this.getPosts.bind(this)
        this.getTodo = this.getTodo.bind(this)
        this.getTodos = this.getTodos.bind(this)
    }

}

export type { Query, Queries, LimiterQueries, }
export { Api }
