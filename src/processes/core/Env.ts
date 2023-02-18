import { Record, String } from "runtypes"

class Env {
    private variables = {
        REACT_APP_API : 'REACT_APP_API' as const,
        REACT_APP_VERSION : 'REACT_APP_VERSION' as const,
        REACT_APP_NAME : 'REACT_APP_NAME' as const,
    }
    public API: string
    public VERSION: string
    public NAME: string
    private contract = Record(Object.keys(this.variables).reduce((acc, key) => {
        return { ...acc, [key]: String }
    }, {}))

    constructor() {
        this.contract.check(process.env)

        this.API = process.env[this.variables.REACT_APP_API] || ''
        this.VERSION = process.env[this.variables.REACT_APP_API] || ''
        this.NAME = process.env[this.variables.REACT_APP_API] || ''
    }
}

export { Env }