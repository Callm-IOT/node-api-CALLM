import { userRole } from "../models/User.js"

export const verifyAdminUser = (req, res, next) => {
    const { role } = res.locals.user
    if (role !== userRole.Admin) {
      res.status(401).json({
        message: 'No tienes suficientes permisos para realizar esta acción.'
      })
      return
    }
    next()
  }
  