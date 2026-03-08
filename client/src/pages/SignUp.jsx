import React, { useState } from "react"
import { assets } from "../assets/images/assets"
import useAuthStore from "../store/useAuthStore"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useEffect } from "react"

const emptyForm = {
    name: "",
    email: "",
    password: ""
}

const SignUp = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [form, setForm] = useState(emptyForm)
    const login = useAuthStore((s) => s.login)
    const signup = useAuthStore((s) => s.signup)
    const navigate = useNavigate()
    const location = useLocation()
    const redirectTo = location.state?.from || "/"
    const user = useAuthStore((s) => s.user)

    useEffect(() => {
        console.log(user);
        
        if (user) {
            navigate("/", { replace: true })
        }
    }, [user, navigate])

    const handleChange = (e) => {
        setForm((prev) => (
            {
                ...prev,
                [e.target.name]: e.target.value,
            }
        ))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let res;

        if (isLogin) {
            res = await login({
                email: form.email,
                password: form.password
            });
            console.log(res);

            if (res.message === "Login successfully") {
                setForm(emptyForm);
                navigate(redirectTo);
                toast.success(res.message)
            } else {
                toast.error(res.message);
            }
        } else {
            res = await signup(form);

            if (res.message === "Registered successfully") {
                setIsLogin(true)
                setForm(emptyForm)
                toast.success(res.message)
            } else {
                toast.error(res.message)
            }
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="flex w-full max-w-[1200px] items-center gap-20">

                {/* LEFT IMAGE (HIDDEN ON MOBILE) */}
                <div className="hidden lg:flex w-1/2 justify-center">
                    <img
                        src={assets.LoginSideImg}
                        alt="Auth"
                        className="w-full max-w-[520px] object-contain"
                    />
                </div>

                {/* RIGHT FORM */}
                <div className="w-full lg:w-1/2 max-w-[420px]">
                    <div className="flex flex-col gap-8">

                        {/* HEADER */}
                        <div>
                            <h2 className="text-3xl font-medium mb-2">
                                {isLogin ? "Log in to Exclusive" : "Create an account"}
                            </h2>
                            <p className="text-gray-500 text-sm">
                                {isLogin
                                    ? "Enter your credentials below"
                                    : "Enter your details below"}
                            </p>
                        </div>

                        {/* FORM */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            {!isLogin && (
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Name"
                                    className="border-b outline-none py-2"
                                />
                            )}

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="border-b outline-none py-2"
                            />

                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="border-b outline-none py-2"
                            />

                            {/* BUTTON */}
                            <button
                                type="submit"
                                className="bg-[#DB4444] text-white py-3 rounded hover:opacity-90 transition"
                            >
                                {isLogin ? "Login" : "Create Account"}
                            </button>

                            {/* GOOGLE */}
                            {!isLogin && (
                                <button
                                    type="button"
                                    className="flex items-center justify-center gap-3 border py-3 rounded"
                                >
                                    <img
                                        src={assets.GoogleIcon}
                                        alt="Google"
                                        className="w-5 h-5"
                                    />
                                    Sign up with Google
                                </button>
                            )}
                        </form>

                        {/* TOGGLE */}
                        <p className="text-sm text-center text-gray-600">
                            {isLogin ? "Don’t have an account?" : "Already have an account?"}
                            <button
                                type="button"
                                onClick={() => setIsLogin(!isLogin)}
                                className="ml-2 text-[#DB4444] font-medium cursor-pointer"
                            >
                                {isLogin ? "Sign up" : "Log in"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default SignUp
