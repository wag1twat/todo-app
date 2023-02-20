import { Queries } from "./Queries"
import { StringOrNumber } from "./types"

class Url extends Queries {
    private value: string
    constructor(value: string) {
        super()
        this.value = value
    }

    public exec() {
        return this.value
    }

    /**
     * 
     * @param sepator string between value of values
     * @param values array of string for joined to base string with sepator
     * @returns { Url }
     */
    private separate(sepator: string, ...values: (StringOrNumber | undefined)[]): Url {
        this.value = [this.value, ...values.filter(v => v !== undefined)].join(sepator)
        return this
    }

    /**
     * @param values array of string for joined to base string with separator - "/"
     * @example slash('user', 'posts')
     * @returns { Url }
     */
    public slash(...values: (StringOrNumber | undefined)[]): Url {
        return this.separate('/', ...values)
    }
    /**
     * @param values array of string for joined to base string with separator - "/:"
     * @example slashColon('userId', 'postId')
     * @returns { Url }
     */
    public slashColon(...values: (StringOrNumber | undefined)[]): Url {
        return this.separate('/:', ...values)
    }

    public query(params: object): Url {
        if(Object.keys(params).length === 0) {
            return this
        }
        
        this.value = `${this.value}?${this.serialize(params)}`
        
        return this
    }
}

export { Url }