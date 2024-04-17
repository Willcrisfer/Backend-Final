import { Request, Response } from 'express';
import Movie from '../models/MovieModel.js';
import MovieModel from '../models/MovieModel.js';

class MovieController {

  // Método para criar um novo filme
  async createMovie(req: Request, res: Response) {
    try {

      const { title } = req.body;
      const movieFound = await MovieModel.findOne({ title });

      // Verifica se o filme já existe
      if (movieFound) { 
        return res.status(400).json({ error: 'Movie already exists.' }); 
      }

      // Cria um novo objeto Movie com os dados do corpo da requisição
      const movie = new Movie(req.body);
      // Salva o filme no banco de dados
      await movie.save();
      // Retorna uma resposta de sucesso com o filme criado
      return res.status(201).send(movie);
    } catch (error) {
      // Retorna uma resposta de erro em caso de falha na criação do filme
      return res.status(400).send(error);
    }
  };

  // Método para obter todos os filmes
  async getAllMovies(req: Request, res: Response) {
    try {
      // Busca todos os filmes no banco de dados
      const movies = await Movie.find({});
      // Retorna uma resposta com os filmes encontrados
      return res.status(200).send(movies);
    } catch (error) {
      // Retorna uma resposta de erro em caso de falha na busca dos filmes
      return res.status(400).send(error);
    }
  };

  // Método para atualizar um filme existente
  async updateMovie(req: Request, res: Response) {
    try {
      // Extrai o ID do filme dos parâmetros da requisição
      const { id } = req.params;
      // Procura e atualiza o filme pelo ID com os dados do corpo da requisição
      const movie = await Movie.findByIdAndUpdate(id, req.body, { new: true });

      // Verifica se o filme foi encontrado e atualizado com sucesso
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }

      // Retorna uma resposta de sucesso com o filme atualizado
      return res.status(200).json(movie);
    } catch (error) {
      // Retorna uma resposta de erro em caso de falha na atualização do filme
      return res.status(400).json({ message: 'Error updating movie', error });
    }
  };

  // Método para excluir um filme existente
  async deleteMovie(req: Request, res: Response) {
    try {
      // Extrai o ID do filme dos parâmetros da requisição
      const { id } = req.params;
      // Procura e deleta o filme pelo ID
      const movie = await Movie.findOneAndDelete({ _id: id });

      // Verifica se o filme foi encontrado e excluído com sucesso
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }

      // Retorna uma resposta de sucesso indicando que o filme foi excluído com sucesso
      return res.status(200).json({ message: 'Movie successfully deleted' });
    } catch (error) {
      // Retorna uma resposta de erro em caso de falha na exclusão do filme
      return res.status(400).json({ message: 'Error deleting movie', error });
    }
  };

  // Método para pesquisar filmes por título, ano ou gênero
  async searchMovies(req: Request, res: Response) {
    try {
      // Extrai os parâmetros de pesquisa, página e limite da requisição
      const { search, page = 1, limit = 10 } = req.query as any;
      const { year, genres, title } = req.query;
  
      // Define a expressão regular para pesquisa
      const regex = {
        $regex: search,
        $options: 'i'
      };
  
      // Cria um objeto de filtro para a consulta
      const filter: any = {
        $or: [
          { title: regex },
          { genres: regex }
        ]
      };
  
      // Adiciona a condição de ano à consulta, se fornecido
      // if (year) {
      //   filter.year = year;
      // }
      
      // Adiciona a condição de gênero ao filtro, se fornecido
      if (genres) {
        filter.genres = genres;
      }

      // Adiciona a condição de tiulo ao filtro, se fornecido
      if (title) {
        filter.title = title;
      }
      // Busca filmes que correspondam aos critérios de pesquisa
      const movies = await MovieModel
        .find(filter)
        .skip((page - 1) * limit)
        .limit(limit);
  
      // Retorna uma resposta com os filmes encontrados
      return res.status(200).json(movies);
    } catch (error) {
      // Retorna uma resposta de erro em caso de falha na pesquisa de filmes
      return res.status(500).json({ error: 'Internal Server Error.' });
    }
  }
  
}

export default new MovieController;
