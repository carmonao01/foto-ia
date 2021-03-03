import React, { useState } from 'react'
import { ReactComponent as Robot } from '../src/images/robo.svg'
import Carregando from '../src/images/Loading.gif'
import './App.css'

//JSX Java Script eXtension
//Hook
function App(){
  const [pessoas, setPessoas] = useState([])
  const [carregando, setCarregando] = useState(false)

  function ListaPessoas(){
    const listagemPessoas = pessoas.map((pessoa)=>
    <img key={pessoa.id} src={pessoa.urls[4][512]} title="Gerada por IA"
         alt="Pessoa Gerada por IA" />
    )
    return (
      <> {listagemPessoas}</>
    )
  }

  async function obterFoto(){
    setCarregando(true)
    let url = "https://api.generated.photos/api/v1/faces?api_key=3XqZxEfU4nQJGNteVeoXUw"
    await fetch(url)
    .then(response => response.json())
    .then(data => {
     setPessoas(data.faces)
     console.log('Dados carregados com sucesso!')
    })
    .catch(function (error) {
      console.error('Houve um problema na requisição: '+ error.message)
    })
    setCarregando(false)
  }

  return(
    <div className="App">
      <h1>Gerador de Fotos via IA</h1>
      <Robot />
      {carregando &&
      <img src={Carregando} title="Aguarde..." alt="Aguarde, dados sendo carregados" />
      }
      <ListaPessoas />
      <button type='button' onClick={obterFoto}>
        Obter Imagens
      </button>
    </div>
  )
}

export default App
