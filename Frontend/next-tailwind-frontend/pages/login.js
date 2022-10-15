import React from "react";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import {useRouter} from 'next/router'
function login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const [cookieUsername, setCookieUsername, removeCookieUsername] = useCookies(['username'])
  const router = useRouter()
  var cookieExpiry = new Date();
  cookieExpiry.setDate(cookieExpiry.getDate()+60);
  const handleLogin = () => {
    if(username && password){
        let body ={
            username:username,
            password:password
        }
        axios.post('http://127.0.0.1:8000/api/api-token-auth/', body).then((res)=>{
            if(res.status === 200){

                
                setCookie("token", res.data.token,{expires: cookieExpiry});
                setCookieUsername("username",username, {expires: cookieExpiry} )
                // setLoading(false)


                // setTypeAlert("success");
                // setAlert("Login Successful");
                
                setUsername("");
                setPassword("");
                router.push('/')
                // return res.data.token;
            }
            console.log({res});
        }).catch((err)=>{
            setUsername("");
            setPassword("");
            console.log(err);
            
        })
    }
  };

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-xl text-indigo-500 mb-4 font-medium">Login</h1>
        <label className="text-lg text-gray-400 font-medium">Username</label>
        <input className="w-full bg-indigo-100 my-2 rounded-md p-2" value={username} onChange={(e)=>setUsername(e.target.value)} />
        <label className="text-lg text-gray-400 font-medium">Password</label>
        <input
          className="w-full bg-indigo-100 my-2 rounded-md p-2"
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button className="w-full cursor-pointer rounded-md bg-primary disabled:cursor-default disabled:bg-indigo-400 text-lg p-2 text-white text-center mt-8" onClick={handleLogin} disabled={!username || !password} >
          <h1>Login</h1>
        </button>
      </div>
    </div>
  );
}

export default login;
