import React from 'react';


const styles = {
  form: {
    textAlign: 'center',
  },
  label: {
     margin: '10px'
  },
  input: {
    margin: '5px'
  }  
}

function TextBox({ onSubmit }) {
  return (
    <form style={styles.form} onSubmit={onSubmit}>
      <label style={styles.label}>
        Add Symbol:
        <input style={styles.input} type="text" />
      </label>
      <button type="submit">Submit</button>
    </form>
    )
}

export default TextBox;