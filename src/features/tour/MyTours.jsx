import { useLoaderData } from 'react-router-dom';
import { getMyTours } from '../../services/tour';
import TourItem from './TourItem';

function MyTours() {
  const tours = useLoaderData();

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

export async function loader() {
  const tours = await getMyTours();
  return tours;
}

export default MyTours;
