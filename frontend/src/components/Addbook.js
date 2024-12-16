import React, { useState } from 'react';
import axios from 'axios';
import "./Addbook.css"



const AddBook = () => {
    const [formData, setFormData] = useState({
        Title: '',
        Author: '',
        Genre: '',
        Pages: '',
        PublishedDate: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send book details to the backend
            const response = await axios.post('http://localhost:5000/books', formData);
            alert('Book added successfully!');
            console.log(response.data); // Optionally log the response
        } catch (error) {
            console.error('Error adding book:', error);
            alert('Failed to add the book. Please try again.');
        }
    };

    return (
        <div className='add-book-container'>
          
            <h1>Add a New Book</h1>
            <div className='add-book-box'>
                <div className='form-element-container'>
            <form className='form-container' onSubmit={handleSubmit}>
                <div className='label-input-container'>
                    <label>Title</label>
                    <input
                        type="text"
                        name="Title"
                        value={formData.Title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='label-input-container'>
                    <label>Author</label>
                    <input
                        type="text"
                        name="Author"
                        value={formData.Author}
                        onChange={handleChange}
                        placeholder="Enter author name"
                        required
                    />
                </div>
                <div className='label-input-container'>
                    <label>Genre</label>
                    <input
                        type="text"
                        name="Genre"
                        value={formData.Genre}
                        onChange={handleChange}
                        placeholder="Enter genre"
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
                    <label>Published Date</label>
                    <input
                        type="date"
                        name="PublishedDate"
                        value={formData.PublishedDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='button-container'>
                <button className='btn btn-red' type="submit">Add Book</button>
                
                </div>
            </form> 
            </div>
            <div className='add-decripiton'>
                
            </div>
           
            
            </div>
        </div>
    );
};

export default AddBook;
