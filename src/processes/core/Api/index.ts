import { Array } from "runtypes"
import { UrlSerializer } from "shulga-app-core"
import { axiosInstance } from "../../axios"
import { commentDto, CommentDto, CommentQeriesDto, commentsQeriesDto, limiterDto, LimiterDto, postDto, PostDto, todoDto, TodoDto, userDto, UserDto } from "./dto"
import env from "../env"


class Api {
    constructor() {
        this.getComments = this.getComments.bind(this)
        this.getUser = this.getUser.bind(this)
        this.getUsers = this.getUsers.bind(this)
        this.getPost = this.getPost.bind(this)
        this.getPosts = this.getPosts.bind(this)
        this.getTodo = this.getTodo.bind(this)
        this.getTodos = this.getTodos.bind(this)
    }
    private urlSerializer = new UrlSerializer(env.REACT_APP_API ? env.REACT_APP_API : '')
    private root = this.urlSerializer.build()
    private todos = this.root.extend().path('todos').build()
    private todo = this.todos.extend().param('todoId').build()
    private users = this.root.extend().path('users').build()
    private user = this.users.extend().param('userId').build()
    private posts = this.root.extend().path('posts').build()
    private post = this.posts.extend().param('postId').build()
    private comments = this.root.extend().path('comments').build()


    async getTodos(){
        return axiosInstance.get<TodoDto[]>(this.todos.link({}).path).then((response) => {
            Array(todoDto).check(response.data)
            return response
        })
    }
    async getTodo(...parameters: Parameters<Api['todo']['link']>){
        return axiosInstance.get<TodoDto>(this.todo.link(...parameters).path).then(response => {
            todoDto.check(response.data)
            return response
        })
    }
    async getUsers(){
        return axiosInstance.get<UserDto[]>(this.users.link({}).path).then(response => {
            Array(userDto).check(response.data)
            return response
        })
    }
    async getUser(...parameters: Parameters<Api['user']['link']>){
        return axiosInstance.get<UserDto>(this.user.link(...parameters).path).then(response => {
            userDto.check(response.data)
            return response
        })
    }
    async getPosts(props: LimiterDto) {
        limiterDto.check(props)
        return axiosInstance.get<PostDto[]>(this.posts.queries(props).path).then(response => {
            Array(postDto).check(response.data)
            return response
        })
    }
    async getPost(...parameters: Parameters<Api['post']['link']>){
        return axiosInstance.get<PostDto>(this.post.link(...parameters).path).then(response => {
            postDto.check(response.data)
            return response
        })
    }
    async getComments(props: CommentQeriesDto){
        commentsQeriesDto.check(props)
        return axiosInstance.get<CommentDto[]>(this.comments.queries(props).path).then(response => {
            Array(commentDto).check(response.data)
            return response
        })
    }
}

const api = new Api()

export default api