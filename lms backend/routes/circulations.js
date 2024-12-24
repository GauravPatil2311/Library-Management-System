const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// Get all circulations
router.get('/', (req, res) => {
  const query = 'SELECT * FROM circulations';
  
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching circulations:', err.message);
      return res.status(500).json({ error: 'Database error: ' + err.message });
    }

    // Format the dates before sending to frontend (YYYY-MM-DD)
    const formattedResults = results.map(item => ({
      ...item,
      issueDate: item.issueDate ? item.issueDate.toISOString().split('T')[0] : null,
      returnDate: item.returnDate ? item.returnDate.toISOString().split('T')[0] : null
    }));

    res.json(formattedResults);
  });
});

// Issue a book (POST method)
router.post('/', (req, res) => {
  const { memberId, bookId, bookName, author, issueDate } = req.body;

  // Validate the input data
  if (!memberId || !bookId || !bookName || !author || !issueDate) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const formattedIssueDate = new Date(issueDate).toISOString().split('T')[0];

  const query = 'INSERT INTO circulations (`Member ID`, `Book ID`, `Book Name`, `Author`, `Issue Date`, `Status`) VALUES (?, ?, ?, ?, ?, ?)';
  
  connection.query(query, [memberId, bookId, bookName, author, formattedIssueDate, 'Issued'], (err) => {
    if (err) {
      console.error('Error issuing book:', err.message);
      return res.status(500).json({ error: 'Database error: ' + err.message });
    }
    res.status(201).json({ message: 'Book issued successfully' });
  });
});

// Return a book (PUT method)
router.put('/return', (req, res) => {
  const { memberId, bookId, returnDate } = req.body;

  // Validate the input data
  if (!memberId || !bookId || !returnDate) {
    return res.status(400).json({ error: 'Member ID, Book ID, and Return Date are required' });
  }

  const selectQuery = 'SELECT * FROM circulations WHERE `Member ID` = ? AND `Book ID` = ?';
  
  connection.query(selectQuery, [memberId, bookId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching circulation data: ' + err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Circulation record not found' });
    }

    const circulation = results[0];
    const issueDateObj = new Date(circulation['Issue Date']);
    const returnDateObj = new Date(returnDate);
    const diffTime = returnDateObj - issueDateObj;
    const diffDays = diffTime / (1000 * 3600 * 24);
    
    let status = diffDays > 8 ? 'Overdue' : 'Returned';

    const updateQuery = 'UPDATE circulations SET `Return Date` = ?, `Status` = ? WHERE `Member ID` = ? AND `Book ID` = ?';
    
    connection.query(updateQuery, [returnDate, status, memberId, bookId], (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error updating circulation: ' + err.message });
      }

      res.json({ message: 'Book returned successfully', status });
    });
  });
});

// Get count of issued books
router.get('/issued', (req, res) => {
  const query = "SELECT COUNT(*) AS issuedBooks FROM circulations WHERE `Return Date` IS NULL OR `Return Date` = ''";

  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching issued books count' });
    }
    res.json({ issuedBooks: results[0].issuedBooks });
  });
});

// Get count of returned books
router.get('/returned', (req, res) => {
  const query = "SELECT COUNT(*) AS returnedBooks FROM circulations WHERE `Return Date` IS NOT NULL AND `Return Date` != ''";

  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching returned books count' });
    }
    res.json({ returnedBooks: results[0].returnedBooks });
  });
});
// Get total number of overdue books
router.get('/overdue', (req, res) => {
  const query = "SELECT COUNT(*) AS overdueBooks FROM circulations WHERE `Status` = 'Overdue'";

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: 'Error fetching overdue books count' });
    }
    res.json({ overdueBooks: results[0].overdueBooks });
  });
});


module.exports = router;
