import { Record, String, Static } from "runtypes"

enum EnvKeys {
    REACT_APP_API = 'REACT_APP_API',
    REACT_APP_VERSION = 'REACT_APP_VERSION'
}

const env = Record({
    [EnvKeys.REACT_APP_API]: String,
    [EnvKeys.REACT_APP_VERSION]: String,
})


type Env = Static<typeof env>

class EnvManager {
    static check(){
       return env.check(process.env)
    }
}

export type { Env }
export { EnvKeys, EnvManager }