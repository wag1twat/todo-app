import React from 'react'
import {  Undefined } from 'runtypes';
import { Core, useGet } from '../../../processes';
import { User, userContract } from './useUsers';

const useUser = (id: number | undefined) => {
    const user = useGet<User | undefined>(['user'], { initialState: undefined, cacheTime: 10000, enabled: id !== undefined })

    React.useEffect(() => {
        user.get(Core.api().user(String(id)).exec())
    }, [user.get, id]);

    React.useEffect(() => {
       userContract.Or(Undefined).check(user.state)
    }, [user.state])

    return user
}

export {  useUser }