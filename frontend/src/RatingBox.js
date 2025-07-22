import {useState, useEffect} from 'react';
import {useUpdateSeenRating} from './hooks/useSeenOperations';

const RatingBox = ({movie_id, currentRating}) => {
    const {updateSeenRating} = useUpdateSeenRating();
    const [rating, setRating] = useState([
        {
            id: 1,
            checked: false
        },
        {
            id: 2,
            checked: false
        },
        {
            id: 3,
            checked: false
        },
        {
            id: 4,
            checked: false
        },
        {
            id: 5,
            checked: false
        }
    ]);

    const [selectedRating, setSelectedRating] = useState(currentRating);

    useEffect(() => {
        setRating(prevRating => 
            prevRating.map(star => {
                return {...star, checked: star.id <= selectedRating ? true : false}
            })
        );
    }, [selectedRating]);

    const handleHoverStar = (id) => {
        if (Number(selectedRating) !== 0 && selectedRating !== null) {
            return;
        }
        const newRatingSelection = rating.map(star => {
            return {...star, checked: star.id <= id ? true : false}
        })
        setRating(newRatingSelection);
    };

    const handleLeaveStar = () => {
        if (selectedRating === 0) {
            const clearedRatingSelection = rating.map(star => {
                return {...star, checked: false}
            })
            setRating(clearedRatingSelection);
        }
    };
    const handleClickStar = (id) => {
        if (id == selectedRating) {
            setSelectedRating(0);
            updateSeenRating(movie_id, 0);
        } else {
            setSelectedRating(id);
            updateSeenRating(movie_id, id);
        }
    };

  return (
    <div className="RatingBox">
        {rating.map(star => (
            <div key={star.id} className={star.checked ? 'Star checked' : 'Star'} onMouseEnter={() => handleHoverStar(star.id)} onMouseLeave={handleLeaveStar} onClick={() => handleClickStar(star.id)}>
                ★
            </div>
        ))}
    </div>
  )
}

export default RatingBox
