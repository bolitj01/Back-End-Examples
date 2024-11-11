import { useRef } from "react";
import styles from './styles/AddParticipant.module.css';
import { useDispatch } from 'react-redux';
import { addParticipant } from './participantsReducer';

const AddParticipant = () => {
  const nameTxt = useRef()
  const dispatch = useDispatch();

  return (
    <form className={styles.addParticipant}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <label htmlFor="name">Name</label>
      <input
        required
        type="text"
        name="name"
        id=""
        placeholder="Name"
        ref={nameTxt}
      />
      <button onClick={() => {
        dispatch(addParticipant(nameTxt.current.value));
        nameTxt.current.value = '';
      }}>Add Participant</button>
    </form>
  );
};

export default AddParticipant;
