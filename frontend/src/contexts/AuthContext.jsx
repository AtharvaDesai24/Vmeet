import React, { createContext, useState } from "react";
import server from "../../environment";
import axios from "axios";

export const AuthContext = createContext({});

const client = axios.create({
    baseURL: `${server}/api/v1/users`,
});

export const AuthProvider = ({ children }) => {

    const [userData, setUserData] = useState({});
  
    // ================= REGISTER =================

    const handleRegister = async (name, username, password) => {
        try {

            const response = await client.post("/register", {
                name,
                username,
                password,
            });

            return response.data;

        } catch (err) {
            throw err;
        }
    };


    // ================= LOGIN =================

    const handleLogin = async (username, password) => {
        try {

            const response = await client.post("/login", {
                username,
                password,
            });

            if (response.status === 200) {
                localStorage.setItem(
                    "token",
                    response.data.token
                );
                
            }

            return response.data;

        } catch (err) {
            throw err;
        }
    };

    const getHistoryOfUser=async()=>{
        try{
            let request=await client.get("/get_all_activity",{
                params:{
                      token:localStorage.getItem("token")
                }
            });
            return request.data;
        }catch(err){
            throw err;
        }
    }

    const addToUserHistory=async(meetingCode)=>{
      
      try{  let request=await client.post("/add_to_activity",{
            token:localStorage.getItem("token"),
            meetingCode:meetingCode
        });
        return request.status;
    }catch(err){
     throw err;
    }
    }

    const data = {
        userData,
        setUserData,
        handleRegister,
        handleLogin,
        getHistoryOfUser,
        addToUserHistory,
    };


    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};