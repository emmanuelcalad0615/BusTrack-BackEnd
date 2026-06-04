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
 *     summary: Obtener rutas (paginadas + filtros)
 *     tags: [Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *         description: Número de página
 *       - in: query
 *         name: pageSize
 *         schema: { type: integer, default: 10, maximum: 100 }
 *         description: Tamaño de página
 *       - in: query
 *         name: q
 *         schema: { type: string }
 *         description: Búsqueda en nombre, origen o destino
 *       - in: query
 *         name: active
 *         schema: { type: boolean }
 *         description: Filtra por rutas activas/inactivas
 *     responses:
 *       200:
 *         description: "Lista paginada: { ok, data, total, page, limit }"
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
