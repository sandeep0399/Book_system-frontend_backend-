import React, { useEffect, useState } from 'react'
import axios from 'axios'; 
import BookItem from './BooKitem';
import  './Home.css';
import DeletBtn from './DeletBtn';



const Home = () => { 

    const[searchInput,setSearchInput]=useState("")
    const [books, setBooks] = useState([]); 
    const[serchlist,setSerchlist]   = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:5000/books').then((response) => {
            setBooks(response.data);
        });
    }, []);  

    const searchClicked=()=>{
        if(searchInput==="")
            {
                setSerchlist([])
            alert("enter value")
            }
        else
        {
        setSerchlist(books.filter((each) =>
            each.Title.toLowerCase().includes(searchInput.toLowerCase())
          ))
        }

    }

    const handleBookDeleted = (bookID) => {
        setBooks(books.filter((book) => book.BookID !== bookID));
    };

     

     
  return (
    <div>
      <section className='home-section'>
        <div className='welocom-container'>
      <h1>Welcome to the Book Management System</h1>
      <p>Search, add, and manage your books seamlessly!</p>
      </div>
       <div className='search-box-container'  > 
        
        <input type="text" placeholder='Enter the book name Eg(har)' className="search-bar" value={searchInput} onChange={(e)=>setSearchInput(e.target.value)}/>
        <button className='btn btn-blue' onClick={searchClicked}> Search</button> 
        
        </div> 
        <div className='search-reasult'>
            <div>
        {serchlist.map((book) => ( 
                    <li className='list-item' key={book.BookID}>
                        {book.Title} -
                        <div className='buttons-container'> 
                            <BookItem key={book.BookID} book={book} />
                            <DeletBtn key={book.BookID} book={book} onBookDeleted={handleBookDeleted} />
                        </div>
                    </li>
                    
                ))}
                </div>
        </div>
       

      </section>
    </div>
  )
}

export default Home
