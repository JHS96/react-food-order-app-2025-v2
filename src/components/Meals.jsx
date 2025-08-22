import MealItem from './MealItem.jsx';
import { useHttp } from '../hooks/useHttp.js';

const requestConfig = {};

export default function Meals() {
  const {
    data: loadedMeals,
    error,
    isLoading,
  } = useHttp('http://localhost:3000/meals', requestConfig, []);

  if (isLoading) {
    <p>Fetching meals...</p>;
  }

  // Below would work, but I went with a different approach here, using initialData in useHttp
  // if (!loadedMeals) {
  //   <p>No meals found.</p>;
  // }

  if (error) {
    console.log(error);
  }

  return (
    <ul id='meals'>
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
