import React, { Component } from 'react';
import './ReturnForm.css';

class ReturnForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberId: '',
      bookId: '',
      returnDate: '',
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onReturn(this.state);
    this.props.onClose();
  };

  render() {
    const { memberId, bookId, returnDate } = this.state;

    return (
      <div className="modal">
        <div className="modal-content">
          <h3>Return Book</h3>
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
              <label htmlFor="returnDate">Return Date</label>
              <input
                type="date"
                id="returnDate"
                name="returnDate"
                value={returnDate}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit">Return Book</button>
              <button type="button" onClick={this.props.onClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ReturnForm;
