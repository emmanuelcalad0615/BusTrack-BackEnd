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
 * /alerts/random-location:
 *   get:
 *     summary: Generar ubicación aleatoria del usuario en Bogotá (sesgada a un bus suscrito)
 *     description: >
 *       Devuelve una coordenada aleatoria dentro de Bogotá. Si el usuario tiene
 *       suscripciones con buses posicionados, la ubicación cae cerca de uno (≈ <400 m)
 *       para que POST /alerts/proximity dispare alertas de forma fiable.
 *     tags: [Alerts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "{ ok, data: { latitude, longitude, nearBusId, strategy } }"
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

/**
 * @swagger
 * /alerts/proximity:
 *   post:
 *     summary: Detectar buses cercanos y crear alertas automáticas
 *     tags: [Alerts]
 *     security:
 *       - bearerAuth: []
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
 *                 example: 4.6951
 *               longitude:
 *                 type: number
 *                 example: -74.0452
 *               thresholdMeters:
 *                 type: number
 *                 example: 500
 *                 description: Radio de búsqueda en metros (default 500)
 *     responses:
 *       200:
 *         description: Alertas generadas para buses cercanos
 */
