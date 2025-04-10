import { Router } from "express";

import { verifyToken } from "../../middlewares/Token.js";
import { verifyAdminUser } from "../../middlewares/Acl.js";
import { upload } from "../../middlewares/Uploads.js";
import { createNotification, deleteNotification, getAllUserNotifications, markAsRead } from "../../controllers/Notifications.js";

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Endpoints for managing notifications
 */

const notificationsRouter = new Router();

/**
 * @swagger
 * /api/v1/notifications/:
 *   get:
 *     summary: Obtener todas las notificaciones del usuario autenticado (solo Admin)
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de notificaciones del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID de la notificación
 *                   userId:
 *                     type: string
 *                     description: ID del usuario
 *                   description:
 *                     type: string
 *                     description: Descripción de la notificación
 *                   isRead:
 *                     type: boolean
 *                     description: Estado de lectura
 *                   imageUrl:
 *                     type: string
 *                     description: URL de la imagen relacionada
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de creación
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de última actualización
 *       403:
 *         description: Prohibido. Solo los administradores pueden acceder.
 *       404:
 *         description: No se encontraron notificaciones para el usuario.
 *       500:
 *         description: Error interno del servidor.
 */
notificationsRouter.get("/", verifyToken, verifyAdminUser, getAllUserNotifications);

/**
 * @swagger
 * /api/v1/notifications/create:
 *   post:
 *     summary: Crear una nueva notificación con imagen
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - description
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID del usuario al que va dirigida la notificación
 *               description:
 *                 type: string
 *                 description: Descripción de la notificación
 *               imagen:
 *                 type: string
 *                 format: binary
 *                 description: Imagen relacionada con la notificación (Opcional)
 *     responses:
 *       201:
 *         description: Notificación creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID de la notificación
 *                 userId:
 *                   type: string
 *                 description:
 *                   type: string
 *                 imageUrl:
 *                   type: string
 *                   description: URL de la imagen subido
 *                 isRead:
 *                   type: boolean
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Datos faltantes o inválidos
 *       500:
 *         description: Error interno del servidor
 */
notificationsRouter.post("/create", upload.single('imagen'), createNotification);

/**
 * @swagger
 * /api/v1/notifications/read/{id}:
 *   patch:
 *     summary: Marcar una notificación como leída
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la notificación a marcar como leída
 *     responses:
 *       200:
 *         description: Notificación marcada como leída correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 description:
 *                   type: string
 *                 imageUrl:
 *                   type: string
 *                 isRead:
 *                   type: boolean
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: ID inválido o malformado
 *       404:
 *         description: Notificación no encontrada
 *       500:
 *         description: Error interno del servidor
 */
notificationsRouter.patch("/read/:id", verifyToken, markAsRead);

/**
 * @swagger
 * /api/v1/notifications/{id}:
 *   delete:
 *     summary: Eliminar una notificación por ID
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la notificación a eliminar
 *     responses:
 *       200:
 *         description: Notificación eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Notificación eliminada exitosamente
 *       400:
 *         description: ID inválido o malformado
 *       404:
 *         description: Notificación no encontrada
 *       500:
 *         description: Error interno del servidor
 */
notificationsRouter.delete("/:id", verifyToken, deleteNotification);

export {
    notificationsRouter
};
