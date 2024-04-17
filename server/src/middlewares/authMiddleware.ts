import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();


export function checkRoles(roles: string[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    // Extrai o token de autorização do cabeçalho da requisição
    const token = req.headers.authorization?.split(' ')[1];

    // Verifica se o token está presente na requisição
    if (!token) {
      // Retorna uma resposta de erro 401 se o token não estiver presente
      return res.status(401).json({ error: "Unauthorized. No token provided!" })
    }
    
    try {
      // Decodifica o token e obtém as informações do payload
      const payload: any = jwt.verify(token, String(process.env.SECRET_KEY))

      // Verifica se o papel (role) do usuário está incluído nos papéis permitidos
      if (!roles.includes(payload.role)) {
        // Retorna uma resposta de erro 403 se o usuário não tiver as permissões adequadas
        return res.status(403).json(
          { error: "Forbidden access. User doesn't have the required role." })
      }

    } catch (error) {
      // Retorna uma resposta de erro 500 em caso de erro interno
      return res.status(500).json({ error: "Internal server error." })
    }

    // Chama o próximo middleware na cadeia de middlewares
    next();
  }
}
