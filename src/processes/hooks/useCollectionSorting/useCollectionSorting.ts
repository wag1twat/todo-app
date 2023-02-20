import React from "react"
import { Guards } from "src/processes/core"

type Order = 'ASC' | 'DESC' | 'default'

interface Modifier<T extends unknown> {
    (collectionItem: T) : unknown
}

type Modifiers<T extends unknown> = Record<keyof T, Modifier<T>>

interface Options<T extends unknown> {
    defaultField: keyof T,
    defaultOrder: Order,
    modifiers?: Partial<Modifiers<T>>
}

const { isBoolean, isNumber, isString } = Guards

const sortCallback = <T extends unknown>(order: Exclude<Order, 'default'>, field: keyof T, modifier?: Modifier<T>) => (a: T, b: T) => {
    const isAsc = order === 'ASC'
    const af = modifier ? modifier(a) : a[field] as unknown
    const bf = modifier ? modifier(b) : b[field] as unknown
    if(isString(af) && isString(bf)) {
        return isAsc ? bf.localeCompare(af) : af.localeCompare(bf)
    }
    if((isBoolean(af) && isBoolean(bf)) || (isNumber(af) && isNumber(bf))) {
        return isAsc ? (af > bf ? 1 : -1) : (af < bf ? 1 : -1)
    }
    return 0
}

const sortFn = <T extends unknown>(defaultCollection: T[], order: Order, field: keyof T, modifier?: Modifier<T>) => {
    let collection = [...defaultCollection]
    if(order === 'ASC' || order === 'DESC') {
        collection = collection.sort(sortCallback(order, field, modifier))
    }
    if(order === 'default') {
       return collection
    }
    return collection
}

const useCollectionSorting = <T extends unknown>(defaultCollection: T[], options: Options<T>) => {
    const { defaultField, defaultOrder, modifiers } = options
    const ordersRef = React.useRef<Order[]>(['ASC', 'DESC', 'default'])
    const defaultCollectionRef = React.useRef<T[]>([])
    const [field, setField] = React.useState<keyof T>(() => defaultField)
    const [order, setOrder] = React.useState<Order>(() => defaultOrder)
    const [collection, setCollection] = React.useState(() => [...defaultCollection])

    const sort = React.useCallback((nextField: keyof T) => {
        setField(nextField)

        if(field === nextField) {
            let nextOrder: Order
            const lastIndex = ordersRef.current.length - 1
            const currentOrderIndex = ordersRef.current.indexOf(order)
            const nextOrderIndex = currentOrderIndex + 1

            if(nextOrderIndex <= lastIndex) {
                nextOrder = ordersRef.current[nextOrderIndex]
            }
            if(nextOrderIndex > lastIndex) {
                nextOrder = ordersRef.current[0]
            }
            setOrder(() => nextOrder)
        }
    }, [field, order])

    const isEqual = React.useMemo(() => JSON.stringify(defaultCollection) !== JSON.stringify(defaultCollectionRef.current), [defaultCollection])

    React.useEffect(() => {
        if(!isEqual) {
            defaultCollectionRef.current = defaultCollection
        }
    }, [isEqual, defaultCollection])

    React.useEffect(() => {
        // TODO: memoize sortFn ???
        const collection = sortFn(defaultCollection, order, field, modifiers?.[field])
        setCollection(() => collection)
    }, [isEqual, order, field, modifiers?.[field]])

    return { collection, sort }
}

export { useCollectionSorting }