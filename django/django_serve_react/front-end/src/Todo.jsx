import React from 'react'

const Todo = ({ title, description, toggle, remove }) => {
    return (
        <>
            <h3>
                {title}
                <input type="checkbox" onChange={toggle} />
            </h3>
            <p>{description}</p>

            <button onClick={remove}>Remove</button>
        </>
    )
}

export default Todo