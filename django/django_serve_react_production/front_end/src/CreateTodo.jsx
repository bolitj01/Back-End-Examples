import axios from "axios"
import { useRef } from "react"
import { useCSRFToken } from "./CSRFTokenContext"

const CreateTodo = ({addTodo}) => {

    const csrfToken = useCSRFToken()

    const titleRef = useRef()
    const descriptionRef = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newTodo = {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            completed: false
        }
        try {
            const response = await axios.post(
                '/api/todo/create_todo/',
                newTodo,
                {
                    headers: {
                        'X-CSRFToken': csrfToken
                    },
                    withCredentials: true
                }
            )
            console.log('Todo created:', response.data)
            addTodo(newTodo)
        } catch (error) {
            console.error('Failed to create todo:', error)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    ref={titleRef}
                    placeholder="Title"
                    required
                />
                <input
                    type="text"
                    ref={descriptionRef}
                    placeholder="Description"
                    required
                />
                <button type="submit">Create Todo</button>
            </form>
        </>
    )
}

export default CreateTodo