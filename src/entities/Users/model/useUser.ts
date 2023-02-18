import React from 'react'
import {  Undefined } from 'runtypes';
import { Core, useGet } from '../../../processes';
import { User, userContract } from './useUsers';

const useUser = (id: string | undefined) => {
    const user = useGet<User | undefined>(['user'], { initialState: undefined, cacheTime: 10000 })

    React.useEffect(() => {
        if(id) {
            user.get(Core.api().user(id).exec())
        }
    }, [user.get, id]);

    React.useEffect(() => {
       userContract.Or(Undefined).check(user.state)
    }, [user.state])

    return user
}

export {  useUser }