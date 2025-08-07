import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContext = createContext()

export const AppContextProvider = (props)=>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    axios.defaults.withCredentials = true

    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const [userData,setUserData] = useState(false)

    const navigate = useNavigate()


    const getAuthState = async ()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/auth/is-auth')
            if(data.success){
                setIsLoggedIn(true)
                getUserData()
            }
        } catch (error) {
            toast.error(error.message,{position:"top-center"})
        }
    }

 
    const getUserData = async () =>{
        try {
            const response =await axios.get(backendUrl + '/api/user/data')
            const data = response.data
            setUserData(data.userData)
        } catch (error) {
            toast.error(data.message,{position:"top-center"})
        }
    }


    const sentVerificationOtp = async ()=>{
        try {
            const {data} = await axios.post(backendUrl + "/api/auth/send-verify-otp")
            if(data.success){
                navigate('/email-verify')
                toast.success(data.message,{position:"top-center"})
            }else{
                toast.error(data.message,{position:"top-center"})
            }
        } catch (error) {
            toast.error(error.message,{position:"top-center"})
        }
    }


    const logout = async()=>{
        try {
            const response = await axios.post(backendUrl + '/api/auth/logout')

            if(response.data.success){
                setIsLoggedIn(false)
                setUserData(false)
            }

            toast.success(response.data.message,{position:"top-center"})

            navigate('/')
            
        } catch (error) {
            toast.error(error.message,{position:"top-center"})
        }
    }

     useEffect(()=>{
         getAuthState()
     },[])


    const value = {
        backendUrl,
        isLoggedIn,setIsLoggedIn,
        userData,setUserData,
        getUserData,getAuthState,
        logout,
        sentVerificationOtp
    }


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}