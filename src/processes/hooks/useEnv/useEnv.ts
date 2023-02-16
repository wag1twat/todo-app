import { Env, EnvKeys,  } from "../../managers"

const useEnv = (): Partial<Env> => {
    return {
        [EnvKeys.REACT_APP_API]: process.env[EnvKeys.REACT_APP_API],
        [EnvKeys.REACT_APP_VERSION]: process.env[EnvKeys.REACT_APP_VERSION],
        [EnvKeys.REACT_APP_NAME]: process.env[EnvKeys.REACT_APP_NAME]
    }
}

export { useEnv }