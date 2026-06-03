/**
 * @swagger
 * tags:
 *   name: Buses
 *   description: Gestión de buses de la flota
 */

/**
 * @swagger
 * /buses:
 *   get:
 *     summary: Obtener todos los buses
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de buses
 *       401:
 *         description: No autorizado
 */

/**
 * @swagger
 * /buses/{id}:
 *   get:
 *     summary: Obtener bus por ID
 *     tags: [Buses]
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
 *         description: Bus encontrado
 *       404:
 *         description: Bus no encontrado
 */

/**
 * @swagger
 * /buses:
 *   post:
 *     summary: Crear nuevo bus
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [plate, model, capacity, routeId]
 *             properties:
 *               plate:
 *                 type: string
 *                 example: ABC123
 *               model:
 *                 type: string
 *                 example: Volvo 7900
 *               capacity:
 *                 type: integer
 *                 example: 40
 *               active:
 *                 type: boolean
 *                 example: true
 *               routeId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Bus creado
 *       400:
 *         description: Datos inválidos
 */

/**
 * @swagger
 * /buses/{id}:
 *   put:
 *     summary: Actualizar bus
 *     tags: [Buses]
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
 *               plate:
 *                 type: string
 *               model:
 *                 type: string
 *               capacity:
 *                 type: integer
 *               active:
 *                 type: boolean
 *               routeId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Bus actualizado
 *       404:
 *         description: Bus no encontrado
 */

/**
 * @swagger
 * /buses/{id}:
 *   delete:
 *     summary: Eliminar bus
 *     tags: [Buses]
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
 *         description: Bus eliminado
 *       404:
 *         description: Bus no encontrado
 */
