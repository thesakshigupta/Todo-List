import React, { useState, useEffect } from 'react'

export default function App() {
  const [todos, setTodos] = useState(() => {
    const SaveTodos = localStorage.getItem('TodoList') 
    return SaveTodos ? JSON.parse(SaveTodos) : []
  })

  useEffect(() => {
    localStorage.setItem('TodoList', JSON.stringify(todos))
  }, [todos]) 

  async function handleTodolist(e) {
    e.preventDefault();
    const Input = e.target.todo.value.trim();
    if (!Input) return; 
    setTodos(prev => [...prev, Input]);
    e.target.reset()
  }

  function deleteTodo(indexToDelete) {
    const updatedTodos = todos.filter((_, index) => index !== indexToDelete);
    setTodos(updatedTodos);
  }

  function editTodo(i) {
    const editValue = prompt(`Enter edit value for "${todos[i]}"`)
    if (editValue === null || editValue.trim() === '') return;
    setTodos(prev =>
      prev.map((todo, index) => index === i ? editValue.trim() : todo)
    );
  }

  // Pure CSS-in-JS design system
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#0f172a', 
      backgroundImage: 'radial-gradient(circle at top right, #1e293b, #0f172a)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'start',
      paddingTop: '80px',
      paddingLeft: '16px',
      paddingRight: '16px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      boxSizing: 'border-box'
    },
    card: {
      width: '100%',
      maxWidth: '440px',
      backgroundColor: '#1e293b', 
      borderRadius: '24px',
      padding: '32px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      boxSizing: 'border-box'
    },
    title: {
      color: '#ffffff',
      fontSize: '26px',
      fontWeight: '800',
      letterSpacing: '-0.5px',
      margin: '0 0 6px 0',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    subtitle: {
      color: '#64748b',
      fontSize: '13px',
      fontWeight: '500',
      margin: '0 0 24px 0'
    },
    form: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#0f172a',
      borderRadius: '16px',
      padding: '4px 4px 4px 16px',
      marginBottom: '28px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'border-color 0.2s',
    },
    input: {
      width: '100%',
      backgroundColor: 'transparent',
      border: 'none',
      outline: 'none',
      fontSize: '15px',
      color: '#f8fafc',
      padding: '12px 0',
    },
    addButton: {
      backgroundColor: '#22d3ee', 
      color: '#0f172a',
      border: 'none',
      fontWeight: '700',
      fontSize: '13px',
      letterSpacing: '0.5px',
      padding: '12px 20px',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      boxShadow: '0 4px 14px rgba(34, 211, 238, 0.2)'
    },
    todoList: {
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      maxHeight: '360px',
      overflowY: 'auto'
    },
    liItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 16px',
      backgroundColor: 'rgba(255, 255, 255, 0.02)',
      borderRadius: '14px',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      listStyle: 'none',
      transition: 'all 0.2s'
    },
    todoText: {
      fontSize: '15px',
      fontWeight: '500',
      color: '#f1f5f9',
      wordBreak: 'break-all',
      paddingRight: '12px'
    },
    actionsContainer: {
      display: 'flex',
      gap: '6px',
      flexShrink: 0
    },
    actionBtn: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      border: 'none',
      fontSize: '12px',
      fontWeight: '600',
      padding: '6px 12px',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s'
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        {/* Header */}
        <h1 style={styles.title}>
          Todo List <span style={{fontSize: '22px'}}>📋</span>
        </h1>
        <p style={styles.subtitle}>Apne daily tasks ko manage aur track karein.</p>
        
        {/* Input Form */}
        <form 
          onSubmit={handleTodolist} 
          style={styles.form}
          onFocus={(e) => e.currentTarget.style.borderColor = '#22d3ee'}
          onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
        >
          <input 
            type="text" 
            name="todo"
            placeholder="Add a new task..." 
            style={styles.input}
          />
          <button 
            type="submit" 
            style={styles.addButton}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#06b6d4'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#22d3ee'}
          >
            ADD
          </button>
        </form>
        
        {/* Todo Items */}
        <ul style={styles.todoList}>
          {todos && todos.map((item, index) => (
            <li 
              key={index} 
              style={styles.liItem}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'}
            >
              <span style={styles.todoText}>{item}</span>
              
              <div style={styles.actionsContainer}>
                <button 
                  onClick={() => editTodo(index)}
                  style={{...styles.actionBtn, color: '#38bdf8'}}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.15)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
                >
                  Edit
                </button>
                <button 
                  onClick={() => deleteTodo(index)}
                  style={{...styles.actionBtn, color: '#f43f5e'}}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(244, 63, 94, 0.15)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Empty State */}
        {todos.length === 0 && (
          <p style={{ textAlign: 'center', color: '#64748b', fontSize: '13px', marginTop: '16px', fontWeight: '500' }}>
            No tasks found. Enjoy your day!
          </p>
        )}

      </div>
    </div>
  );
}





