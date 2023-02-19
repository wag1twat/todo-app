class Guards {
    static isString = (value: unknown): value is string => {
        return typeof value === 'string'
    }
    static isNumber = (value: unknown): value is number => {     
        return typeof value === 'number'
    }
    static isBoolean = (value: unknown): value is boolean => {  
        return typeof value === 'boolean'
    }
}

export { Guards }