import { setLoading,setUser } from "../store/auth.slice";
import { registerUser,loginUser, getUser } from "../service/auth.api";
import { useDispatch } from "react-redux";

export const useAuth = () => {
    const dispatch = useDispatch();
    
    async function handleRegister({email,contact,password,fullname,isSeller=false}){
            
        const response = await registerUser({email,contact,password,fullname,isSeller})
        dispatch(setUser(response.user))

        return response.user
    }

    async function handleLogin({email,password}){
        
        const response = await loginUser({email,password})
        dispatch(setUser(response.user))

        return response.user
    }

    async function handleGetMe(){
        try{

            dispatch(setLoading(true))
            const data = await getUser()
            dispatch(setUser(data.user))
        }catch(err){
            console.log(err)
        }finally{
            dispatch(setLoading(false))
        }
    }

    return {handleRegister, handleLogin ,handleGetMe}
}