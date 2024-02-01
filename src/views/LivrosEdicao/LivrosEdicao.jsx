import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import "./index.scss";
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros';
import { useParams } from 'react-router-dom';
import { LivrosService } from '../../api/LivrosService';


const LivrosEdicao = () => {
  let { livroId } = useParams();

  const [livro, setLivro] = useState({
    titulo: '',
    numeroDePaginas: '',
    ISBN: '',
    editora: ''
  });

  async function getLivro() {
    try {
      const { data } = await LivrosService.getLivro(livroId);
      setLivro(data); // Define o estado com os dados do livro obtidos da API
    } catch (error) {
      console.error('Erro ao buscar o livro:', error);
    }
  }

  async function editLivro() {
    if (!livro.id,!livro.titulo || !livro.numeroDePaginas || !livro.ISBN || !livro.editora) {
      alert('Por favor, preencha todos os campos antes de atualizar o livro.');
      return;
    }

    try {
      const {id, titulo, numeroDePaginas, ISBN, editora } = livro;
      console.log(livro); // Verifique se os dados do livro estão corretos antes de enviar a solicitação
      const response = await LivrosService.updateLivro(livroId, {
        id,
        titulo,
        numeroDePaginas,
        ISBN,
        editora
      });
      console.log(response); // Verifique a resposta do servidor
      alert('Livro atualizado com sucesso.');
    } catch (error) {
      console.error('Erro ao atualizar o livro:', error);
      alert('Erro ao atualizar o livro. Por favor, tente novamente.');
    }
  }


  useEffect(() => {
    if (livroId) {
      getLivro();
    }
  }, [livroId]);


  return (
    <>
      <Header />
      <SubmenuLivros />
      <div className='livrosCadastro'>
        <h1>Edição de Livros</h1>
        <div>
          <form id="formulario">
            <div className='form-group'>
              <label>Id</label>
              <input type="text" disabled required onChange={(event) => setLivro({ ...livro, _id: event.target.value })} value={livro._id}
              />
            </div>
            <div className='form-group'>
              <label>Titulo</label>
              <input type="text" required onChange={(event) => setLivro({ ...livro, titulo: event.target.value })} value={livro.titulo || ''} ></input>
            </div>
            <div className='form-group'>
              <label>Número de Páginas</label>
              <input type="text" required onChange={(event) => setLivro({ ...livro, numeroDePaginas: event.target.value })} value={livro.numeroDePaginas || ''}></input>
            </div>
            <div className='form-group'>
              <label>ISBN</label>
              <input type="text" required onChange={(event) => setLivro({ ...livro, ISBN: event.target.value })} value={livro.ISBN || ''}></input>
            </div>
            <div className='form-group'>
              <label>Editora</label>
              <input type="text" required onChange={(event) => setLivro({ ...livro, editora: event.target.value })} value={livro.editora || ''}></input>
            </div>
            <div className='form-group'>
              <button type="button" onClick={editLivro}>Atualizar Livro</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LivrosEdicao;
