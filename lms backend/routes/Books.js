const express = require("express");
const router = express.Router();
const connection = require("../config/db");

// Fetch all books
router.get("/", (req, res) => {
  const query = "SELECT Book_id AS Book_id, `Book Name` AS `Book Name`, Author AS Author FROM total_books";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching books:", err.message);
      return res.status(500).send("Server error");
    }
    res.status(200).json(results);
  });
});

// Add a new book
router.post("/", (req, res) => {
  const { bookId, bookName, author } = req.body;

  if (!bookId || !bookName || !author) {
    return res.status(400).send("All fields are required");
  }

  const query = "INSERT INTO total_books (Book_id, `Book Name`, Author) VALUES (?, ?, ?)";
  connection.query(query, [bookId, bookName, author], (err) => {
    if (err) {
      console.error("Error adding book:", err.message);
      return res.status(500).send("Server error");
    }
    res.status(201).send("Book added successfully");
  });
});

// Delete a book
router.delete("/:bookId", (req, res) => {
  const { bookId } = req.params;
  const query = "DELETE FROM total_books WHERE Book_id = ?";
  connection.query(query, [bookId], (err) => {
    if (err) {
      console.error("Error deleting book:", err.message);
      return res.status(500).send("Server error");
    }
    res.status(200).send("Book deleted successfully");
  });
});

// Update a book
router.put("/:bookId", (req, res) => {
  const { bookId } = req.params;
  const { "Book Name": bookName, Author } = req.body;

  if (!bookName || !Author) {
    return res.status(400).send("All fields are required");
  }

  const query = "UPDATE total_books SET `Book Name` = ?, Author = ? WHERE Book_id = ?";
  connection.query(query, [bookName, Author, bookId], (err) => {
    if (err) {
      console.error("Error updating book:", err.message);
      return res.status(500).send("Server error");
    }
    res.status(200).send("Book updated successfully");
  });
});

// Fetch the count of total books
router.get("/count", (req, res) => {
  const query = "SELECT COUNT(*) AS totalBooks FROM total_books";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching book count:", err.message);
      return res.status(500).send("Server error");
    }
    res.status(200).json({ totalBooks: results[0].totalBooks });
  });
});


module.exports = router;
