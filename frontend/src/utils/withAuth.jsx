import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const withAuth=(WrappedComponenet)=>{
    const AuthComponenet=(props)=>{
        const navigate=useNavigate();
        const token=localStorage.getItem("token");

        useEffect(()=>{
            if(!token){
              navigate("/auth", { replace: true });
           
            }
        },[token,navigate]);

        if(!token){
         return null;
           
        } 

        return <WrappedComponenet {...props}/>;
    };

    return AuthComponenet;
}

export default withAuth;