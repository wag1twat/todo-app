import { Boolean, Number, Record, Static, String } from "runtypes"

const todoDto = Record({
    completed: Boolean,
    id:Number,
    title: String,
    userId:Number
})

type TodoDto = Static<typeof todoDto>

export type { TodoDto }
export { todoDto }