class Queries {
    private url: string
    constructor(url: string) {
        this.url = url
    }

    public serialize(params: object, prefix?: string): string {
        const query = (Object.keys(params)).map(key => {
            const value = params[key as (keyof typeof params)]

            if(params.constructor === Array) {
                key = `${prefix}[]`
            } else if(params.constructor === Object) {
                key = (prefix ? `${prefix}[${key}]` : key);
            }
            
            if(typeof value === 'object') {
                return this.serialize(value, key)
            } else {
                return `${key}=${encodeURIComponent(value)}`
            }
        })

        return ([] as string[]).concat.apply([] as string[], query).join('&');
    }

    public field<K extends string>(key: K) {
        const location = globalThis.location

        const urlSearchParams = new URLSearchParams(location.search)

        const field = urlSearchParams.get(key)

        return field ? field : ''
    }
}

export { Queries }