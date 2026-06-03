/**
 * @swagger
 * tags:
 *   name: Alerts
 *   description: Alertas de proximidad de buses
 */

/**
 * @swagger
 * /alerts/me:
 *   get:
 *     summary: Obtener mis alertas
 *     tags: [Alerts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de alertas del usuario
 */

/**
 * @swagger
 * /alerts:
 *   post:
 *     summary: Crear alerta de proximidad
 *     tags: [Alerts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [busId, message]
 *             properties:
 *               busId:
 *                 type: integer
 *                 example: 1
 *               message:
 *                 type: string
 *                 example: El bus está a 2 minutos
 *     responses:
 *       201:
 *         description: Alerta creada
 */

/**
 * @swagger
 * /alerts/{id}/read:
 *   patch:
 *     summary: Marcar alerta como leída
 *     tags: [Alerts]
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
 *         description: Alerta marcada como leída
 */

/**
 * @swagger
 * /alerts/{id}:
 *   delete:
 *     summary: Eliminar alerta
 *     tags: [Alerts]
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
 *         description: Alerta eliminada
 */
