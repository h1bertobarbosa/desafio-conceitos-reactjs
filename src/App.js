import React, {useState, useEffect} from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(res => {
      setRepository(res.data)
    });
  }, []);

  async function handleAddRepository() {
    const repository = {
      url: 'https://github.com/h1bertobarbosa',
      title: `Desafio react ${Date.now()}`,
      techs: ['React', 'Node.js']
    };
    
    const res = await api.post('/repositories', repository);

    setRepository([...repositories, res.data]);
  }

  async function handleRemoveRepository(id) {
    const res = await api.delete(`repositories/${id}`);
    if(res.status === 204) {
      const key = repositories.findIndex(item => item.id === id);
      repositories.splice(key, 1);
      setRepository([...repositories])
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(item => (
          <li key={item.id}>
          {item.title}

          <button onClick={() => handleRemoveRepository(item.id)}>
            Remover
          </button>
        </li>
        ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
