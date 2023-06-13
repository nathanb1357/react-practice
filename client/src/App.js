import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [bookName, setBookName] = useState('');
  const [bookReview, setBookReview] = useState('');
  const [reviewList, setReviewList] = useState([]);
  const [newReview, setNewReview] = useState('');

  useEffect(() => {fetchReviews()}, []);

  const fetchReviews = async () => {
    const response = await Axios.get('http://localhost:3001/api/get');
    setReviewList(response.data);
  }

  const submitReview = () => {
    Axios.post('http://localhost:3001/api/insert', {
      br_name: bookName, 
      br_review: bookReview
    });
    setReviewList([...reviewList, {br_name: bookName, br_review: bookReview}]);
  };

  const deleteReview = (id) => {
    Axios.delete(`http://localhost:3001/api/delete/${id}`);
    setReviewList(reviewList.filter((review) => review.br_id !== id));
  }

  const updateReview = async (id) => {
    Axios.put('http://localhost:3001/api/update', {
      br_id: id, 
      br_review: newReview
    });
    setReviewList(reviewList.map((review) => {
      if (review.br_id === id) {
        return { ...review, br_review: newReview };
      }
      return review;
    }));
    setNewReview('');
  }

  return (
    <div className="App">
      <div id="header">
        <h1>Nathan's Book Reviews</h1>
      </div>
      <div className='Form'>
        <label>Book Title:</label>
        <input type='text' name='bookTitle' onChange={(e) => {setBookName(e.target.value)}}/>

        <label>Review:</label>
        <input type='text' name='bookReview' onChange={(e) => {setBookReview(e.target.value)}}/>

        <button id="submit" onClick={submitReview}>Submit</button>
      </div>
      <div className="Reviews">
      {reviewList.map((val) => {
        return ( 
          <div className='Card'>
            <h2>{val.br_name}</h2>
            <p>{val.br_review}</p>

            <button className="delete" onClick={() => {deleteReview(val.br_id)}}>Delete</button>
            <input type='text' className='newText' onChange={(e) => {setNewReview(e.target.value)}}/>
            <button className="update" onClick={() => {updateReview(val.br_id)}}>Update</button>
          </div>
        );
      })}
      </div>
    </div>
  );
}

export default App;
