/**
 * @swagger
 * tags:
 *   name: Sync
 *   description: Sincronización de datos desde OpenStreetMap
 */

/**
 * @swagger
 * /sync/routes:
 *   get:
 *     summary: Sincronizar rutas desde OpenStreetMap
 *     tags: [Sync]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: operator
 *         schema:
 *           type: string
 *           default: Transmilenio
 *         description: Nombre del operador de buses a sincronizar
 *     responses:
 *       200:
 *         description: Sincronización completada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     synced:
 *                       type: integer
 *                       description: Rutas guardadas exitosamente
 *                     failed:
 *                       type: integer
 *                       description: Rutas que fallaron
 *       401:
 *         description: No autorizado
 */

/**
 * @swagger
 * /sync/buses:
 *   post:
 *     summary: Generar buses ficticios para las rutas existentes en DB
 *     tags: [Sync]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: busesPerRoute
 *         schema:
 *           type: integer
 *           default: 2
 *         description: Cantidad de buses a crear por ruta
 *     responses:
 *       200:
 *         description: Buses creados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     created:
 *                       type: integer
 *                     failed:
 *                       type: integer
 *       401:
 *         description: No autorizado
 */
