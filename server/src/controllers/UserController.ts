import { validationResult } from "express-validator";
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import UserModel from "../models/UserModel.js";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

class UserController {

  async register(req: Request, res: Response) {
    try {
      const { name, email, password, role } = req.body;
      const foundUser = await UserModel.findOne({ email });
  
      // Validação dos dados de entrada
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
  
      // Se o usuário já existe, retorna um erro
      if (foundUser) { 
        return res.status(400).json({ error: 'Email has already been registered before.' }); 
      }
  
      // Cria um novo usuário com a senha hasheada
      const newUser = new UserModel({
        name,
        email,
        password: bcrypt.hashSync(password.trim(), 7),
        role
      });
  
      // Salva o novo usuário no banco de dados
      await newUser.save();
  
      // Cria o token de autenticação com as informações do usuário
      const payload = {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      }
      const token = jwt.sign(payload, String(SECRET_KEY));
  
      // Retorna a resposta com o usuário e o token de acesso
      return res.status(201).json({ user: newUser});
    } catch (error) {
      // Em caso de erro interno, retorna um erro 500
      return res.status(500).json({ error: 'Internal Server Error no register' });
    }
  };
  

  async login(req: Request, res: Response) {
    try {
      // Verifica se há erros de validação nos dados de entrada
      const errors = validationResult(req);
      
      if (!errors.isEmpty()) {
        // Retorna uma resposta com os erros de validação, se houverem
        return res.status(422).json({ errors: errors.array() });
      }
      
      // Extrai o email e a senha do corpo da requisição
      const { email, password } = req.body;

      // Busca no banco de dados por um usuário com o email fornecido
      const foundUser = await UserModel.findOne({ email });
      
      // Verifica se o usuário foi encontrado
      if (!foundUser) {
        // Retorna uma resposta indicando que o usuário não foi encontrado
        return res.status(404).json({ error: 'User not found.' });
      }

      // Verifica se a senha fornecida corresponde à senha armazenada no banco de dados
      if (!bcrypt.compareSync(password, foundUser.password)) {
        // Retorna uma resposta indicando que a senha é inválida
        return res.status(400).json({ error: 'Invalid password.' });
      }

      // Cria um payload com informações do usuário para gerar o token de autenticação
      const payload = {
        id: foundUser._id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role
      }

      // Remove a senha do usuário da resposta
      foundUser.password = "";

      // Gera um token de autenticação com base no payload e na chave secreta
      const token = jwt.sign(payload, String(SECRET_KEY));

      // Retorna uma resposta com o usuário encontrado e o token de acesso
      return res.json({ user: foundUser, accessToken: token });
    } catch (error) {
      // Em caso de erro interno, retorna uma resposta de erro 500
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };



    async getAllUsers(req: Request, res: Response) {
      try {
        // Encontra todos os usuários no banco de dados
        const users = await UserModel.find();
        
        // Retorna uma resposta com os usuários encontrados
        return res.json(users);
      } catch (error) {
        // Em caso de erro durante o processo, retorna uma resposta de erro 500
        return res.status(500).json({ error: 'Internal Server Error.' });
      }
  };
  
  
  async updateUser(req: Request, res: Response) {
    try {
      // Verifica se houve erros de validação nos dados da requisição
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      // Extrai o ID do usuário da requisição
      const userId = req.params.id;

      // Busca o usuário no banco de dados pelo ID
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      // Atualiza os campos do usuário com os dados da requisição
      const { password, role, name, email } = req.body;
      if (email) {
        user.email = email;
      }
      if (password) {
        // Encripta a nova senha antes de salva-la no banco de dados
        user.password = bcrypt.hashSync(password.trim(), 7);
      }
      if (role) {
        user.role = role;
      }
      if (name) {
        user.name = name;
      }
      
      // Salva as alterações no banco de dados
      await user.save();

      // Retorna a resposta com o usuário atualizado
      return res.json({ message: 'User updated successfully.', user });
    } catch (error) {
      // Em caso de erro interno, retorna um erro 500
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }



  async deleteUser(req: Request, res: Response) {
    try {
      // Extrai o ID do usuário dos parâmetros da solicitação
      const userId = req.params.id;
      
      // Procura e deleta o usuário pelo ID
      const deletedUser: any = await UserModel.findByIdAndDelete(userId);

      // Verifica se o usuário foi encontrado e excluído com sucesso
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found.' });
      }

      // Deleta o usuário novamente para garantir que seja removido completamente
      await deletedUser.deleteOne()

      // Retorna uma resposta de sucesso indicando que o usuário foi excluído com sucesso
      return res.json({ message: "User deleted successfully!" });
    } catch (error) {
      // Em caso de erro durante o processo, retorna uma resposta de erro 500
      return res.status(500).json({ error: 'Internal Server Error.' });
    }
};
;
  

}

export default new UserController;