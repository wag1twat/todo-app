import React from 'react'
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Transform } from '../../../processes';

type Queries<K extends string> = Record<K, {
    def: string
    guard: (value: unknown) => boolean
}>;

type ValidateResult<Q extends Queries<string>> = {
    [K in keyof Q]: {
        isValid: boolean
        def: Q[K]['def']
    }
}
interface Validate {
    <Q extends Queries<string>>(queries: Q, searchParams: URLSearchParams): ValidateResult<Q>
}


const validate: Validate = (queries, searchParams) => {
    const keys = (Object.keys(queries) as (keyof typeof queries)[])

    return keys.reduce<ValidateResult<typeof queries>>((acc, key) => {
        const isValid = queries[key].guard(Transform.identy(searchParams.get(key as string)))
        return {
            ...acc,
            [key]: { isValid, def: queries[key].def }
        }
    }, {} as ValidateResult<typeof queries>)
}

const searchReplace = (result: ReturnType<Validate>, searchParams: URLSearchParams) => {
    const entries = Object.entries(result)

    if(entries.every(([, { isValid }]) => isValid)) {
        return
    }

    Object.entries(result).forEach(([key, { def, isValid}]) => {
        if(!isValid) {
            searchParams.set(key, def)
        }
    })

    return searchParams.toString()
}

const useQueriesGuardRoute = <T extends Queries<string>>(props: T) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();

    React.useEffect(() => {
        const queries = validate(props, searchParams)
        const search = searchReplace(queries, searchParams)

        if(search) {
            navigate({
                pathname: location.pathname,
                search
            })
        }
    }, [props])
};

export type { Queries }
export { useQueriesGuardRoute }