import { createRequire } from 'node:module' 


export const readJSON = (path: string) => {
    const require = createRequire(path)
    return require(path)
}