const Todo = ({title, description, completed, toggleComplete}) => {

  return (
    <>
        <h3>{title}</h3>
        <p>{description}</p>
        <input type="checkbox" checked={completed} onChange={toggleComplete}/>
    </>
  )
}

export default Todo