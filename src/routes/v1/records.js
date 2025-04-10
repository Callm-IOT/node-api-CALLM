import { Router } from "express";
import {
  createRecord,
  deleteRecord,
  getAllRecords,
  getRecordById,
  updateRecord
} from "../../controllers/Records.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Record:
 *       type: object
 *       properties:
 *         isOpen:
 *           type: boolean
 *           description: Indica si la puerta está abierta o cerrada
 *       required:
 *         - isOpen
 *
 * tags:
 *   - name: Records
 *     description: API para los registros de la puerta
 */

const recordsRouter = Router();

/**
 * @swagger
 * /records:
 *   post:
 *     summary: Crear un nuevo registro
 *     tags: [Records]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Record'
 *     responses:
 *       201:
 *         description: Registro creado correctamente.
 *       500:
 *         description: Error al crear el registro.
 */
recordsRouter.post("/", createRecord);

/**
 * @swagger
 * /records:
 *   get:
 *     summary: Obtener todos los registros
 *     tags: [Records]
 *     responses:
 *       200:
 *         description: Lista de registros.
 *       500:
 *         description: Error al obtener los registros.
 */
recordsRouter.get("/", getAllRecords);

/**
 * @swagger
 * /records/{id}:
 *   get:
 *     summary: Obtener un registro por ID
 *     tags: [Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro a obtener.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registro encontrado.
 *       404:
 *         description: Registro no encontrado.
 *       500:
 *         description: Error al obtener el registro.
 */
recordsRouter.get("/:id", getRecordById);

/**
 * @swagger
 * /records/{id}:
 *   put:
 *     summary: Actualizar un registro por ID
 *     tags: [Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Record'
 *     responses:
 *       200:
 *         description: Registro actualizado correctamente.
 *       404:
 *         description: Registro no encontrado.
 *       500:
 *         description: Error al actualizar el registro.
 */
recordsRouter.put("/:id", updateRecord);

/**
 * @swagger
 * /records/{id}:
 *   delete:
 *     summary: Eliminar un registro por ID
 *     tags: [Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registro eliminado correctamente.
 *       404:
 *         description: Registro no encontrado.
 *       500:
 *         description: Error al eliminar el registro.
 */
recordsRouter.delete("/:id", deleteRecord);

export {
  recordsRouter
};
