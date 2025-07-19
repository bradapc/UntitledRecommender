import {useState} from 'react';

const ReviewBox = ({handleSubmitClicked}) => {
    const [review, setReview] = useState();

  return (
    <div className="ReviewBox">
        <form>
            <textarea placeholder="Add your review..." required value={review} onChange={(e) => setReview(e.target.value)}></textarea>
            <button type="submit" onClick={(e) => handleSubmitClicked(e, review)}>Add Review</button>
        </form>
    </div>
  )
}

export default ReviewBox
