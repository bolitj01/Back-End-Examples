import styles from "./styles/RoomGrid.module.css"; // Import the CSS module
import Room from "./Room";
import { useSelector } from "react-redux";

const RoomGrid = () => {
  const roomCount = useSelector((state) => {
    return state.participants.roomCount;
  });

  return (
    <div className={styles.gridContainer}>
      {[...Array(roomCount)].map((_, i) => (
        <Room key={i} roomIndex={i} />
      ))}
    </div>
  );
};

export default RoomGrid;
