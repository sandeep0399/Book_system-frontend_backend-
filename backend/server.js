const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'book_system',
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Routes
app.get('/books', (req, res) => {
    db.query('SELECT * FROM books', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});




// DELETE book by ID
app.delete('/books/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM books WHERE BookID = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting book:', err);
            return res.status(500).send('An error occurred while deleting the book.');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Book not found.');
        }

        res.send('Book deleted successfully.');
    });
}); 

//get a book by id

app.get('/books/:id', (req, res) => {
    const { id } = req.params;

    const sql = `
        SELECT 
            books.BookID, books.Title, books.Pages, books.PublishedDate,
            authors.Name AS AuthorName,
            genres.Name AS GenreName
        FROM books
        LEFT JOIN authors ON books.AuthorID = authors.AuthorID
        LEFT JOIN genres ON books.GenreID = genres.GenreID
        WHERE books.BookID = ?`;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error fetching book details:', err);
            return res.status(500).send('An error occurred while fetching book details.');
        }

        if (result.length === 0) {
            return res.status(404).send('Book not found.');
        }

        res.json(result[0]); // Return the first (and only) result
    });
});

//add a book
app.post('/books', async (req, res) => {
    const { Title, Author, Genre, Pages, PublishedDate } = req.body;

    try {
        // Function to get or create an author
        const getOrCreateAuthor = async (authorName) => {
            const authorCheck = 'SELECT AuthorID FROM authors WHERE Name = ?';
            const [author] = await db.promise().query(authorCheck, [authorName]);

            if (author.length > 0) {
                return author[0].AuthorID;
            } else {
                const insertAuthor = 'INSERT INTO authors (Name) VALUES (?)';
                const [result] = await db.promise().query(insertAuthor, [authorName]);
                return result.insertId; // Return the new AuthorID
            }
        };

        // Function to get or create a genre
        const getOrCreateGenre = async (genreName) => {
            const genreCheck = 'SELECT GenreID FROM genres WHERE Name = ?';
            const [genre] = await db.promise().query(genreCheck, [genreName]);

            if (genre.length > 0) {
                return genre[0].GenreID;
            } else {
                const insertGenre = 'INSERT INTO genres (Name) VALUES (?)';
                const [result] = await db.promise().query(insertGenre, [genreName]);
                return result.insertId; // Return the new GenreID
            }
        };

        // Resolve AuthorID and GenreID
        const authorId = await getOrCreateAuthor(Author);
        const genreId = await getOrCreateGenre(Genre);

        // Insert the book into the books table
        const insertBook = `
            INSERT INTO books (Title, AuthorID, GenreID, Pages, PublishedDate)
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await db.promise().query(insertBook, [Title, authorId, genreId, Pages, PublishedDate]);

        res.status(201).json({ message: 'Book added successfully!', bookId: result.insertId });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'An error occurred while adding the book.' });
    }
});


app.put('/books/:id', async (req, res) => {
    const { id } = req.params;
    const { Title, Author, Genre, Pages, PublishedDate } = req.body;

    try {
        // Update author if new
        const [authorResult] = await db.promise().query('SELECT AuthorID FROM authors WHERE Name = ?', [Author]);
        let authorId = authorResult.length > 0 ? authorResult[0].AuthorID : null;

        if (!authorId) {
            const [authorInsert] = await db.promise().query('INSERT INTO authors (Name) VALUES (?)', [Author]);
            authorId = authorInsert.insertId;
        }

        // Update genre if new
        const [genreResult] = await db.promise().query('SELECT GenreID FROM genres WHERE Name = ?', [Genre]);
        let genreId = genreResult.length > 0 ? genreResult[0].GenreID : null;

        if (!genreId) {
            const [genreInsert] = await db.promise().query('INSERT INTO genres (Name) VALUES (?)', [Genre]);
            genreId = genreInsert.insertId;
        }

        // Update book
        const updateQuery = `
            UPDATE books
            SET Title = ?, AuthorID = ?, GenreID = ?, Pages = ?, PublishedDate = ?
            WHERE BookID = ?`;
        await db.promise().query(updateQuery, [Title, authorId, genreId, Pages, PublishedDate, id]);

        res.status(200).json({ message: 'Book updated successfully!' });
    } catch (err) {
        console.error('Error updating book:', err);
        res.status(500).json({ error: 'Failed to update book.' });
    }
});





app.get('/genres', async (req, res) => {
    try {
        const [results] = await db.promise().query('SELECT * FROM genres');
        res.json(results);
    } catch (err) {
        console.error('Error fetching genres:', err);
        res.status(500).json({ error: 'Failed to fetch genres.' });
    }
});


app.get('/authors', async (req, res) => {
    try {
        const [results] = await db.promise().query('SELECT * FROM authors');
        res.json(results);
    } catch (err) {
        console.error('Error fetching authors:', err);
        res.status(500).json({ error: 'Failed to fetch authors.' });
    }
});











const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
