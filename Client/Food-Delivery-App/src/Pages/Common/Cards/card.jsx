import React, { useEffect, useState } from 'react';
import styles from './card.module.css';
import { getCards, saveCardDetails, updateCardDetails, deleteCard } from '../../../Services/card.service';
import toast from 'react-hot-toast';

function Cards() {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCVV] = useState('');
    const [nameOncard, setNameOncard] = useState('');
    const [modalMode, setModalMode] = useState('add');
    const [currentCard, setCurrentCard] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const token = localStorage.getItem('token');

    const openModal = (mode, card = null) => {
        setModalMode(mode);
        if (mode === 'edit' && card) {
            setCardNumber(card.cardNumber || '');
            setExpiryDate(card.expiryDate || '');
            setCVV(card.cvv || '');
            setNameOncard(card.nameOncard || '');
            setCurrentCard(card);
        } else {
            setCardNumber('');
            setExpiryDate('');
            setCVV('');
            setNameOncard('');
        }
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setCurrentCard(null);
    };

    const handleSaveCard = async () => {
        const cardData = { cardNumber, expiryDate, cvv, nameOncard };

        try {
            if (modalMode === 'edit') {
                const updatedCard = await updateCardDetails(currentCard._id, { expiryDate, nameOncard });
                toast.success('Card updated successfully!');
                setCards(prevCards => prevCards.map(card => card._id === currentCard._id ? { ...card, ...updatedCard } : card));
            } else {
                const newCard = await saveCardDetails(cardData);
                toast.success('Card added successfully!');
                setCards(prevCards => [...prevCards, newCard]);
            }
            closeModal();
        } catch (error) {
            toast.error('Failed to save card details');
        }
    };

    const handleEdit = (card) => {
        setIsEditing(true);
        setCurrentCard(card);
        openModal('edit', card);
    };

    const handleDelete = async (cardId) => {
        if (!cardId) return;
        try {
            await deleteCard(cardId);
            toast.success('Card deleted successfully!');
            setCards(prevCards => prevCards.filter(card => card._id !== cardId));
        } catch (error) {
            toast.error('Failed to delete card');
        }
    };

    useEffect(() => {
        if (token) {
            const fetchCards = async () => {
                try {
                    console.log('Fetching cards with token:', token);
                    const data = await getCards(token);
                    console.log('Fetched data:', data); // Log the fetched data
                    if (Array.isArray(data)) {
                        setCards(data);  // Ensure 'data' is an array
                    } else {
                        console.error('Data is not an array:', data);
                    }
                } catch (error) {
                    console.error('Error fetching cards:', error); // Log error if fetch fails
                    toast.error('Failed to fetch cards');
                }
            };
            
            fetchCards();
        } else {
            console.log('No token available'); // Log if token is missing
        }
    }, [token]);
    

    return (
        <>
            <div className={styles.cardContainer}>
           
                    <div className={styles.cardList}>
                        {cards.map((card, index) => (
                            card ? (
                                <div className={styles.getCards} key={index}>
                                    <div className={styles.circle}>
                                        <span className="codicon codicon-credit-card"></span>
                                    </div>
                                    <div className={styles.cardInfo}>
                                        <div className={styles.cardDetails}>
                                            <div className={styles.cardNumber}>
                                                <span>{`XXXXXXXXXXX${card.cardNumber}`}</span>
                                            </div>
                                            <div className={styles.cardHolderName}>
                                                <span>{card.nameOncard}</span>
                                            </div>
                                        </div>
                                        <span
                                            onClick={() => handleEdit(card)}
                                            className={`codicon codicon-edit ${styles.editIcon}`}
                                        ></span>
                                    </div>
                                </div>
                            ) : null
                        ))}
                    </div>

                <div className={styles.addCard} onClick={() => openModal('add')}>
                    <div className={styles.circle}>
                        <span className="codicon codicon-add"></span>
                    </div>
                    <div className={styles.addCardText}>Add New Card</div>
                </div>
            </div>

            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalTitleContainer}>
                            <h2 className={styles.modalTitle}>
                                {modalMode === 'edit' ? 'Edit Payment Method' : 'Add Payment Method'}
                            </h2>
                            <div className={styles.closeButton} onClick={closeModal}>
                                <span className="codicon codicon-close"></span>
                            </div>
                        </div>

                        <div className={styles.modalBody}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Card Number</label>
                                <input
                                    type="text"
                                    className={styles.inputField}
                                    value={cardNumber}
                                    readOnly={modalMode === 'edit'}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Expiration</label>
                                <input
                                    type="text"
                                    className={styles.inputField}
                                    value={expiryDate}
                                    onChange={(e) => setExpiryDate(e.target.value)}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>CVC</label>
                                <input
                                    type="text"
                                    className={styles.inputField}
                                    value={cvv}
                                    readOnly={modalMode === 'edit'}
                                    onChange={(e) => setCVV(e.target.value)}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Name on Card</label>
                                <input
                                    type="text"
                                    className={styles.inputField}
                                    value={nameOncard}
                                    onChange={(e) => setNameOncard(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className={styles.buttonContainer}>
                            <button className={styles.removeButton} onClick={() => handleDelete(currentCard._id)}>
                                Remove
                            </button>
                            <div className={styles.rightButtons}>
                                <button className={styles.cancelButton} onClick={closeModal}>Cancel</button>
                                <button className={styles.saveButton} onClick={handleSaveCard}>Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Cards;
