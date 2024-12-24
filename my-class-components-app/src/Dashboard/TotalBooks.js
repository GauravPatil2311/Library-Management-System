import React, { Component } from "react";
import "./TotalBooks.css";
import AddBook from "./AddBook";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import UpdateBook from './UpdateBook';

class TotalBooks extends Component {
  state = {
    books: [],
    searchQuery: "",
    showAddBookModal: false,
    showUpdateBookModal: false,
    currentBook: null,
    successMessage: "",
    showPopup: false,
    showBookDetailsModal: false,  // Added state for book details modal
  };

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/books");
      this.setState({ books: response.data });
    } catch (error) {
      console.error("Error fetching books:", error.message);
    }
  };

  handleAddBook = async (newBook) => {
    try {
      await axios.post("http://localhost:3000/books", newBook);
      this.fetchBooks();
      this.setState({ showAddBookModal: false, successMessage: "Book added successfully!", showPopup: true });
      setTimeout(() => this.setState({ showPopup: false }), 3000);
    } catch (error) {
      console.error("Error adding book:", error.message);
    }
  };

  handleRemoveBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:3000/books/${bookId}`);
      this.fetchBooks();
      this.setState({ successMessage: "Book removed successfully!", showPopup: true });
      setTimeout(() => this.setState({ showPopup: false }), 3000);
    } catch (error) {
      console.error("Error removing book:", error.message);
    }
  };

  handleUpdateBook = async (updatedBook) => {
    try {
      await axios.put(`http://localhost:3000/books/${updatedBook.Book_id}`, updatedBook);
      this.fetchBooks();
      this.setState({ showUpdateBookModal: false, successMessage: "Book updated successfully!", showPopup: true });
      setTimeout(() => this.setState({ showPopup: false }), 3000);
    } catch (error) {
      console.error("Error updating book:", error.message);
    }
  };

  handleSearch = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleViewBook = (book) => {
    this.setState({ currentBook: book, showBookDetailsModal: true });  // Show the book details modal
  };

  closeBookDetailsModal = () => {
    this.setState({ showBookDetailsModal: false });  // Close the book details modal
  };

  closePopup = () => {
    this.setState({ showPopup: false });
  };

  render() {
    const { searchQuery, books, showAddBookModal, successMessage, currentBook, showUpdateBookModal, showPopup, showBookDetailsModal } = this.state;

    // Modified the filtering logic to include Book_id search
    const filteredBooks = books.filter((book) =>
      book["Book Name"]?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.Author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.Book_id?.toString().includes(searchQuery)  // Search by Book_id
    );

    return (
      <div className="total-books-container">
        <div className="table-header">
          <h2>Total Books</h2>
          <div className="table-controls">
            <input
              type="text"
              placeholder="Search by Book Name, Author, or Book ID..."
              value={searchQuery}
              onChange={this.handleSearch}
              className="search-box"
            />
            <button className="add-book-button" onClick={() => this.setState({ showAddBookModal: true })}>
              + Add Book
            </button>
          </div>
        </div>

        <table className="total-books-table">
          <thead>
            <tr>
              <th>Book ID</th>
              <th>Book Name</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book.Book_id}>
                <td>{book.Book_id}</td>
                <td>{book["Book Name"]}</td>
                <td>{book.Author}</td>
                <td>
                  {/* Eye icon in blue button */}
                  <button
                    onClick={() => this.handleViewBook(book)}
                    className="action-button eye-button"
                  >
                    <FaEye />
                  </button>

                  {/* Edit icon in green button */}
                  <button
                    onClick={() => this.setState({ showUpdateBookModal: true, currentBook: book })}
                    className="action-button edit-button"
                  >
                    <FaEdit />
                  </button>

                  {/* Trash icon in red button */}
                  <button
                    onClick={() => this.handleRemoveBook(book.Book_id)}
                    className="action-button trash-button"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Book Modal */}
        {showAddBookModal && (
          <AddBook
            onAddBook={this.handleAddBook}
            onClose={() => this.setState({ showAddBookModal: false })}
          />
        )}

        {/* Update Book Modal */}
        {showUpdateBookModal && (
          <UpdateBook
            onUpdateBook={this.handleUpdateBook}
            onClose={() => this.setState({ showUpdateBookModal: false })}
            book={currentBook}
          />
        )}

        {/* Book Details Modal */}
        {showBookDetailsModal && currentBook && (
          <div className="popup-message">
            <div className="popup-content">
              <h3>Book Details</h3>
              <p><strong>Book ID:</strong> {currentBook.Book_id}</p>
              <p><strong>Book Name:</strong> {currentBook["Book Name"]}</p>
              <p><strong>Author:</strong> {currentBook.Author}</p>
              <button onClick={this.closeBookDetailsModal}>Close</button>
            </div>
          </div>
        )}

        {/* Popup Message */}
        {showPopup && (
          <div className="popup-message">
            <div className="popup-content">
              <p>{successMessage}</p>
              <button onClick={this.closePopup}>Close</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default TotalBooks;
