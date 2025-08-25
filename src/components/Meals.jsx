import MealItem from './MealItem.jsx';
import { useHttp } from '../hooks/useHttp.js';
import Error from './Error.jsx';

const requestConfig = {};

export default function Meals() {
  const {
    data: loadedMeals,
    error,
    isLoading,
  } = useHttp('http://localhost:3000/meals', requestConfig, []);

  if (isLoading) {
    return <p className='center'>Fetching meals...</p>;
  }

  // Below would work, but I went with a different approach here, using initialData in useHttp
  // if (!loadedMeals) {
  //   <p>No meals found.</p>;
  // }

  if (error) {
    return <Error title='Failed to fetch meals' message={error} />;
  }

  return (
    <ul id='meals'>
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
