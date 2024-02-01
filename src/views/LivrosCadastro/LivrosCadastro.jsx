import {useState} from 'react'
import Header from '../../components/Header/Header'
import "./index.scss"
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros'
import { LivrosService } from '../../api/LivrosService'
const LivrosCadastro = () => {
  const [livro, setLivro] = useState({
    id: '',
    titulo: '',
    numeroDePaginas: '',
    ISBN: '',
    editora: ''
  });

  
  async function createLivro() {
  const body = {
    id: Number(livro.id),
    titulo: livro.titulo,
    numeroDePaginas: Number(livro.numeroDePaginas),
    ISBN: livro.ISBN,
    editora: livro.editora
  };

  try {
    const response = await LivrosService.createLivro(body);
    alert('Livro criado com sucesso!');
    console.log(response.data); // Log da resposta para inspecionar no console do navegador
    window.location.reload()
  } catch (error) {
    console.error('Erro ao criar o livro:', error);
    alert('Erro ao criar o livro. Por favor, tente novamente.');
  }
}
  

  return (
    <>
      <Header />
      <SubmenuLivros />
      <div className='livrosCadastro'>
        <h1>Cadastro de Livros</h1>
        <div>
          <form id="formulario">
            <div className='form-group'>
              <label>Id</label>
              <input type="text" id='id' required onChange={(event) => { setLivro({ ...livro, id: event.target.value }) }}></input>
            </div>
            <div className='form-group'>
              <label>Titulo</label>
              <input type="text" id='titulo' required onChange={(event) => { setLivro({ ...livro, titulo: event.target.value }) }}></input>
            </div>
            <div className='form-group'>
              <label>Número de Páginas</label>
              <input type="text" id='num' required onChange={(event) => { setLivro({ ...livro, numeroDePaginas: event.target.value }) }}></input>
            </div>
            <div className='form-group'>
              <label>ISBN</label>
              <input type="text" id='isbn' required onChange={(event) => { setLivro({ ...livro, ISBN: event.target.value }) }}></input>
            </div>
            <div className='form-group'>
              <label>Editora</label>
              <input type="text" id='editora' required onChange={(event) => { setLivro({ ...livro, editora: event.target.value }) }}></input>
            </div>
            <div className='form-group'>
              <button type="button" onClick={createLivro}>Cadastrar Livro</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LivrosCadastro;