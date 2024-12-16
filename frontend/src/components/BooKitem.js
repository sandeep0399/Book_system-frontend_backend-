import React, { useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import "./Bookitem.css"

const BookItem = ({ book }) => {
    const [bookDetails, setBookDetails] = useState(null);
    const navigate = useNavigate();
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    // Fetch book details when View button is clicked
    const fetchBookDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/books/${book.BookID}`);
            setBookDetails(response.data);
            setShowDetailsModal(true); // Show the modal
        } catch (error) {
            console.error('Error fetching book details:', error);
        }
    };
    const handleEdit = (id) => {
        navigate(`/edit-book/${id}`); // Redirect to EditBook page
    };

    return (
        <div>
            <button className='btn btn-warring' onClick={fetchBookDetails}>View Details</button>

            {/* Book Details Modal */}
            {showDetailsModal && bookDetails && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Book Details</h3>
                        <p><strong>Title:</strong> {bookDetails.Title}</p>
                        <p><strong>Author:</strong> {bookDetails.AuthorName}</p>
                        <p><strong>Genre:</strong> {bookDetails.GenreName}</p>
                        <p><strong>Pages:</strong> {bookDetails.Pages}</p>
                        <p><strong>Published Date:</strong> {bookDetails.PublishedDate}</p>
                         <div className='button-container'><button className='btn btn-success' onClick={() => setShowDetailsModal(false)}>Close</button>
                         <button className='btn btn-warring' onClick={()=>handleEdit(bookDetails.BookID)}>Edit</button></div>
                        
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookItem;
