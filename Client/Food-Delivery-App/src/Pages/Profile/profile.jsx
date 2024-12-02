import React, { useEffect, useState } from "react";
import styles from "./profile.module.css";
import PromoHeader from "../Common/PromoHeader/promoHeader";
import NavBar from "../Common/NavBar/navBar";
import Footer from "../Common/Footer/footer";
import ProfileImage from "../../assets/profile.png";
import Cards from "../Common/Cards/card";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";
import { handleSaveClick, fetchUserDetails } from "../../Services/auth.service";

const Profile = () => {
    const { user, setUser } = useAppContext();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [editMode, setEditMode] = useState(false);
    const [userDetails, setUserDetails] = useState({
        name: user?.name || localStorage.getItem("username") || "",
        email: user?.email || localStorage.getItem("email") || "",
        gender: user?.gender || localStorage.getItem("gender") || "",
        country: user?.country || localStorage.getItem("country") || "",
    });
    const [error, setError] = useState(null);

    const handleEditSaveClick = async () => {
        if (editMode) {
            try {
                const updatedData = { ...userDetails, id: user?._id };
                await handleSaveClick(updatedData, token);
                await fetchUserDetailsAndUpdateState();
                setEditMode(false);
            } catch (err) {
                setError(err.message);
            }
        } else {
            setEditMode(true);
        }
    };

    const fetchUserDetailsAndUpdateState = async () => {
        try {
            const fetchedUser = await fetchUserDetails();
            if (fetchedUser) {
                setUser(fetchedUser);
                setUserDetails({
                    name: fetchedUser.name || "",
                    email: fetchedUser.email || "",
                    gender: fetchedUser.gender || "",
                    country: fetchedUser.country || "",
                });
            }
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchUserDetailsAndUpdateState();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.PromoHeader}>
                <PromoHeader />
            </div>
            <NavBar />
            <div className={styles.mainContent}>
                <div className={styles.iconTextRow}>
                    <i
                        className="codicon codicon-arrow-left"
                        onClick={() => navigate("/home")}
                    ></i>
                    <div>My Profile</div>
                </div>
                <div className={styles.profileContainer}>
                    <div className={styles.profileDetails}>
                        <img
                            src={ProfileImage}
                            alt="Profile"
                            className={styles.profileImage}
                        />
                        <div className={styles.username}>{userDetails.name}</div>
                    </div>
                    <button
                        className={styles.editSaveButton}
                        onClick={handleEditSaveClick}
                    >
                        {editMode ? "Save" : "Edit"}
                    </button>
                </div>
                <div className={styles.formContainer}>
                    <div className={styles.leftSection}>
                        <div className={styles.inputLabel}>Full Name</div>
                        <input
                            type="text"
                            className={styles.inputField}
                            value={userDetails.name}
                            onChange={(e) =>
                                setUserDetails({
                                    ...userDetails,
                                    name: e.target.value,
                                })
                            }
                            disabled={!editMode}
                        />
                        <div className={styles.inputLabel}>Gender</div>
                        <input
                            type="text"
                            className={styles.inputField}
                            value={
                                userDetails.gender === "undefined" ||
                                userDetails.gender === null
                                    ? ""
                                    : userDetails.gender
                            }
                            onChange={(e) =>
                                setUserDetails({
                                    ...userDetails,
                                    gender: e.target.value,
                                })
                            }
                            disabled={!editMode}
                        />
                    </div>
                    <div className={styles.rightSection}>
                        <div className={styles.inputLabel}>Email Address</div>
                        <input
                            type="email"
                            className={styles.inputField}
                            value={userDetails.email}
                            onChange={(e) =>
                                setUserDetails({
                                    ...userDetails,
                                    email: e.target.value,
                                })
                            }
                            disabled={!editMode}
                        />
                        <div className={styles.inputLabel}>Country</div>
                        <input
                            type="text"
                            className={styles.inputField}
                            value={
                                userDetails.country === "undefined" ||
                                userDetails.country === null
                                    ? ""
                                    : userDetails.country
                            }
                            onChange={(e) =>
                                setUserDetails({
                                    ...userDetails,
                                    country: e.target.value,
                                })
                            }
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
          <div className={styles.footer}><Footer /></div>  
        </div>
    );
};

export default Profile;
