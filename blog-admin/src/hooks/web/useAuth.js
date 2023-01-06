import { useCache } from "./useCache";

const { wsCache } = useCache()

const authMethods = {
    setToken(token) {
        wsCache.set('sss-token', token)
    },
    getToken() {
        wsCache.get('sss-token')
    }
}

export const useAuth = () => authMethods