import React, { useState } from 'react';
import axios from 'axios';
import  './DeletBtn.css';
const DeletBtn = ({ book, onBookDeleted }) => 
    {
    const [showModal, setShowModal] = useState(false);

    // Handle book deletion
    const deleteBook = async () => {
        try {
            await axios.delete(`http://localhost:5000/books/${book.BookID}`);
            onBookDeleted(book.BookID); // Notify parent component to refresh the list
            setShowModal(false); // Close the modal
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    return (
        <div>
             <button className='btn btn-color-red 'onClick={() => setShowModal(true)}  >Delete</button>
            

            {/* Confirmation Modal */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Are you sure you want to delete this book?</h3>
                        <p>Title: {book.Title}</p> 
                        <div className='buttons-container'>
                        <button className='btn btn-red' onClick={deleteBook}>Yes, Delete</button>
                        <button className='btn btn-success' onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeletBtn;
