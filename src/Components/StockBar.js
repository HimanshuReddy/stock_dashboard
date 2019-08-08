import React from 'react';


const styles = {
  startMessage: {
    textAlign: 'center',
    color: 'gray'
  },
  stockBar: {
    textAlign: 'center',
    color: 'grey'
  }
}

class StockBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // The React object to render
      renderItem: <h2 style={styles.startMessage}>Click a button</h2>
    }
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.symbol !== prevProps.symbol) {
      this.generateStockInfo().then(data => {
        this.setState({renderItem: data});
      });
    }
  }

  async generateStockInfo() {
    let profile = await this.props.getProfile(this.props.symbol);
    profile = profile.profile
    return (
      <h3 style={styles.stockBar}>{profile.companyName} : ${profile.price}</h3>
    )
  }
  
  render() {
    return (
      <>
        {this.state.renderItem}
      </>
    )
  }
}

export default StockBar;