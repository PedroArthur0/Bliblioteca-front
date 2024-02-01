import axios from "axios";

const BASE_URL = "https://bibliotecaback.vercel.app"

export class LivrosService{
    static getLivros(){
        return axios.get(`${BASE_URL}/livro/obter/Livros`);
    }
    

    static getLivro(_id){
        return axios.get(`${BASE_URL}/livro/obter/${_id}`);
    }
    

    static createLivro(body){
        return axios.post(`${BASE_URL}/livro/criar`,body);
    }

    static updateLivro(_id, body){
        return axios.put(`${BASE_URL}/livro/editar/${_id}`, body);
    }    

    static deleteLivro(_id){
        return axios.delete(`${BASE_URL}/livro/deletar/${_id}`);
    }
    
    
}
