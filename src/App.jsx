import React, { useState, useEffect } from 'react'

export default function App(){
  const [todos, setTodos] = useState(() => {
    const SaveTodos = localStorage.getItem('TodoList') 
    return SaveTodos ? JSON.parse(SaveTodos) : []
  })
      
  useEffect(() => {
    localStorage.setItem('TodoList', JSON.stringify(todos))
  }, [todos])

  async function handleTodolist(e) {
    e.preventDefault();
    const Input = e.target[0].value 
    if(!Input.trim()) return;

    setTodos([...todos, { text: Input.trim(), completed: false }])
    e.target.reset()
  }

  function deleteTodo(indexToDelete) {
    const updatedTodos = todos.filter((_, index) => index !== indexToDelete);
    setTodos(updatedTodos);
  }

  function toggleComplete(indexToToggle) {
    const updatedTodos = todos.map((item, index) => {
      if (index === indexToToggle) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setTodos(updatedTodos);
  }

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
      maxWidth: '420px',
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
      margin: '0 0 24px 0',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
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
      padding: '12px 24px',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      boxShadow: '0 4px 14px rgba(34, 211, 238, 0.3)'
    },
    todoList: {
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
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
      transition: 'transform 0.2s, border-color 0.2s'
    },
    leftArea: {
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      flex: 1,
      cursor: 'pointer',
      userSelect: 'none'
    },
    crossButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#64748b',
      fontSize: '18px',
      cursor: 'pointer',
      padding: '4px 8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'color 0.2s'
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        
        <h1 style={styles.title}>
          To-Do List <span style={{fontSize: '22px'}}>📋</span>
        </h1>
        
  
        <form 
          onSubmit={(e) => handleTodolist(e)} 
          style={styles.form}
          onFocus={(e) => e.currentTarget.style.borderColor = '#22d3ee'}
          onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
        >
          <input 
            type="text" 
            placeholder="Add a brilliant task..." 
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
        
        <ul style={styles.todoList}>
          {todos.map((item, index) => (
            <li key={index} style={styles.liItem}>
              
        
              <div onClick={() => toggleComplete(index)} style={styles.leftArea}>
                
              
                <div style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: item.completed ? '2px solid #22d3ee' : '2px solid #475569',
                  backgroundColor: item.completed ? '#22d3ee' : 'transparent',
                  transition: 'all 0.2s ease'
                }}>
                  {item.completed && (
                    <span style={{ color: '#0f172a', fontSize: '11px', fontWeight: '900' }}>✓</span>
                  )}
                </div>

                <span style={{
                  fontSize: '15px',
                  fontWeight: '500',
                  color: item.completed ? '#64748b' : '#f1f5f9',
                  textDecoration: item.completed ? 'line-through' : 'none',
                  opacity: item.completed ? 0.6 : 1,
                  wordBreak: 'break-all',
                  transition: 'all 0.2s'
                }}>
                  {item.text}
                </span>
              </div>
              
              <button 
                onClick={() => deleteTodo(index)}
                style={styles.crossButton}
                onMouseEnter={(e) => e.currentTarget.style.color = '#f43f5e'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
              >
                ✕
              </button>

            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <p style={{ textAlign: 'center', color: '#64748b', fontSize: '13px', marginTop: '24px', fontWeight: '500' }}>
            No tasks found.....
          </p>
        )}

      </div>
    </div>
  );
}