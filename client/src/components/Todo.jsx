import React from 'react'

const Todo = ({todo}) => {
  return (
    <>
      <div className="container bg-slate-400 border-2 rounded-xl p-2 px-7 text-xl my-1.5" >
        {todo.task}
      </div>
    </>
  )
}

export default Todo