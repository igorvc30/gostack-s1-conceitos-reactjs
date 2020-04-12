import React, {useState, useEffect} from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])
  const [repositoryName, setRepositoryName] = useState('Test');
  const [repositoryUrl, setRepositoryUrl] = useState('Url');

  useEffect(() => {
    api.get("/repositories").then(response => setRepositories(response.data))
  }, [])

  async function handleAddRepository() {
     const response = await api.post("/repositories",{
      title: repositoryName,
      url: repositoryUrl
    })
    const newRepository = response.data
    setRepositories([...repositories, newRepository])
  }

  async function handleRemoveRepository(id) {
    console.log(id)
    api.delete("/repositories/"+id).then(response => {
     if(response.status === 204){
       const newRepositories = repositories.filter(repository => repository.id !== id)
       setRepositories(newRepositories)
     }
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => (
            <li key={repository.id}>
              {`${repository.title} (${repository.url})`}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))
        }
      </ul>
      <div>
        <input type="text" placeholder="Repository Name" onChange={e => setRepositoryName(e.target.value)} />
        <input type="text" placeholder="Repository Url" onChange={e => setRepositoryUrl(e.target.value)} />
      </div>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
