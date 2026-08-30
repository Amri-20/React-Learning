import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo } from '../Features/Todo/TodoSlice'

function Todos() {
    const todos = useSelector(state => state.todos.todos)
    const dispatch = useDispatch()

    return (
        <>
            <div>Todos</div>

            <ul className="list-none p-0">
                {todos.map((todo) => (
                    <li key={todo.id} className="my-2">
                        {todo.text}

                        <button
                            className="ml-2"
                            onClick={() => dispatch(removeTodo(todo.id))}
                        >
                            X
                        </button>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Todos