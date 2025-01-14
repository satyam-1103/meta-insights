"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import auth from "@/public/assets/images/auth.svg";
import axios from "axios";
import { FaArrowUp, FaSpinner } from "react-icons/fa";
import Link from "next/link";
const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/login`,
        {
          email,
          password,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login Failed!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full mt-32 lg:mt-0 flex flex-col lg:flex-row lg:w-[70%] lg:h-full rounded-lg shadow-xl items-center mx-auto justify-center bg-white">
      {/* Left Section: Image */}
      <div className="w-full lg:w-[70%] hidden lg:flex items-center justify-center">
        <Image
          src={auth} // Replace with the actual image path
          alt="Login Illustration"
          width={400}
          height={400}
        />
      </div>

      {/* Right Section: Login Form */}
      <div className="w-full lg:w-1/2 p-10">
        <p className="text-2xl leading-tight tracking-wider mb-7 font-semibold">
          Welcome to Meta Insights 👋
        </p>
        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="abc@xyz.com"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <button
            className={`w-full py-3 bg-blue-600 text-white rounded-md flex items-center justify-center gap-2 hover:bg-blue-700 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <FaArrowUp />
                Login
              </>
            )}
          </button>
        </form>

        {/* Footer Links */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            href="/auth/register"
            className="text-blue-500 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
