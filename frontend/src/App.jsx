import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const api = axios.create({
  baseURL: 'http://localhost:3000'
})

function App() {
  const [reviews, setReviews] = useState([])
  const [author, setAuthor] = useState('')
  const [review, setNewReviews] = useState('')



  useEffect(() => {
    api.get('/reviews').then((response) => {
      console.log(response.data)
      setReviews(response.data)
    })
  }, [])

  function newUser() {
    api.post('/reviews', {
      author,
      review
    }).then((response) => {
      console.log(response.data)
    })
  }

  function deleteReview(author, id) {
    api.delete(`/reviews/${id}`)
      .then(() => {
        setReviews(reviews.filter((tela) => tela.author !== author));
      })
      .catch((error) => {
        console.error('Erro ao excluir a avaliação:', error);
      });
  }


  return (

    <>
      <header class="cabeçalho">
        <img class='livro_logo'src='https://static.vecteezy.com/system/resources/previews/001/761/774/original/stack-of-books-on-white-background-free-vector.jpg'></img>
        <nav class="cabeçalho_menu">
          <p>Seja bem vindo ao Avaliavros.</p>
          <p></p>
        
        </nav>
      </header>
      <div className='home'>
        <section class="conteudo_principal">
          <div class="conteudo_principal_escrito">
            <h1 class="conteudo_principal_titulo">Avaliavros</h1>
            <h2 class="conteudo_principal_subtitulo">O seu lugar para entrega e avaliação de livros.</h2>
          </div>
          
        </section>
        <br></br>
        <br></br>
        <section class="conteudo_secundario">
        <h3 class="conteudo_secundario_titulo">O que somos:</h3>
        <h4 class="conteudo_secundario_paragrafo">1.Te enviamos um livro por mês e só pedimos uma coisa em troca</h4>
        <h4 class="conteudo_secundario_paragrafo">2.Volte aqui e nos enviei a sua review do livro </h4>
        </section>
      </div>
    <h2 class="titulo">O livro do mês foi ' Os Vestigios Do Dia ' de Kazuo Ishiguro oque achou da nossa recomendação?, por favor compartilhe sua opinião no formulário abaixo. </h2>
      
      <div className="App">
      <img className='imagem_livro' src='https://static.wixstatic.com/media/5801fd_f5d54504e8a34190b1cea52d3c489d59~mv2_d_1659_2480_s_2.jpg/v1/fill/w_640,h_956,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/5801fd_f5d54504e8a34190b1cea52d3c489d59~mv2_d_1659_2480_s_2.jpg'></img>
        <>
          <div className="adicionar_review">
            <h1 class="titulo">adicione aqui</h1>
            <input class="escrever" placeholder='nome' onChange={event => setAuthor(event.target.value)}>
            </input>
            <br>
            </br>
            <br>
            </br>
            <input class="escrever" placeholder='Oque achou dele?' onChange={event => setNewReviews(event.target.value)}>
            </input>
            <br></br>
            <br></br>
            <button class="buton" onClick={newUser}>Enviar review
            </button>
            <h4 class="sinopse">
              <h4 class="titulo">sinopse:</h4>
              O mordomo Stevens, já próximo da velhice, rememora as três décadas<br></br> dedicadas à casa de um distinto nobre britânico,<br></br> lord Darlington, hoje ocupada por um milionário norte-americano.<br></br> Por insistência do novo patrão, Stevens sai de férias em viagem pelo interior da Inglaterra.</h4>

          </div></>



        <ul>

          <br></br> {reviews.map((tela) => (
            <div className='texto_review'>
              <br></br>
              <br></br>
              <p >Nome: {tela.author}</p>
              <br></br>
              <p > Review: {tela.review}</p>
              <br></br>
              <button class="buton" onClick={() => deleteReview(tela.author, tela._id)}>Excluir</button>
            </div>
          ))}
        </ul>

       <footer>
        
       </footer>


      </div></>





  )
}

export default App
