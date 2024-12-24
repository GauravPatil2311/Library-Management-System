import React, { Component } from 'react';
import './IssuedBooks.css'; // Correct path for styles
import axios from 'axios'; // Axios for making HTTP requests

class IssueForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberId: '',
      bookId: '',
      bookName: '',
      author: '',
      issueDate: '',
      returnDate: '',
      status: 'Issued',
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { memberId, bookId, bookName, author, issueDate } = this.state;
  
    // Validate required fields only
    if (!memberId || !bookId || !bookName || !author || !issueDate) {
      alert('All required fields must be filled.');
      return;
    }
  
    const newCirculation = {
      memberId,
      bookId,
      bookName,
      author,
      issueDate,
    };
  
    this.props.onSubmit(newCirculation);
  };
  

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { memberId, bookId, bookName, author, issueDate, returnDate, status } = this.state;

    return (
      <div className="issue-form">
        <h3>Issue a Book</h3>
        <form onSubmit={this.handleSubmit}>
          <label>Member ID</label>
          <input
            type="text"
            name="memberId"
            value={memberId}
            onChange={this.handleChange}
          />

          <label>Book ID</label>
          <input
            type="text"
            name="bookId"
            value={bookId}
            onChange={this.handleChange}
          />

          <label>Book Name</label>
          <input
            type="text"
            name="bookName"
            value={bookName}
            onChange={this.handleChange}
          />

          <label>Author</label>
          <input
            type="text"
            name="author"
            value={author}
            onChange={this.handleChange}
          />

          <label>Issue Date</label>
          <input
            type="date"
            name="issueDate"
            value={issueDate}
            onChange={this.handleChange}
          />

          <label>Return Date</label>
          <input
            type="date"
            name="returnDate"
            value={returnDate}
            onChange={this.handleChange}
          />

          <button type="submit">Issue Book</button>
        </form>
        <button onClick={this.props.onClose}>Close</button>
      </div>
    );
  }
}

export default IssueForm;