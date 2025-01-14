"use client";
import Image from "next/image";
import React, { useState } from "react";
import auth from "@/public/assets/images/auth.svg";
import axios from "axios";
import { FaArrowUp, FaSpinner } from "react-icons/fa";
import Link from "next/link";

const page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/register`,
        {
          name,
          email,
          contact,
          password,
        }
      );
      console.log(response.data);
      alert("Registration Successful!");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration Failed!");
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
          alt="Register Illustration"
          width={400}
          height={400}
        />
      </div>

      {/* Right Section: Registration Form */}
      <div className="w-full lg:w-1/2 p-10">
        <p className="text-2xl leading-tight tracking-wider mb-7 font-semibold">
          Join Meta Insights 👋
        </p>
        {/* Registration Form */}
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="John Doe"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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

          {/* Contact Input */}
          <div>
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-gray-700"
            >
              Contact Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="contact"
              id="contact"
              placeholder="1234567890"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
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

          {/* Register Button */}
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
                Register
              </>
            )}
          </button>
        </form>

        {/* Footer Links */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-blue-500 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
