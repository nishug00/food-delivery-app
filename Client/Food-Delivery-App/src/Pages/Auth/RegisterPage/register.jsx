import React, { useState } from 'react';
import styles from './Register.module.css';
import image from '../../../assets/mainPageImage.png';
import titleImage from '../../../assets/orderImage.png';
import Footer from '../../Common/Footer/footer';
import { register } from '../../../Services/auth.service';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        phone: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({
        email: null,
        name: null,
        phone: null,
        password: null,
    });

    const handleRegister = async (e) => {
        e.preventDefault();
        setFormErrors({ email: null, name: null, phone: null, password: null });
        let hasErrors = false;

        if (!formData.email.includes('@') || !formData.email.includes('.')) {
            setFormErrors((prev) => ({ ...prev, email: 'Invalid email address' }));
            hasErrors = true;
        }
        if (!formData.name) {
            setFormErrors((prev) => ({ ...prev, name: 'Name is required' }));
            hasErrors = true;
        }
        if (!formData.phone || formData.phone.length < 10) {
            setFormErrors((prev) => ({ ...prev, phone: 'Invalid phone number' }));
            hasErrors = true;
        }
        if (!formData.password) {
            setFormErrors((prev) => ({ ...prev, password: 'Password is required' }));
            hasErrors = true;
        }

        if (hasErrors) return;

        try {
            setLoading(true);
            await register(formData);
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (error) {
            toast.error(error.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className={styles.registerContainer}>
                <div className={styles.formSection}>
                    <div className={styles.formWrapper}>
                        <div className={styles.logoContainer}>
                            <img src={titleImage} alt="Logo" className={styles.logo} />
                        </div>
                        <div className={styles.headerText}>
                            <h1 className={styles.welcomeText}>Welcome Back 👋</h1>
                            <p className={styles.subtitleText}>
                                Today is a new day. It's your day. Sign in to start ordering.
                            </p>
                        </div>
                        <form className={styles.form} onSubmit={handleRegister}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Name</label>
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                                {formErrors.name && <p className={styles.error}>{formErrors.name}</p>}
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Phone Number</label>
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder="Enter your phone number"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                                {formErrors.phone && <p className={styles.error}>{formErrors.phone}</p>}
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Email</label>
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder="Example@gmail.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                {formErrors.password && <p className={styles.error}>{formErrors.password}</p>}
                            </div>
                            <button className={styles.submitButton} disabled={loading} type="submit">
                                {loading ? 'Loading...' : 'Sign Up'}
                            </button>
                            <p className={styles.switchToLogin}>
                                Already have an account?{' '}
                                <span onClick={() => navigate('/')} className={styles.loginLink}>
                                    Sign in
                                </span>
                            </p>
                        </form>
                    </div>
                </div>
                <div className={styles.imageSection}>
                    <img src={image} alt="Delicious food" className={styles.image} />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Register;
