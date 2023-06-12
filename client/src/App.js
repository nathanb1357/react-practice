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

  const submitReview = () => {
    Axios.post('http://localhost:3001/api/insert', {
      br_name: bookName, 
      br_review: bookReview
    });
    
    setReviewList([...reviewList, {br_name: bookName, br_review: bookReview}]);
  };

  const deleteReview = (name) => {
    Axios.delete(`http://localhost:3001/api/delete/${name}`);
  }

  return (
    <div className="App">
      <h1>Book Reviews</h1>
      <div className='Form'>
        <label>Book Title:</label>
        <input type='text' name='bookTitle' onChange={(e) => {setBookName(e.target.value)}}/>

        <label>Review:</label>
        <input type='text' name='bookReview' onChange={(e) => {setBookReview(e.target.value)}}/>

        <button onClick={submitReview}>Submit</button>
      </div>
      {reviewList.map((val) => {
        return ( 
          <div className='Card'>
            <h2>{val.br_name}</h2>
            <p>{val.br_review}</p>

            <button onClick={() => {deleteReview(val.br_name)}}>Delete</button>
            <input type='text' className='Update'/>
            <button>Update</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
