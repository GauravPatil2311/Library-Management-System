import React, { Component } from 'react';
import Card from './Card';
import './Cards.css';
import axios from 'axios';

class Cards extends Component {
  state = {
    totalBooks: 0,
    totalMembers: 50, // Static value for now, you can replace it with dynamic data if needed
    issuedBooks: 0,
    returnedBooks: 0,
    overdueBooks: 0,  // New state to store overdue books count
  };

  componentDidMount() {
    // Fetch the total number of books and issued/returned/overdue books when the component mounts
    this.fetchTotalBooks();
    this.fetchIssuedBooks();
    this.fetchReturnedBooks();
    this.fetchOverdueBooks();  // Fetch overdue books count
  }

  fetchTotalBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/books/count');
      this.setState({ totalBooks: response.data.totalBooks });
    } catch (error) {
      console.error('Error fetching total books:', error.message);
    }
  };

  fetchIssuedBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/circulations/issued');
      this.setState({ issuedBooks: response.data.issuedBooks });
    } catch (error) {
      console.error('Error fetching issued books count:', error.message);
    }
  };

  fetchReturnedBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/circulations/returned');
      this.setState({ returnedBooks: response.data.returnedBooks });
    } catch (error) {
      console.error('Error fetching returned books count:', error.message);
    }
  };

  // New method to fetch the count of overdue books
  fetchOverdueBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/circulations/overdue');
      this.setState({ overdueBooks: response.data.overdueBooks });
    } catch (error) {
      console.error('Error fetching overdue books count:', error.message);
    }
  };

  render() {
    const { onClick } = this.props;
    const { totalBooks, totalMembers, issuedBooks, returnedBooks, overdueBooks } = this.state;

    const cardsData = [
      { symbol: '👤', number: totalMembers, text: 'Total Members', color: '#2196F3' },
      { symbol: '📚', number: totalBooks, text: 'Total Books', color: '#4CAF50' },
      { symbol: '📤', number: issuedBooks, text: 'Issued Books', color: '#FF9800' },
      { symbol: '📥', number: returnedBooks, text: 'Returned Books', color: '#F44336' },
      { symbol: '⏳', number: overdueBooks, text: 'Overdue Books', color: '#FF5722' },  // Added overdue books card
    ];

    return (
      <div className="cards-container">
        {cardsData.map((card, index) => (
          <Card
            key={index}
            symbol={card.symbol}
            number={card.number}
            text={card.text}
            color={card.color}
            onClick={card.text === 'Total Books' ? onClick : null}
          />
        ))}
      </div>
    );
  }
}

export default Cards;
