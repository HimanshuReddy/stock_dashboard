import React from 'react';

const style = {
  buttonStyle: {
    margin: '10px',
    padding: '6px',
    borderRadius: '20px',
    width: '75px',
    textAlign: 'center',
  },
  divStyle: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
}

function StockButtons({ symbols, onClick }) {
  let buttonsArray = [];
  symbols.forEach(symbol => {
    buttonsArray.push(<button style={style.buttonStyle} onClick={() => onClick(symbol)}>{symbol}</button>)
  });
  return (
    <div style={style.divStyle}> 
      {buttonsArray}
    </div> 
  );
}

export default StockButtons;