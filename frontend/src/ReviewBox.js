const ReviewBox = () => {
  return (
    <div className="ReviewBox">
        <form>
            <textarea placeholder="Add your review..." required></textarea>
            <button type="submit">Add Review</button>
        </form>
    </div>
  )
}

export default ReviewBox
