import { Record, String } from "runtypes"

class Env {
    private REACT_APP_API = 'REACT_APP_API'
    private REACT_APP_VERSION = 'REACT_APP_VERSION'
    private REACT_APP_NAME = 'REACT_APP_NAME'
    public API: string
    public VERSION: string
    public NAME: string
    private contract = Record({
        [this.REACT_APP_API]: String,
        [this.REACT_APP_VERSION]: String,
        [this.REACT_APP_NAME]: String,
    })

    constructor() {
        this.contract.check(process.env)

        this.API = process.env[this.REACT_APP_API] || ''
        this.VERSION = process.env[this.REACT_APP_API] || ''
        this.NAME = process.env[this.REACT_APP_API] || ''
    }
}

export { Env }