/**
 * Controlador para manejar las operaciones de autenticación.
 * @module controllers/auth.controller.js
 * @requires models
 */

import { models } from "../models/index.js";
import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs";

const login = async (req, res) => {
    try{

        const {USUARIO, CODIGO, CONTRASEÑA, RECUERDAME} = req.body;
        
        if (USUARIO == "ESTUDIANTE") {
            const user = await models.Usuario.findOne({
                where: { CODIGOU:CODIGO },
                include: [
                    {
                        model: models.TipoUsuario,
                        where: {NOMBRE: USUARIO}
                    }
                ]
            });
            // return res.json( await bcrypt.hash(user.CONTRASEÑA, 10));


            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado"});
            }

            const passwordIsValid = await bcrypt.compare(CONTRASEÑA, user.CONTRASEÑA);

            if (!passwordIsValid) {
                return res.status(401).json({ accessToken: null, message: "Contraseña incorrecta"});
            }

            const token = jwt.sign({ id: user.CODIGOU, role: USUARIO }, process.env.JWT_SECRET, {
                expiresIn: 86400,
            });

            res.cookie('accessToken', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: RECUERDAME ? (1000 * 60 * 60 * 1) : (1000 * 60 * 60 * 24 * 7),
            });

            return res.status(200).json({
                ID: user.CODIGOU,
            });            

        }
        else if (USUARIO == "PROFESOR") {
            const user = await models.Usuario.findOne({
                where: { CODIGOU:CODIGO },
                include: [
                    {
                        model: models.TipoUsuario,
                        where: {NOMBRE: USUARIO}
                    }
                ]
            });
            // return res.json(await bcrypt.hash(user.CONTRASEÑA,10));


            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado"});
            }

            const passwordIsValid = await bcrypt.compare(CONTRASEÑA, user.CONTRASEÑA);

            if (!passwordIsValid) {
                return res.status(401).json({ accessToken: null, message: "Contraseña incorrecta"});
            }

            const token = jwt.sign({ id: user.CODIGOU, role: USUARIO }, process.env.JWT_SECRET, {
                expiresIn: 86400,
            });

            res.cookie('accessToken', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: RECUERDAME ? (1000 * 60 * 60 * 1) : (1000 * 60 * 60 * 24 * 7),
            });

            return res.status(200).json({
                ID: user.CODIGOU,
            });
        }
        
        res.status(403).json({mensaje: "No se especificó un tipo de usuario"});        
    }
    catch (error) {
        res.status(500).json({ message: error.message});
    }

}

const refresh = async (req,res) => {
    try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Token inválido o expirado' });
      }

      const userId = decoded.id;

      const user = await models.Usuario.findOne({where:{CODIGOU: userId}, include: [{model: models.TipoUsuario}]});
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

    //   return res.json(user);
      const newToken = jwt.sign({ id: user.CODIGOU, role: user.TIPO_USUARIO.NOMBRE }, process.env.JWT_SECRET, {
            expiresIn: 86400,
        });

        res.cookie('accessToken', newToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });

      return res.status(200).json({
        message: 'Token refrescado',
        user: { id: user.CODIGOU }
      });
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error en el servidor', error });
  }    
}


const logout = (req, res) => {
  res.cookie('accessToken', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    expires: new Date(0)
  });

  res.status(200).json({ message: 'Sesión cerrada correctamente' });
};


export default {
    login,
    refresh,
    logout
};