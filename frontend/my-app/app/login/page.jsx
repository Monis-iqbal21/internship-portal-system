"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
const Login = () => {
  const router = useRouter();
  const [loginCre, setLoginCre] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginCre((prevCre) => ({
      ...prevCre,
      [name]: value,
    }));
  };
  const formHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    console.log("form data", loginCre);
    if (!loginCre.email || !loginCre.password) {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(loginCre.email)) {
      setError("Enter a valid email address");
      setLoading(false);
      return;
    }
    if (loginCre.password.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }
    const API_URL = "http://localhost:8000/api/auth/login";
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginCre),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(`login failed: ${error.message || "Check your inputs"}`);
        setLoading(false);
        return;
      }
      if(data.token){
        localStorage.setItem("token", data.token);
      }
      // role base redirection
      console.log("Login successful");
      if(data.user.role == "student" ){
        router.push("/student/dashboard");
        console.log(data)
      } else if(data.user.role == "admin"){
        router.push("/admin/dashboard");
        console.log(data)
      } else{
        router.push("/page404");
        console.log(data)
      }


    } catch (e) {
      console.error("Error during Login", e);
      setError("An unexpected error occurred. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={formHandler}>
        <h2 className="text-2xl font-bold text-center text-gray-800">
          login Account
        </h2>
        {error && <p className="text-red-500 w-full text-center">{error}</p>}
        <input
          type="text"
          name="email"
          placeholder="Email"
          required
          value={loginCre.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={loginCre.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white font-semibold py-3 rounded-lg transition `}
        >
          {loading ? " Logging In..." : "Login"}
        </button>
        <p>
          Don&apos;t have an account?
          <Link href="/signup" className="text-blue-600 hover:underline">
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
