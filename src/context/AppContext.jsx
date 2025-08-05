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
            console.log(data)
            if(data.success){
                setIsLoggedIn(true)
                getUserData()
                // console.log(userData)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

 
    const getUserData = async () =>{
        try {
            const response =await axios.get(backendUrl + '/api/user/data')
            const data = response.data
            console.log(data)
            console.log(data.userData)
            setUserData(data.userData)

            console.log(userData)
        } catch (error) {
            toast.error(data.message)
        }
    }

    const logout = async()=>{
        try {
            const response = await axios.post(backendUrl + '/api/auth/logout')

            if(response.data.success){
                setIsLoggedIn(false)
                setUserData(false)
            }

            toast.success(response.data.message)

            navigate('/')
            
        } catch (error) {
            toast.error(error.message)
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
        logout
    }


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}