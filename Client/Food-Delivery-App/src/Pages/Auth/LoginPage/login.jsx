import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { login } from "../../../Services/auth.service";
import Footer from "../../Common/Footer/footer";
import mainImage from "../../../assets/MainPageImage.png";
import logoImage from "../../../assets/OrderImage.png";

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.clear();
    }, []);

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: null, password: null });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({ email: null, password: null });
        let hasError = false;

        if (!credentials.email.includes("@") || !credentials.email.includes(".")) {
            setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
            hasError = true;
        }
        if (!credentials.password) {
            setErrors((prev) => ({ ...prev, password: "Password is required" }));
            hasError = true;
        }
        if (hasError) return;

        try {
            setIsLoading(true);
            const response = await login(credentials);
            if (response?.token) {
                localStorage.setItem("token", response.token);
                localStorage.setItem("userId", response.user.id);
                localStorage.setItem("username", response.user.name);
                localStorage.setItem("email", response.user.email);
                localStorage.setItem("gender", response.user.gender);
                localStorage.setItem("country", response.user.country);
                navigate("/home");
            }
        } catch {
            setErrors((prev) => ({
                ...prev,
                email: "Login failed. Check your credentials.",
            }));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.formWrapper}>
                        <div className={styles.logoWrapper}>
                            <img src={logoImage} alt="Logo" className={styles.logo} />
                        </div>
                        <div className={styles.heading}>
                            <h1 className={styles.title}>Welcome Back 👋</h1>
                            <p className={styles.subtitle}>
                                Today is a new day. It's your day. Sign in to start ordering.
                            </p>
                        </div>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.field}>
                                <label className={styles.label}>Email</label>
                                <input
                                    type="text"
                                    placeholder="Example@gmail.com"
                                    className={styles.input}
                                    value={credentials.email}
                                    onChange={(e) =>
                                        setCredentials({ ...credentials, email: e.target.value })
                                    }
                                />
                                {errors.email && <p className={styles.error}>{errors.email}</p>}
                            </div>
                            <div className={styles.field}>
                                <label className={styles.label}>Password</label>
                                <input
                                    type="password"
                                    placeholder="At least 8 characters"
                                    className={styles.input}
                                    value={credentials.password}
                                    onChange={(e) =>
                                        setCredentials({ ...credentials, password: e.target.value })
                                    }
                                />
                                {errors.password && <p className={styles.error}>{errors.password}</p>}
                            </div>
                            <div className={styles.forgotPassword}>Forgot Password?</div>
                            <button className={styles.submitButton} disabled={isLoading}>
                                {isLoading ? "Loading..." : "Sign In"}
                            </button>
                            <div className={styles.register}>
                                Don't have an account?{" "}
                                <span
                                    className={styles.registerLink}
                                    onClick={() => navigate("/register")}
                                >
                                    Sign up
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={styles.right}>
                    <img src={mainImage} alt="Main Visual" className={styles.image} />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Login;
