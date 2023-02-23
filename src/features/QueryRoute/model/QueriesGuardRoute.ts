import React from 'react'
import { useSearchParams } from "react-router-dom";
import Transform from 'src/processes/core/Transform';

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

const searchReplace = (queries: ReturnType<Validate>) => {
    const result: Record<string, string> = {}

    const entries = Object.entries(queries)

    if(entries.every(([, { isValid }]) => isValid)) {
        return result
    }

    entries.forEach(([key, { def, isValid}]) => {
        if(!isValid) {
            result[key] = def
        }
    })

    return result
}

const useQueriesGuardRoute = <T extends Queries<string>>(props: T) => {
    const [searchParams, setSearchParams] = useSearchParams();

    React.useEffect(() => {
        const queries = validate(props, searchParams)
        const search = searchReplace(queries)
        
        setSearchParams(prev => {
            Object.entries(search).forEach(([key, value]) => {
                prev.set(key, value)
            })
            return prev
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props, searchParams.toString()])
};

export type { Queries }
export { useQueriesGuardRoute }