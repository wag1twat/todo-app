class Serializer {
    static query(params: object, prefix?: string): string {
        const query = (Object.keys(params)).map(key => {
            const value = params[key as (keyof typeof params)]

            // -> pick undefined or null props
            if(value === undefined || value === null) {
                return ''
            }

            if(params.constructor === Array) {
                key = `${prefix}[]`
            } else if(params.constructor === Object) {
                key = (prefix ? `${prefix}[${key}]` : key);
            }
            
            if(typeof value === 'object') {
                return this.query(value, key)
            } else {
                return `${key}=${encodeURIComponent(value)}`
            }
        })

        // query.filter(q => q !== '') > pick undefined or null props
        return  ([] as string[]).concat.apply([] as string[], query.filter(q => q !== '')).join('&')
    }
}

class Queries {
    protected serialize(params: object, prefix?: string): string {
        return Serializer.query(params, prefix)
    }
}

export { Queries, Serializer }