import { RequiredEnv } from 'shulga-app-core'

const requiredEnv = new RequiredEnv(['REACT_APP_API', 'REACT_APP_VERSION', 'REACT_APP_NAME'] as const)

const env = requiredEnv.getVariables()

export default env