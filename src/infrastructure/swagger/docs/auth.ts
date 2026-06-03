/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Registro e inicio de sesión
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, name]
 *             properties:
 *               email:
 *                 type: string
 *                 example: juan@gmail.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *               name:
 *                 type: string
 *                 example: Juan Pérez
 *     responses:
 *       201:
 *         description: Usuario creado
 *       400:
 *         description: Datos inválidos o email ya existe
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: juan@gmail.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login exitoso, devuelve token JWT
 *       401:
 *         description: Credenciales inválidas
 */

/**
 * @swagger
 * /auth/register-admin:
 *   post:
 *     summary: Registrar usuario administrador (requiere clave secreta)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, name, adminSecret]
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@bustrack.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *               name:
 *                 type: string
 *                 example: Admin BusTrack
 *               adminSecret:
 *                 type: string
 *                 example: tu_clave_secreta
 *     responses:
 *       201:
 *         description: Admin creado
 *       403:
 *         description: Clave de administrador inválida
 */
