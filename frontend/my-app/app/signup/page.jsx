"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveToken } from "../utils/auth";
const SignupUp = () => {
  const [signUpCre, setSignUpCre] = useState({
    name: "",
    email: "",
    password: "",
    dept: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpCre((prevCre) => ({
      ...prevCre,
      [name]: value,
    }));
  };
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const formHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    console.log("form data", signUpCre);
    if (!signUpCre.name || !signUpCre.email || !signUpCre.password) {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(signUpCre.email)) {
      setError("Enter a valid email address");
      setLoading(false);
      return;
    }
    if(signUpCre.password.length < 8){
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }
    const API_URL = "http://localhost:8000/api/auth/register";
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add Authorization header if required, e.g., 'Authorization': `Bearer ${token}`
        },
        // Send the entire state object as the JSON request body
        body: JSON.stringify(signUpCre),
      });

      const data = await response.json();
      console.log("Signup response data:", data);

      if (!response.ok) {
        // Handle HTTP errors (4xx or 5xx status codes)
        const errorData = await response.json();
        console.error("Signup failed:", errorData);
        setError(`Signup Failed: ${errorData.message || "Check your inputs"}`);
        setLoading(false);
        return;
      }
      saveToken(data.token, JSON.stringify(data.user));
      router.push("/login");
    } catch (error) {
      console.error("Error during signup:", error);
      setError("An unexpected error occurred. Please try again later.");
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={formHandler}
        className="bg-white w-full max-w-md shadow-lg rounded-xl p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Account
        </h2>
        {error && <p className="text-red-500 w-full text-center">{error}</p>}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={signUpCre.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={signUpCre.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={signUpCre.password}
          onChange={handleChange}
        />
        {/* <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={signUpCre.confirmPassword}
          onChange={handleChange}
        /> */}
        {/* <select
          name="dept"
          id="dept"
          className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          value={signUpCre.dept}
          onChange={handleChange}
        >
          <option value="Web Development">Web Development</option>
          <option value="Data Science">Data Science</option>
          <option value="Cyber Security">Cyber Security</option>
          <option value="AI & ML">AI & ML</option>
          <option value="Mobile App Development">Mobile App Development</option>
        </select> */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white font-semibold py-3 rounded-lg transition `}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <p>
          Already have an account?
          <Link href="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupUp;
