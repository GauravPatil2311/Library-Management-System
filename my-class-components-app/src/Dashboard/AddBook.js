import React, { Component } from "react";
import "./AddBook.css";

class AddBook extends Component {
  state = {
    bookId: this.props.book ? this.props.book.Book_id : "", // Pre-fill for updates
    bookName: this.props.book ? this.props.book["Book Name"] : "",
    author: this.props.book ? this.props.book.Author : "",
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onAddBook(this.state);
    this.setState({ bookId: "", bookName: "", author: "" });
  };

  render() {
    const { bookId, bookName, author } = this.state;

    return (
      <div className="modal">
        <div className="modal-content">
          <h3>{this.props.book ? "Update Book" : "Add New Book"}</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Book ID</label>
              <input
                type="text"
                name="bookId"
                value={bookId}
                onChange={this.handleInputChange}
                required
                disabled={this.props.book ? true : false} // Disable bookId field when updating
              />
            </div>
            <div className="form-group">
              <label>Book Name</label>
              <input type="text" name="bookName" value={bookName} onChange={this.handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Author</label>
              <input type="text" name="author" value={author} onChange={this.handleInputChange} required />
            </div>
            <div className="form-actions">
              <button type="submit">{this.props.book ? "Update Book" : "Add Book"}</button>
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

export default AddBook;
