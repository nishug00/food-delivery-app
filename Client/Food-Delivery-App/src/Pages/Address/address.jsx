import React, { useState, useEffect } from 'react';
import styles from './address.module.css';
import Footer from '../Common/Footer/footer';
import PromoHeader from '../Common/PromoHeader/promoHeader';
import NavBar from '../Common/NavBar/navBar';
import LocationIcon from '../../assets/locationIcon.png';
import statesList from '../../utils/states.utils';
import { saveAddress, fetchUserAddresses, updateAddress, deleteAddress } from '../../Services/address.service';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../Context/AppContext';
import toast from 'react-hot-toast';

const Address = () => {
  const [formData, setFormData] = useState({
    state: '',
    city: '',
    pincode: '',
    phoneNumber: '',
    fullAddress: '',
  });
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { user } = useAppContext();

  useEffect(() => {
    if (!token) return;
    const loadAddresses = async () => {
      try {
        const data = await fetchUserAddresses(token);
        setAddresses(data);
      } catch {
        toast.error('Failed to fetch addresses');
      }
    };
    loadAddresses();
  }, [token]);

  const handleFormChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    if (Object.values(formData).some((value) => !value.trim())) {
      toast.error('Please fill all required fields.');
      return;
    }
  
    if (!user || !user.id) {
      toast.error('User not logged in. Please sign in again.');
      return;
    }
  
    setIsLoading(true);
    try {
      let response;
      if (isEditing) {
        response = await updateAddress(formData, token);
        toast.success('Address updated successfully!');
      } else {
        response = await saveAddress(formData, token, user.id);
        toast.success('Address added successfully!');
      }
  
      if (response?.address) {
        setAddresses((prev) => {
          const updatedAddresses = isEditing
            ? prev.map((addr) => (addr._id === response.address._id ? response.address : addr))
            : [...prev, response.address];
          
          return updatedAddresses;
        });
  
        toast.success(isEditing ? 'Address updated successfully!' : 'Address added successfully!');
        setIsModalOpen(false);
        setIsEditing(false);
        resetFormData();
      }
    } catch (error) {
      console.error('Error during save/update:', error);
      toast.error('Failed to save or update the address. Please try again!');
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleEdit = (address) => {
    setIsEditing(true);
    setFormData({
      id: address._id,
      state: address.state,
      city: address.city,
      pincode: address.pincode,
      phoneNumber: address.phoneNumber,
      fullAddress: address.fullAddress,
    });
    setIsModalOpen(true);
  };
  
  const handleRemove = async (addressId) => {
    try {
      await deleteAddress(addressId, token);
      setAddresses((prev) => prev.filter((address) => address._id !== addressId));
      toast.success('Address removed successfully');
    } catch {
      toast.error('Failed to remove address');
    }
  };

  const resetFormData = () => {
    setFormData({
      state: '',
      city: '',
      pincode: '',
      phoneNumber: '',
      fullAddress: '',
    });
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.promoHeader}>
          <PromoHeader />
        </div>
        <NavBar />
        <div className={styles.container}>
          <div className={styles.contentWrapper}>
            <div className={styles.header}>
              <i className="codicon codicon-arrow-left"></i>
              <div>Your Addresses</div>
            </div>
            <div className={styles.addressList}>
              <div className={styles.addAddress} onClick={() => setIsModalOpen(true)}>
                <div className={styles.circle}>
                  <span className="codicon">+</span>
                </div>
                <span className={styles.addAddressText}>Add Address</span>
              </div>

              <div className={styles.addressGrid}>
                {addresses.map((address) => (
                  <div
                    key={address._id}
                    className={`${styles.addressCard} ${address.isDefault ? styles.defaultAddress : ''}`}
                  >
                    <div className={styles.addressHeader}>
                      <span className={styles.userName}>{user ? user.name : 'Guest'}</span>
                      {address.isDefault && <span className={styles.defaultLabel}>Default</span>}
                    </div>
                    <div className={styles.addressDetails}>
                      <p className={styles.fullAddress}>{address.fullAddress}</p>
                      <p>
                        {address.city}, {address.state}, {address.pincode}
                      </p>
                      <p className={styles.phoneNumber}>Phone Number: {address.phoneNumber}</p>
                    </div>
                    <div className={styles.editRemoveContainer}>
                      <span onClick={() => handleEdit(address)}>Edit</span>
                      <span className={styles.separator}>|</span>
                      <span onClick={() => handleRemove(address._id)}>Remove</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <img src={LocationIcon} alt="Location" className={styles.modalTitleIcon} />
              <div className={styles.modalTitle}>{isEditing ? 'Edit Address' : 'Add Address'}</div>
            </div>
            <form className={styles.form} onSubmit={handleFormSubmit}>
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <select
                    name="state"
                    className={styles.input}
                    value={formData.state}
                    onChange={handleFormChange}
                  >
                    <option value="" disabled>
                      State
                    </option>
                    {statesList.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="city"
                    className={styles.input}
                    value={formData.city}
                    onChange={handleFormChange}
                    placeholder="City/District"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="pincode"
                    className={styles.input}
                    value={formData.pincode}
                    onChange={handleFormChange}
                    placeholder="Pin Code"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="phoneNumber"
                    className={styles.input}
                    value={formData.phoneNumber}
                    onChange={handleFormChange}
                    placeholder="Phone Number"
                  />
                </div>
              </div>
              <div className={styles.formRow}>
                <textarea
                  name="fullAddress"
                  className={styles.textarea}
                  rows="4"
                  value={formData.fullAddress}
                  onChange={handleFormChange}
                  placeholder="Enter Full Address"
                />
              </div>
              <div className={styles.buttonGroup}>
                <button type="submit" className={styles.saveButton} disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Address;
