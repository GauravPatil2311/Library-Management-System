import React, { Component } from 'react';
import './IssueForm.css';

class IssueForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberId: '',
      bookId: '',
      bookName: '',
      author: '',
      issueDate: '',
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { memberId, bookId, bookName, author, issueDate } = this.state;
    const newCirculation = {
      memberId,
      bookId,
      bookName,
      author,
      issueDate,
      returnDate: '', // Initially return date is empty
      status: 'Issued', // Set status to 'Issued' when book is issued
    };

    this.props.onSubmit(newCirculation); // Call the parent component's onSubmit function
    this.setState({ memberId: '', bookId: '', bookName: '', author: '', issueDate: '' });
  };

  render() {
    const { memberId, bookId, bookName, author, issueDate } = this.state;

    return (
      <div className="modal">
        <div className="modal-content">
          <h3>Issue Book</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="memberId">Member ID</label>
              <input
                type="text"
                id="memberId"
                name="memberId"
                value={memberId}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="bookId">Book ID</label>
              <input
                type="text"
                id="bookId"
                name="bookId"
                value={bookId}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="bookName">Book Name</label>
              <input
                type="text"
                id="bookName"
                name="bookName"
                value={bookName}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="author">Book Author</label>
              <input
                type="text"
                id="author"
                name="author"
                value={author}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="issueDate">Issue Date</label>
              <input
                type="date"
                id="issueDate"
                name="issueDate"
                value={issueDate}
                onChange={this.handleInputChange}
                min={new Date().toISOString().split("T")[0]} // Disable past dates
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit">Issue Book</button>
              <button type="button" onClick={this.props.onClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default IssueForm;
