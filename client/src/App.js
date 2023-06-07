import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Book Reviews</h1>
      <div className='Form'>
        <label>Book Title:</label>
        <input type='text' name='bookTitle'/>
        <label>Review:</label>
        <input type='text' name='bookReview'/>

        <button>Submit</button>
      </div>
    </div>
  );
}

export default App;
