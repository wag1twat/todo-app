type StringOrNumber = string | number

type Query<K extends string> = {
    [I in K]?: StringOrNumber
}

type Queries<T extends unknown> = {
    queries?: T
}

type LimiterQueries = Query<'_start' | '_limit'>


export type { StringOrNumber, Query, Queries, LimiterQueries }