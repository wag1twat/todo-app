class Url {
    private value: string
    constructor(value: string) {
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
    private separate(sepator: string, ...values: (string)[]): Url {
        this.value = [this.value, ...values].join(sepator)
        return this
    }

    /**
     * @param values array of string for joined to base string with separator - "/"
     * @example slash('user', 'posts')
     * @returns { Url }
     */
    public slash(...values: (string)[]): Url {
        return this.separate('/', ...values)
    }
    /**
     * @param values array of string for joined to base string with separator - "/:"
     * @example slashColon('userId', 'postId')
     * @returns { Url }
     */
    public slashColon(...values: (string)[]): Url {
        return this.separate('/:', ...values)
    }
}

export { Url }