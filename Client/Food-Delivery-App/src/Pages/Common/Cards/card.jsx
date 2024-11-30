import React, { useEffect, useState } from 'react'
import styles from './card.module.css'
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

    const openModal = (mode, card = null) => {
        setModalMode(mode);
        if (mode === 'edit' && card) {
            // Prefill state variables with the card details
            setCardNumber(card.cardNumber);
            setExpiryDate(card.expiryDate);
            setCVV(card.cvv);
            setNameOncard(card.nameOncard);
            setCurrentCard(card); // Store current card for future reference
        } else {
            // Clear fields when adding a new card
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
        const cardData = {
            cardNumber,
            expiryDate,
            cvv,
            nameOncard,
        };
    
        try {
            if (modalMode === 'edit') {
                // Update existing card
      
                const updatedCard = await updateCardDetails(currentCard._id, {
                    expiryDate,
                    nameOncard,
                });
             
                toast.success('Card updated successfully!');
                
                // Update the card in the state
                setCards((prevCards) =>
                    prevCards.map((card) =>
                        card._id === currentCard._id ? { ...card, ...updatedCard } : card
                    )
                );
            } else {
                // Create a new card
         
                const newCard = await saveCardDetails(cardData); // Call the API for adding new card
                
                toast.success('Card added successfully!');
         
    
                // Add the new card to the state
                setCards((prevCards) => [...prevCards, newCard]);
            }
    
            closeModal(); // Close the modal after save or update
        } catch (error) {
            console.error('Error saving card:', error);
            alert('Failed to save card details');
        }
    };
    
    const handleEdit = (card) => {
        setIsEditing(true);
        setCurrentCard(card);
        openModal('edit', card); // Pass the card to open modal for editing
    };
const handleDelete = async (cardId) => {
    try {
        await deleteCard(cardId);
        toast.success('Card deleted successfully!');
    } catch (error) {
        toast.error('Failed to delete card');
    }
};

const updateCard = async () => {
    const cardData = {
        cardNumber,
        expiryDate,
        cvv,
        nameOncard,
    };
    console.log('Card data:', cardData);
    try {
        await updateCardDetails(currentCard._id, cardData);
        toast.success('Card details updated successfully!');
        closeModal(); // Close modal after successful update
    } catch (error) {
        toast.error('Failed to update card details');
    }
};


    useEffect(() => {
        const fetchCards = async () => {
            try {
                const cardData = await getCards(); // Fetch card data
                setCards(cardData);
                console.log('Fetched cards:', cardData);
            } catch (err) {
                setError('Failed to fetch card details'); // Set error if any
                console.error('Error fetching cards:', err);
            } finally {
                setLoading(false); // Set loading to false after fetching is done
            }
        };

        fetchCards(); // Call the fetch function
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }


    return (
        <>
            <div className={styles.cardContainer}>
                {cards.length === 0 ? (
                    <p>No cards found</p>
                ) : (
                    <div className={styles.cardList}>
                        {cards.map((card, index) => (
                            <div className={styles.getCards} key={index}>
                                <div className={styles.circle}>
                                    <span className="codicon codicon-credit-card"></span>
                                </div>
                                <div className={styles.cardInfo}>
                                    <div className={styles.cardDetails}>
                                        <div className={styles.cardNumber}>
                                            <span>{`XXXXXXXXXXX${card.cardNumber.slice(-4)}`}</span>
                                        </div>
                                        <div className={styles.cardHolderName}>
                                            <span>{card.nameOncard}</span>
                                        </div>
                                    </div>
                                    <span
                                        onClick={() => handleEdit(card)} // Trigger editing for this card
                                        className={`codicon codicon-edit ${styles.editIcon}`}
                                    ></span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {/* Add New Card Button */}
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
                        <h2 className={styles.modalTitle}>   {modalMode === 'edit' ? 'Edit Payment Method' : 'Add Payment Method'}</h2>
                        <div className={styles.modalBody}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Card Number</label>
                                <input
                                    type="text"
                                    className={styles.inputField}
                                    value={cardNumber}
                                    readOnly={modalMode === 'edit'} // Read-only in edit mode
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
                                    readOnly={modalMode === 'edit'} // Read-only in edit mode
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



                        {/* Buttons */}
                        <div className={styles.buttonContainer}>
                            <button className={styles.removeButton} onClick={() => handleDelete(currentCard._id)}>Remove</button>
                            <div className={styles.rightButtons}>
                                <button className={styles.cancelButton} onClick={closeModal}>Cancel</button>
                                <button className={styles.saveButton} onClick={handleSaveCard}>Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </>
    )
}

export default Cards