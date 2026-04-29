import {setUser, setLoading, setError} from "../store/auth.slice"
import { register, login, getMe } from "../service/auth.api"
import { useDispatch } from "react-redux";


export const useAuth = () => {

    const dispatch = useDispatch()


    async function handleRegister(data) {

        const res = await register(data)
        dispatch(setUser(res.user))
        return res.user
    }

    async function handleLogin(data) {

        const res = await login(data)
        dispatch(setUser(res.user))
        return res.user
    }

    async function handleGetMe() {
        try {
            dispatch(setLoading(true))
            const data = await getMe()
            dispatch(setUser(data.user))
        } catch (err) {
            console.log(err)
        } finally {
            dispatch(setLoading(false))
        }
    }

    return { handleRegister, handleLogin, handleGetMe }
}