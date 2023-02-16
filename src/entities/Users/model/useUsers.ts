import React from 'react'
import { Array, Number, Record, Static, String, Undefined } from 'runtypes';
import { ApiManager, useGet } from '../../../processes';

const geo = Record({
    lat: String, lng: String
})

const address = Record({
    city: String,
    geo,
    street: String,
    suite: String,
    zipcode: String,
})

const company = Record({
    bs: String,
    catchPhrase: String,
    name: String
})

const user = Record({
    address,
    company,
    email: String,
    id: Number,
    name: String,
    phone: String,
    username: String,
    website: String
})

type User = Static<typeof user>

const useUsers = () => {
    const users = useGet<User[]>(['users'], { initialState: [], cacheTime: 10000 })

    React.useEffect(() => {
        users.get(ApiManager.usersManager.users.url)
    }, [users.get]);

    React.useEffect(() => {
        Array(user).Or(Undefined).check(users.state)
    }, [users.state])

    return users
}

export type { User }
export { useUsers }