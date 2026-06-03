/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: Ubicación GPS de buses en tiempo real
 */

/**
 * @swagger
 * /locations/{busId}:
 *   get:
 *     summary: Obtener última ubicación de un bus
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: busId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ubicación del bus
 *       404:
 *         description: Ubicación no encontrada
 */

/**
 * @swagger
 * /locations/{busId}:
 *   post:
 *     summary: Actualizar ubicación de un bus (upsert)
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: busId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [latitude, longitude]
 *             properties:
 *               latitude:
 *                 type: number
 *                 example: 4.7110
 *               longitude:
 *                 type: number
 *                 example: -74.0721
 *     responses:
 *       200:
 *         description: Ubicación actualizada
 */

/**
 * @swagger
 * /locations/{busId}/simulate:
 *   post:
 *     summary: Simular posición GPS del bus (genera coordenadas aleatorias en Bogotá)
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: busId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ubicación simulada y guardada
 */
