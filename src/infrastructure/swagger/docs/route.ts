/**
 * @swagger
 * tags:
 *   name: Routes
 *   description: Gestión de rutas de buses
 */

/**
 * @swagger
 * /routes:
 *   get:
 *     summary: Obtener todas las rutas
 *     tags: [Routes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de rutas
 *       401:
 *         description: No autorizado
 */

/**
 * @swagger
 * /routes/{id}:
 *   get:
 *     summary: Obtener ruta por ID
 *     tags: [Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ruta encontrada
 *       404:
 *         description: Ruta no encontrada
 */

/**
 * @swagger
 * /routes:
 *   post:
 *     summary: Crear nueva ruta
 *     tags: [Routes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, origin, destination]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ruta 1
 *               origin:
 *                 type: string
 *                 example: Centro
 *               destination:
 *                 type: string
 *                 example: Norte
 *               active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Ruta creada
 *       400:
 *         description: Datos inválidos
 */

/**
 * @swagger
 * /routes/{id}:
 *   put:
 *     summary: Actualizar ruta
 *     tags: [Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               origin:
 *                 type: string
 *               destination:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Ruta actualizada
 *       404:
 *         description: Ruta no encontrada
 */

/**
 * @swagger
 * /routes/{id}:
 *   delete:
 *     summary: Eliminar ruta
 *     tags: [Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ruta eliminada
 *       404:
 *         description: Ruta no encontrada
 */
