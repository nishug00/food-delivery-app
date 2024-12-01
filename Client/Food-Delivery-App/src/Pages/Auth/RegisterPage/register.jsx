import React, { useState } from 'react';
import styles from './Register.module.css';
import bannerImage from '../../../assets/mainPageImage.png';
import logoImage from '../../../assets/orderImage.png';
import Footer from '../../Common/Footer/footer';
import { register } from '../../../Services/auth.service';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Register = () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors({ email: null, name: null, phone: null, password: null });
        let hasErrors = false;
      
        if (!formData.email) {
          setFormErrors((prev) => ({ ...prev, email: 'Email is required' }));
          hasErrors = true;
        } else if (!formData.email.includes('@') || !formData.email.includes('.')) {
          setFormErrors((prev) => ({ ...prev, email: 'Invalid email address' }));
          hasErrors = true;
        }
      
        if (!formData.name) {
          setFormErrors((prev) => ({ ...prev, name: 'Name is required' }));
          hasErrors = true;
        }
      
        if (!formData.phone) {
          setFormErrors((prev) => ({ ...prev, phone: 'Phone number is required' }));
          hasErrors = true;
        } else if (formData.phone.length < 10 || !/^\d{10}$/.test(formData.phone)) {
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
          toast.success('Registration successful!');
          setTimeout(() => navigate('/'), 1000);
        } catch (error) {
          toast.error(error.message || 'Registration failed. Please try again.');
        } finally {
          setLoading(false);
        }
      };
      

    return (
        <>
            <div className={styles.container}>
                <div className={styles.formSection}>
                    <div className={styles.formWrapper}>
                        <div className={styles.logoWrapper}>
                            <img src={logoImage} alt="Logo" className={styles.logo} />
                        </div>
                        <div className={styles.header}>
                            <h1 className={styles.title}>Welcome Back 👋</h1>
                            <p className={styles.subtitle}>
                                Today is a new day. It's your day. Sign in to start ordering.
                            </p>
                        </div>
                        <form className={styles.form} onSubmit={handleSubmit}>
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
                                    type="email"
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
                            <button className={styles.submit} disabled={loading} type="submit">
                                {loading ? 'Loading...' : 'Sign Up'}
                            </button>
                            <p className={styles.switch}>
                                Already have an account?{' '}
                                <span onClick={() => navigate('/')} className={styles.switchLink}>
                                    Sign in
                                </span>
                            </p>
                        </form>
                    </div>
                </div>
                <div className={styles.imageSection}>
                    <img src={bannerImage} alt="Delicious food" className={styles.banner} />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Register;
