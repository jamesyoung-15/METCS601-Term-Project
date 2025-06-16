import "./DisplayTime.css";
import { useTime } from "../../hooks/useTime";

// display the time as a button
const DisplayTime = () => {
  const { data, loading, error } = useTime(42.3601, -71.0589); // Coordinates near me

  return (
    <button className="btn btn-primary time-button">
      <span>My local time:</span>
      <span>
        {loading ? (
          <span>Loading...</span>
        ) : error ? (
          <span>Error fetching time</span>
        ) : (
          <span>
            {data?.month}/{data?.day}/{data?.year} {data?.time}
          </span>
        )}
      </span>
    </button>
  );
};

export default DisplayTime;
