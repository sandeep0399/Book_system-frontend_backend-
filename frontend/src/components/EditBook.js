import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import "./EditBook.css"

const EditBook = () => {
    const { id } = useParams(); // Get book ID from URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Title: '',
        Author: '',
        Genre: '',
        Pages: '',
        PublishedDate: '',
    });

    useEffect(() => {
        // Fetch book details to pre-fill the form
        axios.get(`http://localhost:5000/books/${id}`)
            .then((response) => {
                setFormData(response.data); // Set form data
            })
            .catch((error) => {
                console.error('Error fetching book details for editing:', error);
            });
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Update the book details
        axios.put(`http://localhost:5000/books/${id}`, formData)
            .then(() => {
                alert('Book updated successfully!');
                navigate(`/books/${id}`); // Redirect back to the view details page
            })
            .catch((error) => {
                console.error('Error updating book:', error);
                alert('Failed to update the book. Please try again.');
            });
    };

    return (
        <div className='edit-book-container'>
            <h2 >Edit Book page</h2>
            <form className='form-container' onSubmit={handleSubmit}>
                <div className='label-input-container'>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="Title"
                        value={formData.Title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='label-input-container'>
                    <label>Author:</label>
                    <input
                        type="text"
                        name="Author"
                        value={formData.Author}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='label-input-container'>
                    <label>Genre:</label>
                    <input
                        type="text"
                        name="Genre"
                        value={formData.Genre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='label-input-container'>
                    <label>Pages:</label>
                    <input
                        type="number"
                        name="Pages"
                        value={formData.Pages}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='label-input-container'>
                    <label>Published Date:</label>
                    <input
                        type="date"
                        name="PublishedDate"
                        value={formData.PublishedDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button className='btn btn-blue' type="submit">Save Changes</button>
            </form>  
            
        </div>
    );
};

export default EditBook;
