import React from 'react'

const TodoList = ({todos,setTodos, setEditTodo}) => {

    const handleComplete =(todo) =>{
        setTodos(
            todos.map((item)=>{
                if(item.id === todo.id){
                    return{...item,completed: !item.completed}

                }
                return item;
            })
        )
    }


    const handleEdit = ({id}) =>{
        const findTodo = todos.find((todo) => todo.id === id);
        setEditTodo(findTodo);


    }

    const handleDelete = ({id}) =>{
        setTodos(todos.filter((todo)=> todo.id !== id));
    };

    const getTimeAgo = (timestamp) => {
        const now = Date.now();
        const seconds = Math.floor((now - timestamp) / 1000);
    
        if (seconds < 60) return `${seconds}s ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        return `${days}d ago`;
    };
    

    const sortedTodos = [...todos].sort((a, b) => a.completed - b.completed);



  return (
    <div>
        
        {sortedTodos.map((todo)=>(
            <li className={`list-item priority-${todo.priority ? todo.priority.toLowerCase() : 'low'}  ${todo.completed ? 'completed-task' : ''}`} key={todo.id}>
                <input 
                type='text' 
                value={todo.title} 
                className={`list ${todo.completed ? "complete" :""}`} 
                onChange={(e)=>e.preventDefault()}
                />
           <span 
                className=
                {`priority-label ${todo.priority.toLowerCase()} ${todo.completed ? 'completed-priority' : ''}`}>
                {todo.priority}
            </span>

            <span className="time-ago">{getTimeAgo(todo.timestamp)}</span>
            
                <div>
            <button
                className={`button-complete task-button ${todo.completed ? 'completed' : ''}`}
                onClick={() => handleComplete(todo)}>
                <i className='fa fa-check-circle'></i>
            </button>
            <button className={`button-edit task-button ${todo.completed ? 'completed' : ''}`} 
                onClick={() => handleEdit(todo)}>
                <i className='fa fa-edit'></i>
            </button>
            <button className={`button-delete task-button ${todo.completed ? 'completed' : ''}`} 
                onClick={()=>handleDelete(todo)}>
                <i className='fa fa-trash'></i>
            </button>
                    
                    
            </div>

        </li>
        ))}
    </div>
  );
};

export default TodoList;