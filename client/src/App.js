import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [bookName, setBookName] = useState('');
  const [bookReview, setBookReview] = useState('');
  const [reviewList, setReviewList] = useState([]);
  const [newReview, setNewReview] = useState('');

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

  const deleteReview = (id) => {
    Axios.delete(`http://localhost:3001/api/delete/${id}`);
    setReviewList([...reviewList]);
  }

  const updateReview = (id) => {
    Axios.put('http://localhost:3001/api/update', {
      br_id: id, 
      br_review: newReview
    })
    setNewReview('');
    setReviewList([...reviewList]);
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

            <button onClick={() => {deleteReview(val.br_id)}}>Delete</button>
            <input type='text' className='Update' onChange={(e) => {setNewReview(e.target.value)}}/>
            <button onClick={() => {updateReview(val.br_id)}}>Update</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
