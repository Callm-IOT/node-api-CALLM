import User from "../models/User.js";
import { errorHandler } from "./Error.js";
import { verifyAccessToken } from "../lib/token.js";

export const verifyToken = async (req, res, next) => {
    try {
        // Obtenemos el token del header Authorization
        const token = req.headers["authorization"]?.split(" ")[1];  // Asumimos que el token es enviado como "Bearer <token>"

        if (!token) {
            return res.status(401).json({ message: "Access token es requerido" });
        }

        // Verificar el token
        const decoded = verifyAccessToken(token); // La función que verifica el token

        if (!decoded) {
            return res.status(403).json({ message: "Token invalido" });
        }
        const user = await User.findById(decoded.id);

        if (user === null) {
            res.status(401).json({ message: 'Token de autenticación inválido.' })
            return
        }
        res.locals.user = user;
        next(); 
    } catch (error) {
        errorHandler(error, req, res);
    }
};