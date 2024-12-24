import React, { Component } from 'react';

class UpdateBook extends Component {
  state = {
    bookId: this.props.book.Book_id, // Store the Book_id in state
    bookName: this.props.book["Book Name"], // Correct key for Book Name
    author: this.props.book.Author, // Store Author in state
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const updatedBook = {
      Book_id: this.state.bookId, // Book_id as per the backend
      "Book Name": this.state.bookName, // Correct key for Book Name
      Author: this.state.author, // Correct key for Author
    };
    this.props.onUpdateBook(updatedBook); // Call parent method to update
    this.setState({ bookName: "", author: "" }); // Clear form after submission
  };

  render() {
    const { bookId, bookName, author } = this.state;

    return (
      <div className="modal">
        <div className="modal-content">
          <h3>Update Book</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Book ID</label>
              <input
                type="text"
                name="bookId"
                value={bookId}
                disabled
                readOnly
                required
              />
            </div>
            <div className="form-group">
              <label>Book Name</label>
              <input
                type="text"
                name="bookName"
                value={bookName}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Author</label>
              <input
                type="text"
                name="author"
                value={author}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit">Update Book</button>
              <button type="button" onClick={this.props.onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default UpdateBook;
