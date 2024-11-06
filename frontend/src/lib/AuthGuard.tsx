'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/lib/utils';
import { jwtDecode } from 'jwt-decode';
import api from '@/lib/api';


interface AuthGuardProps {
   children: React.ReactNode;
}


const AuthGuard = ({ children }: AuthGuardProps) => {
   const router = useRouter();
   const [isAuthorized, setIsAuthorized] = useState(false);


   useEffect(() => {
     auth().catch(() => setIsAuthorized(false))
   }, )
  
   const refreshToken = async () => {
       const refresh_token = localStorage.getItem(REFRESH_TOKEN)


       try {
           const res = await api.post("/api/token/refresh/", {refresh: refresh_token})


           if(res.status === 200){
               localStorage.setItem(ACCESS_TOKEN, res.data.access)
               setIsAuthorized(true)
           }
           else{
               setIsAuthorized(false)
           }


       } catch (error) {
           console.log(error);
           setIsAuthorized(false)
       }
   }


   const auth = async () => {
       const token = localStorage.getItem(ACCESS_TOKEN);


       if (!token) {
           setIsAuthorized(false)
           return
       }


       const decoded = jwtDecode(token)
       const tokenExpiration = decoded.exp
       const now = Date.now() / 1000
       


       tokenExpiration! < now ? refreshToken() : setIsAuthorized(true)
   }


   useEffect(() => {
       if (!isAuthorized) {
          router.push("/auth/")
       }
       else{
        router.push("/profile/")
       }

   }, [isAuthorized, router]);


   return <>{children}</>;
};

export default AuthGuard;