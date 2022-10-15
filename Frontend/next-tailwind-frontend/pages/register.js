import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
function register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleRegister = () => {
    if (username && password && name && email) {
      let body = {
        first_name: name,
        username: username,
        email: email,
        password: password,
      };
      axios
        .post("http://127.0.0.1:8000/api/register/", body)
        .then((res) => {
          setUsername("");
          setPassword("");
          setName("");
          setEmail("");
          router.push("/login");
        })
        .catch((err) => {
          console.log(err);
          setUsername("");
          setPassword("");
          setName("");
          setEmail("");
        });
    }
  };

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-xl text-indigo-500 mb-4 font-medium">Regsiter</h1>
        <label className="text-lg text-gray-400 font-medium">Name</label>
        <input
          className="w-full bg-indigo-100 my-2 rounded-md p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className="text-lg text-gray-400 font-medium">Email</label>
        <input
          className="w-full bg-indigo-100 my-2 rounded-md p-2"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="text-lg text-gray-400 font-medium">Username</label>
        <input
          className="w-full bg-indigo-100 my-2 rounded-md p-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="text-lg text-gray-400 font-medium">Password</label>
        <input
          className="w-full bg-indigo-100 my-2 rounded-md p-2"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full cursor-pointer rounded-md bg-primary disabled:cursor-default disabled:bg-indigo-400 text-lg p-2 text-white text-center mt-8"
          onClick={handleRegister}
          disabled={!username || !password || !name || !email}
        >
          <h1>Register</h1>
        </button>
      </div>
    </div>
  );
}

export default register;
