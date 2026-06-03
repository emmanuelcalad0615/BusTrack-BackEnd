/**
 * @swagger
 * tags:
 *   name: Subscriptions
 *   description: Suscripciones de usuarios a rutas frecuentes
 */

/**
 * @swagger
 * /subscriptions/me:
 *   get:
 *     summary: Obtener mis suscripciones
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de rutas suscritas
 *       401:
 *         description: No autorizado
 */

/**
 * @swagger
 * /subscriptions:
 *   post:
 *     summary: Suscribirse a una ruta
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [routeId]
 *             properties:
 *               routeId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Suscripción creada
 *       400:
 *         description: Ya estás suscrito a esta ruta
 */

/**
 * @swagger
 * /subscriptions/{id}:
 *   delete:
 *     summary: Cancelar suscripción
 *     tags: [Subscriptions]
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
 *         description: Suscripción eliminada
 *       404:
 *         description: Suscripción no encontrada
 */
