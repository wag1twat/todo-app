import React from 'react'
import { Array, Number, Record, Static, String, Undefined } from 'runtypes';
import { Managers, useGet } from '../../../processes';

const geoContact = Record({
    lat: String, lng: String
})

const addressContract = Record({
    city: String,
    geo: geoContact,
    street: String,
    suite: String,
    zipcode: String,
})

const companyContract = Record({
    bs: String,
    catchPhrase: String,
    name: String
})

const userContract = Record({
    address: addressContract,
    company: companyContract,
    email: String,
    id: Number,
    name: String,
    phone: String,
    username: String,
    website: String
})

type User = Static<typeof userContract>

const useUsers = () => {
    const users = useGet<User[]>(['users'], { initialState: [], cacheTime: 10000 })

    React.useEffect(() => {
        users.get(Managers.api().users().exec())
    }, [users.get]);

    React.useEffect(() => {
        Array(userContract).Or(Undefined).check(users.state)
    }, [users.state])

    return users
}

export type { User }
export { userContract, useUsers }