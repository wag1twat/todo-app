import { Number, Record, Static, String } from "runtypes"

const commentDto = Record({
    body: String,
    email: String,
    id: Number,
    name: String,
    postId: Number
})

type CommentDto = Static<typeof commentDto>

export type { CommentDto }
export { commentDto }