import React, { useEffect , useState} from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import { login } from "../../../Services/auth.service";
import Footer from "../../Common/Footer/footer";
import mainImage from "../../../assets/mainPageImage.png";
import logoImage from "../../../assets/orderImage.png";

const Login = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('gender');
        localStorage.removeItem('country');
    }, []); 

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [formErrors, setFormErrors] = useState({ email: null, password: null });
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setFormErrors({ email: null, password: null });

        let hasErrors = false;
        if (!formData.email.includes("@") || !formData.email.includes(".")) {
            setFormErrors((prev) => ({ ...prev, email: "Email is invalid" })); 
            hasErrors = true;
        }
        if (!formData.password) {
            setFormErrors((prev) => ({ ...prev, password: "Password is required" }));
            hasErrors = true;
        }
        if (hasErrors) return;

        try {
            setLoading(true);
            const response = await login(formData);
            if (response?.token) {
                localStorage.setItem("token", response.token);
                localStorage.setItem("userId", response.user.id);
                localStorage.setItem("username", response.user.name);
                localStorage.setItem("email", response.user.email);
                localStorage.setItem("gender", response.user.gender);
                localStorage.setItem("country", response.user.country);
                navigate("/home");
            }
        } catch (error) {
            console.error("Login Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.leftSection}>
                    <div className={styles.formContainer}>
                        <div className={styles.logoContainer}>
                            <img src={logoImage} alt="Logo" className={styles.logo} />
                        </div>
                        <div className={styles.titleContainer}>
                            <h1 className={styles.title}>Welcome Back 👋</h1>
                            <p className={styles.subtitle}>
                                Today is a new day. It's your day. Sign in to start ordering.
                            </p>
                        </div>
                        <form className={styles.form} onSubmit={handleLogin}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Email</label>
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder="Example@gmail.com"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                />
                                {formErrors.email && <p className={styles.error}>{formErrors.email}</p>}
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Password</label>
                                <input
                                    className={styles.input}
                                    type="password"
                                    placeholder="At least 8 characters"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                    }
                                />
                                {formErrors.password && (
                                    <p className={styles.error}>{formErrors.password}</p>
                                )}
                            </div>
                            <div className={styles.forgotPassword}>Forgot Password?</div>
                            <button className={styles.button} disabled={loading} type="submit">
                                {loading ? "Loading..." : "Sign In"}
                            </button>
                            <div className={styles.signUp}>
                                Don't have an account?{" "}
                                <span onClick={() => navigate("/register")}>Sign up</span>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={styles.rightSection}>
                    <img src={mainImage} alt="Food" className={styles.image} />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Login;
