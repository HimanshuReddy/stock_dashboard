import React from 'react';
import { AreaChart, XAxis, YAxis, Area, Tooltip, ResponsiveContainer } from 'recharts';

const styles = {
  divStyle: {
    textAlign: 'center'
  }
}

class PriceGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graphData: []
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.symbol !== prevProps.symbol) {
      this.generateGraphData().then(data => {
        this.setState({graphData: data});
      });
    }
  }

  async generateGraphData() {
    let priceHistory = await this.props.getPriceHistory(this.props.symbol);
    let data = [];
    for (let i = priceHistory.length - 11; i < priceHistory.length - 1; i++) {
      let dataPoint = {};
      dataPoint.date = priceHistory[i].date;
      dataPoint.price = [priceHistory[i].low, priceHistory[i].high];
      data.push(dataPoint);
    }
    return data;
  }

  render() {
    return (
      <div style={styles.divStyle}>
        <h1>Price Graph</h1>
        {!this.state.graphData.length < 1 ? (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={this.state.graphData}
              margin={{
                top: 20, right: 20, bottom: 20, left: 20,
              }}
            >
              <XAxis dataKey="date" />
              <YAxis domain={[dataMin => (Math.round(dataMin * .98)), dataMax => (Math.round(dataMax * 1.02))]}/>
              <Area dataKey="price" stroke="#8884d8" fill="#8884d8" />
              <Tooltip />
            </AreaChart>
          </ResponsiveContainer>
        ) : <h3>Waiting...</h3>}
      </div>
    )
  }
}

export default PriceGraph;