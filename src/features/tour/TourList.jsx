import { useLoaderData } from 'react-router-dom';
import { getTours } from '../../services/tour';
import TourItem from './TourItem';

function TourList() {
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
  const tours = await getTours();
  return tours;
}

export default TourList;
