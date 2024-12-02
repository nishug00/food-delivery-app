import React, { useEffect, useState } from "react";
import styles from "./profile.module.css";
import PromoHeader from "../Common/PromoHeader/promoHeader";
import NavBar from "../Common/NavBar/navBar";
import Footer from "../Common/Footer/footer";
import { handleSaveClick, fetchUserDetails } from "../../Services/auth.service";
import ProfileImage from '../../assets/profile.png';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from "../../Context/AppContext";
import { saveCardDetails, getCards } from "../../Services/card.service";
import Cards from '../Common/Cards/card';

const Profile = () => {
    const { user, setUser } = useAppContext();
    const username = user?.name || localStorage.getItem('username');
    const email = user?.email || localStorage.getItem('email');
    const gender = user?.gender || localStorage.getItem('gender');
    const country = user?.country || localStorage.getItem('country');
    const [editMode, setEditMode] = useState(false); // Track whether the fields are in edit mode
    const [editedName, setEditedName] = useState(user?.name || localStorage.getItem('username'));
    const [editedEmail, setEditedEmail] = useState(user?.email || localStorage.getItem('email'));
    const [editedGender, setEditedGender] = useState(user?.gender || localStorage.getItem('gender'));
    const [editedCountry, setEditedCountry] = useState(user?.country || localStorage.getItem('country'));
    const navigate = useNavigate();
    const [cards, setCards] = useState([]);
    const [error, setError] = useState(null); // Track errors
    const token = localStorage.getItem('token');

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    // Toggle between edit and save
    const handleEditSaveClick = async () => {
        if (editMode) {
            try {
                const updatedData = {
                    id: user._id,  // Add user.id here
                    name: editedName,
                    email: editedEmail,
                    gender: editedGender,
                    country: editedCountry
                };
    
                await handleSaveClick(updatedData, token);  // Pass the updatedData with id
                await getUserDetails(); 
                setEditMode(false); // Exit edit mode
            } catch (error) {
                console.error("Save failed:", error.message);
            }
        } else {
            setEditMode(true); // Enter edit mode
        }
    };
    


    const getUserDetails = async () => {
        try {
            const userData = await fetchUserDetails();  // Log the response here
            if (!userData) {
                throw new Error('User data is null or undefined');
            }
            setUser(userData);
            setEditedName(userData.name || '');
            setEditedEmail(userData.email || '');
            setEditedGender(userData.gender || '');
            setEditedCountry(userData.country || '');
        } catch (err) {
            setError(err.message);
            console.error('Error fetching user details:', err.message);
        } 
    };
    

    useEffect(() => {
        getUserDetails(); // Fetch user details when the component mounts
    }, []);


    // Sync form fields with updated user data
    useEffect(() => {
        if (user) {
            setEditedName(user.name || '');
            setEditedEmail(user.email || '');
            setEditedGender(user.gender || '');
            setEditedCountry(user.country || '');
        }
    }, [user]); // This effect runs when the user state updates

    return (
        <>   <div className={styles.container}>
            <div className={styles.PromoHeader}><PromoHeader /></div>
            <NavBar />
            <div className={styles.mainContent}>
                <div className={styles.iconTextRow}>
                    <i className="codicon codicon-arrow-left" onClick={() => navigate('/home')}></i>
                    <div>My Profile</div>
                </div>

                <div className={styles.profileContainer}>
                    <div className={styles.profileDetails}>
                        <img src={ProfileImage} alt="Profile" className={styles.profileImage} />
                        <div className={styles.username}>{username}</div>
                    </div>
                    <button className={styles.editSaveButton} onClick={handleEditSaveClick}>{editMode ? 'Save' : 'Edit'}</button>
                </div>

                <div className={styles.formContainer}>
                    <div className={styles.leftSection}>
                        {/* Full Name Field */}
                        <div className={styles.inputLabel}>Full Name</div>
                        <input
                            type="text"
                            className={styles.inputField}
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            disabled={!editMode}
                        />
                        {/* Gender Field as Dropdown */}
                        <div className={styles.inputLabel}>Gender</div>
                        <input
                            type="text"
                            className={styles.inputField}
                            value={editedGender === 'undefined' || editedGender === null ? '' : editedGender}
                            onChange={(e) => setEditedGender(e.target.value)}
                            disabled={!editMode}
                        />


                    </div>

                    <div className={styles.rightSection}>

                        {/* Email Address Field */}
                        <div className={styles.inputLabel}>Email Address</div>
                        <input
                            type="email"
                            className={styles.inputField}
                            value={editedEmail}
                            onChange={(e) => setEditedEmail(e.target.value)}
                            disabled={!editMode}
                        />
                        {/* Country Field */}
                        <div className={styles.inputLabel}>Country</div>
                        <input
                            type="text"
                            className={styles.inputField}
                            value={editedCountry === 'undefined' || editedCountry === null ? '' : editedCountry}
                            onChange={(e) => setEditedCountry(e.target.value)}
                            disabled={!editMode}
                        />
                    </div>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.PaymentMethodContainer}>
                    <div>Saved Payment Methods</div>
                    <Cards />
                </div>

            </div>

        </div>

            <Footer /></>
    );
};

export default Profile;
