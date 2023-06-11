import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [bookName, setBookName] = useState('');
  const [bookReview, setBookReview] = useState('');
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      console.log(response.data)
      setReviewList(response.data);
    })
  }, [])

  const submitCheck = () => {
    Axios.post('http://localhost:3001/api/insert', {
      bookName: bookName, 
      bookReview: bookReview
    }).then(() => {
      alert("Succesful insert");
    });
  };

  return (
    <div className="App">
      <h1>Book Reviews</h1>
      <div className='Form'>
        <label>Book Title:</label>
        <input type='text' name='bookTitle' onChange={(e) => {setBookName(e.target.value)}}/>

        <label>Review:</label>
        <input type='text' name='bookReview' onChange={(e) => {setBookReview(e.target.value)}}/>

        <button onClick={submitCheck}>Submit</button>
      </div>
      {reviewList.map((val) => {
        return ( 
          <div key={val.br_id}>
            <h2>Book: {val.br_name}</h2>
            <p>Review: {val.br_review}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
