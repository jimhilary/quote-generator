import React, { Component } from 'react';// Import React and the Component class from React
import _ from 'lodash';// Import the Lodash library for utility functions 
import './App.css';// Import the CSS file for styling 



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      selectedQuoteIndex: null,// Initialize the selected quote index as null
    };
  }

  // This method is called automatically after the component is added to the DOM
  componentDidMount() {
    // Fetch quotes from the given URL
    fetch('https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json')
      .then(response => response.json()) // Convert the response to JSON
      .then(quotes => this.setState({ quotes: quotes }, () => {
        this.setState({ selectedQuoteIndex: this.selectQuoteIndex() });
      }));
  }

   // Function to select a random quote index
  selectQuoteIndex() {
    const { quotes } = this.state; // Destructure quotes from the state
    if (!quotes.length) {
      return undefined;
    }
     // Return a random index within the quotes array
    return Math.floor(Math.random() * quotes.length);
  }

  // Event handler for clicking the "New Quote" button
  nextQuoteClickHandler = () => {
     // Update the selectedQuoteIndex with a new random index
    this.setState({ selectedQuoteIndex: this.selectQuoteIndex() });
  };

  // Getter to return the currently selected quote
  get selectedQuote() {
    if (!this.state.quotes.length || this.state.selectedQuoteIndex === null) {
      return undefined;
    }
    return this.state.quotes[this.state.selectedQuoteIndex];
  }

  // Render method to display the component
  render() {
    const quote = this.selectedQuote; // Get the currently selected quote

    return (
      <div id="quote-box" className="quote-box">
        {quote ? (
          <>
            <p id="text">{quote.quote}</p>
            <p id="author">- {quote.author}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
        <button id="new-quote" onClick={this.nextQuoteClickHandler}>
          New Quote
        </button>
        {quote && (
          <a
            id="tweet-quote"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote.quote}" - ${quote.author}`)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Tweet Quote
          </a>
        )}
      </div>
    );
  }
}

export default App;
