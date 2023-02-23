class Transform {
    static identy<T extends unknown>(value: T): NonNullable<T> | undefined {
        if(value === null) {
            return undefined
        }
        if(value === undefined) {
            return value
        }
        return value
    }
}

export default Transform