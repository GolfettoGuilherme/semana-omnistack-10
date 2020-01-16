import React, {useState, useEffect} from 'react';
import api from './services/api';


import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

function App() {

    const [devs, setDevs] = useState([]);
    

    //esse useEffect de uma forma grosseira diz que só vai ser exercutado uma vez no componente
    useEffect(() => {
        async function loadDevs(){
            const response = await api.get('/devs');
            setDevs(response.data);
        }

        loadDevs();
    },[]);

    async function handleAddDev(dados){
        const response = await api.post('/devs',dados);        
        setDevs([...devs, response.data]); //tipo um push só que criando um novo
    }

  return (
    <div id="app">
        <aside>
            <strong>Cadastrar</strong>
            <DevForm onSubmit={handleAddDev}/>
        </aside>
        <main>
            <ul>
                {devs.map(dev => (
                    <DevItem key={dev._id} dev={dev}/>
                ))}
            </ul>
        </main>
    </div>
  );
}

export default App;
