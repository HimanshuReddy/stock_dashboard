import React from 'react';
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer} from 'recharts';

const styles = {
  divStyle: {
    textAlign: 'center'
  }
}

class RatingGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graphData: [],
      overallRating: 0,
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.symbol !== prevProps.symbol) {
      this.generateGraphData().then(data => {
        this.setState({overallRating: data[0]});
        this.setState({graphData: data[1]});
      });
    }
  }

  async generateGraphData() {
    let ratingInfo = await this.props.getRating(this.props.symbol);
    // This is to handle failures in getting the data (which happens with the GOOG symbol)
    if (Object.keys(ratingInfo).length === 0) {
      return [[], []];
    } 
    let graphData = [];
    for (let i = 1; i < ratingInfo.length; i++) {
      graphData.push({
        name: ratingInfo[i][0],
        rating: ratingInfo[i][1]
      })
    }
    return [ratingInfo[0][1], graphData];
  }

  render() {
    return (
      <div style={styles.divStyle}>
        <h2>Stock Ratings</h2>
        <h3>Overall Rating: {this.state.overallRating}</h3>
        {!this.state.graphData.length < 1 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={this.state.graphData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="rating" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        ) : <h3>Waiting...</h3>}
      </div>
    )
  }
}

export default RatingGraph;