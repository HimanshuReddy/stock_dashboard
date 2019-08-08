import React from 'react';


const styles = {
  form: {
    textAlign: 'center',
  },
  label: {
     
  }  
}

function TextBox({ onSubmit }) {
  return (
    <form style={styles.form} onSubmit={onSubmit}>
      <label style={styles.label}>
        Add Item:
        <input type="text" />
      </label>
      <button type="submit">Submit</button>
    </form>
    )
}

export default TextBox;