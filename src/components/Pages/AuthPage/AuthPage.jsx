import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../../API/AuthThunk";
import { useNavigate } from "react-router";

const AuthPage = () => {

    const [activeTab, setActiveTab] = useState("login");
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const [loginErrors, setLoginErrors] = useState({});

    const [registerData, setRegisterData] = useState({
        fullName: "",
        email: "",
        password: "",
    });
    const [registerErrors, setRegisterErrors] = useState({});

    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);

    const inputRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (activeTab === "login" && inputRef.current) {
            inputRef.current.focus();
        }
    }, [activeTab]);

    // Show/Hide Login Password
    const loginPasswordToggler = () => {
        setShowLoginPassword(!showLoginPassword);
    };

    // Show/Hide Register Password
    const registerPasswordToggler = () => {
        setShowRegisterPassword(!showRegisterPassword);
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
        setLoginErrors({ ...loginErrors, [name]: "" });
    };

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({ ...registerData, [name]: value });
        setRegisterErrors({ ...registerErrors, [name]: "" });
    };

    const validateLogin = () => {
        let newLoginErrors = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (loginData.email.trim().length === 0) {
            newLoginErrors.email = "Email field is empty";
        } else if (!emailRegex.test(loginData.email)) {
            newLoginErrors.email = "Invalid Email Address";
        }

        if (loginData.password.trim().length === 0) {
            newLoginErrors.password = "Password field is empty";
        } else if (loginData.password.trim().length < 6) {
            newLoginErrors.password = "Password must have at least 6 characters";
        }

        return newLoginErrors;
    };

    const validateRegister = () => {
        const newRegisterErrors = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!registerData.fullName.trim()) {
            newRegisterErrors.fullName = "Full name is required";
        } else if (registerData.fullName.trim().length < 3) {
            newRegisterErrors.fullName = "Name must be at least 3 characters";
        }

        if (!registerData.email.trim()) {
            newRegisterErrors.email = "Email is required";
        } else if (!emailRegex.test(registerData.email.trim())) {
            newRegisterErrors.email = "Enter a valid email address";
        }

        if (!registerData.password.trim()) {
            newRegisterErrors.password = "Password is required";
        } else if (registerData.password.length < 6) {
            newRegisterErrors.password = "Password must be at least 6 characters";
        }

        return newRegisterErrors;
    };

    const loginSubmitHandler = (e) => {
        e.preventDefault();

        const loginValidateErrors = validateLogin();
        setLoginErrors(loginValidateErrors);

        if (Object.keys(loginValidateErrors).length === 0) {
            dispatch(loginUser(loginData)).unwrap().then(() => {
                alert("You Are Logged In Successfully");

                setTimeout(() => {
                    navigate("/resume");
                }, 400);

            }).catch((error) => {
                alert(error);
            })

            setLoginData({
                email: "",
                password: "",
            });
            setLoginErrors({});
        };
    };

    const registerSubmitHandler = (e) => {
        e.preventDefault();

        const registerValidationErrors = validateRegister();
        setRegisterErrors(registerValidationErrors);

        if (Object.keys(registerValidationErrors).length === 0) {
            dispatch(registerUser(registerData)).unwrap().then(() => {
                alert("You Are Registered Successfully");

                setActiveTab("login");

            }).catch((error) => {
                alert(error);
            })

            setRegisterData({
                fullName: "",
                email: "",
                password: "",
            });
            setRegisterErrors({});
        };
    };

    return (
        <div className="mt-[1rem] -mb-[1.8rem] min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-4xl w-full bg-white shadow-lg rounded-xl overflow-hidden grid md:grid-cols-2">

                <div className="hidden md:flex flex-col justify-center bg-indigo-600 text-white p-10">
                    <h2 className="text-3xl font-bold leading-snug">
                        Build Your Resume <br /> Like a Pro
                    </h2>
                    <p className="mt-4 text-indigo-100 text-sm leading-relaxed">
                        Create modern, ATS-friendly resumes in minutes.
                        Manage your profile, export PDFs, and impress recruiters.
                    </p>

                    <ul className="mt-6 space-y-3 text-sm">
                        <li>✔ Professional Templates</li>
                        <li>✔ Live Resume Preview</li>
                        <li>✔ One-Click PDF Download</li>
                        <li>✔ Secure Account Access</li>
                    </ul>
                </div>

                <div className="p-8">
                    <h3 className="text-2xl font-semibold text-gray-800">
                        Welcome Back 👋
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Login or create your account
                    </p>

                    <div className="flex mt-6 border-b">
                        <button
                            onClick={() => setActiveTab("login")}
                            className={`pb-2 px-4 text-indigo-600 font-medium ${activeTab === "login" ? "border-b-2 border-indigo-600" : "border-b-none"}`}>
                            Login
                        </button>
                        <button
                            onClick={() => setActiveTab("register")}
                            className={`pb-2 px-4 text-gray-500 hover:text-indigo-600 ${activeTab === "register" ? "border-b-2 border-indigo-600" : "border-b-none"}`}>
                            Register
                        </button>
                    </div>

                    {activeTab === "login" && (
                        <form onSubmit={loginSubmitHandler} className="mt-6 space-y-4">
                            <div>
                                <label className="text-sm text-gray-600">Email</label>
                                <input
                                    type="email"
                                    ref={inputRef}
                                    name="email"
                                    value={loginData.email}
                                    onChange={handleLoginChange}
                                    placeholder="you@example.com"
                                    className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                {
                                    loginErrors.email && (
                                        <p className="pl-2 text-red-700 text-[0.8rem] mt-1 font-[500] tracking-wide">*{loginErrors.email}</p>
                                    )
                                }
                            </div>

                            <div className="relative">
                                <label className="text-sm text-gray-600">Password</label>
                                <input
                                    type={showLoginPassword ? "text" : "password"}
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleLoginChange}
                                    placeholder="••••••••"
                                    className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                {
                                    loginErrors.password && (
                                        <p className="pl-2 text-red-700 text-[0.8rem] mt-1 font-[500] tracking-wide">*{loginErrors.password}</p>
                                    )
                                }
                                <span
                                    onClick={loginPasswordToggler}
                                    className="absolute top-[2.3rem] right-3 capitalize tracking-wide text-[0.9rem] font-[500] cursor-pointer text-indigo-700">
                                    {showLoginPassword ? "Hide" : "Show"}
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 text-gray-600">
                                    <input type="checkbox" className="rounded" />
                                    Remember me
                                </label>
                                <span className="text-indigo-600 cursor-pointer hover:underline">
                                    Forgot password?
                                </span>
                            </div>

                            <button
                                type="submit"
                                disabled={false}
                                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition disabled:cursor-not-allowed disabled:opacity-75"
                            >
                                Login
                            </button>
                        </form>
                    )}
                    {activeTab === "register" && (
                        <form onSubmit={registerSubmitHandler} className="space-y-4 py-[1.5rem]">
                            <div>
                                <label className="text-sm text-gray-600">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={registerData.fullName}
                                    onChange={handleRegisterChange}
                                    placeholder="John Doe"
                                    className="w-full mt-1 px-4 py-2 border rounded-md"
                                />
                                {
                                    registerErrors.fullName && (
                                        <p className="pl-2 text-red-700 text-[0.8rem] mt-1 font-[500] tracking-wide">*{registerErrors.fullName}</p>
                                    )
                                }
                            </div>

                            <div>
                                <label className="text-sm text-gray-600">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={registerData.email}
                                    onChange={handleRegisterChange}
                                    placeholder="you@example.com"
                                    className="w-full mt-1 px-4 py-2 border rounded-md"
                                />
                                {
                                    registerErrors.email && (
                                        <p className="pl-2 text-red-700 text-[0.8rem] mt-1 font-[500] tracking-wide">*{registerErrors.email}</p>
                                    )
                                }
                            </div>

                            <div className="relative">
                                <label className="text-sm text-gray-600">Password</label>
                                <input
                                    type={showRegisterPassword ? "text" : "password"}
                                    name="password"
                                    value={registerData.password}
                                    onChange={handleRegisterChange}
                                    placeholder="Create password"
                                    className="w-full mt-1 px-4 py-2 border rounded-md"
                                />
                                {
                                    registerErrors.password && (
                                        <p className="pl-2 text-red-700 text-[0.8rem] mt-1 font-[500] tracking-wide">*{registerErrors.password}</p>
                                    )
                                }
                                <span
                                    onClick={registerPasswordToggler}
                                    className="absolute top-[2.3rem] right-3 capitalize tracking-wide text-[0.9rem] font-[500] cursor-pointer text-indigo-700">
                                    {showRegisterPassword ? "Hide" : "Show"}
                                </span>
                            </div>

                            <button
                                type="submit"
                                disabled={false}
                                className="w-full border border-indigo-600 text-indigo-600 py-2 rounded-md hover:bg-indigo-50 transition disabled:cursor-not-allowed disabled:opacity-75"
                            >
                                Create Account
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
