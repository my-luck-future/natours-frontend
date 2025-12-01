import { useSelector } from 'react-redux';
import { getMyTours } from '../../services/tour';
import TourItem from './TourItem';
import { useState, useEffect } from 'react';

function MyTours() {
  const user = useSelector((state) => state.userTour);
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const loadTours = async () => {
      if (user.id === '') return;
      console.log('loading my tours.....');
      const tours = await getMyTours(user);
      setTours(tours);
    };

    loadTours();
  }, [user]);

  return (
    <main className="main">
      <div className="card-container">
        {tours.map((tour) => (
          <TourItem tour={tour} key={tour.name} />
        ))}
      </div>
    </main>
  );
}

export default MyTours;
