import React from 'react';
import TextBox from './Components/TextBox';
import StockBar from './Components/StockBar';
import StockButtons from './Components/StockButtons';
import PriceGraph from './Components/PriceGraph';

// API Used: https://financialmodelingprep.com/developer/docs/

const styles = {
  title: {
    textAlign: 'center',
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockSymbols: ['AAPL', 'MSFT', 'FB'],
      validSymbols: [],
      currentStock: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    //this.getPriceHistory = this.getPriceHistory.bind(this);
  }

  // SECTION: Lifecycle hooks

  componentDidMount() {
    // Fetches a list of valid stock symbols and populates the 
    // validSymbols array with the results.
    const symbolsListURL = 'https://financialmodelingprep.com/api/v3/company/stock/list';
    fetch(symbolsListURL)
    .then(res => res.json())
    .then(data => {
      let validSymbolsArray = []
      data.symbolsList.forEach(element => {
        validSymbolsArray.push(element.symbol)
      });
      this.setState({validSymbols: validSymbolsArray});
    })
    .catch(err => alert('Initial fetch failed'))
    
  }



  // SECTION: API Call Functions

  async getProfile(symbol) {
    const stockProfileURL = 'https://financialmodelingprep.com/api/v3/company/profile/';
    try {
      let rawData = await fetch(stockProfileURL + symbol);
      let data = await rawData.json();
      return data;
    } catch (err) {
      return {};
    }
  }

  async getPrice(symbol) {
    const stockPriceURL = 'https://financialmodelingprep.com/api/v3/stock/real-time-price/';
    try {
      let rawData = await fetch(stockPriceURL + symbol);
      let data = await rawData.json();
      return data.price;
    } catch (err) {
      return 'ERROR';
    }
  }
  
  async getRating(symbol) {
    const stockRatingURL = 'https://financialmodelingprep.com/api/v3/company/rating/';
    try {
      let rawData = await fetch(stockRatingURL + symbol);
      let data = await rawData.json();
      return data.rating.score;
    } catch (err) {
      return 0;
    }
  }

  // Accepts a stock symbol as a string
  // Return an array of the price history
  async getPriceHistory(symbol) {
    try {
      const stockPriceHistoryURL = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}`;
      let rawData = await fetch(stockPriceHistoryURL);
      let data = await rawData.json();
      return data.historical;
    } catch (err) {
      return {}
    }
  }



  // SECTION: Callbacks

  // Callback for the StockButtons component. 
  // Sets the current symbol to the corresponding button that was clicked.
  onClick(symbol) {
    this.setState({currentStock: symbol});
  }
  
  // Callback for the TextBox component.
  // Adds the submitted stock symbol to the stockSymbols array
  handleSubmit(event) {
    event.preventDefault();
    let symbol = event.target[0].value.trim();
    if (symbol === '') {
      alert('The input box was empty.');
    } else if (this.state.stockSymbols.includes(symbol.toUpperCase())) {
      alert('This stock symbol has already been entered.');
    } else if (!this.state.validSymbols.includes(symbol.toUpperCase())) {
      alert('That isn\'t a valid stock symbol.');
    } else {
      let newSymbols = this.state.stockSymbols.slice();
      newSymbols.push(symbol.toUpperCase());
      this.setState({stockSymbols: newSymbols});
    }
  }



  render() {
    return (
      <React.Fragment>
        <h1 style={styles.title}>Stock Watchlist</h1>
        <TextBox onSubmit={this.handleSubmit}/>
        <StockButtons symbols={this.state.stockSymbols} onClick={this.onClick} />
        <StockBar symbol={this.state.currentStock} getProfile={this.getProfile} />
        <PriceGraph symbol={this.state.currentStock} getPriceHistory={this.getPriceHistory} />
      </React.Fragment>
    );
  }
}

export default App;
