"use strict";
/**
 * @swagger
 * tags:
 *   name: ORDERS
 *   description: Order management APIs
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     CreateOrder:
 *       type: object
 *       required:
 *         - orderProductId
 *         - orderOngkirPrice
 *       properties:
 *         orderProductId:
 *           type: number
 *           example: 12
 *         orderOngkirPrice:
 *           type: number
 *           example: 15000
 *
 *     Order:
 *       type: object
 *       properties:
 *         orderId:
 *           type: number
 *           example: 1
 *         orderProductId:
 *           type: number
 *           example: 12
 *         orderUserId:
 *           type: number
 *           example: 5
 *         orderTotalProductPrice:
 *           type: number
 *           example: 90000
 *         orderStatus:
 *           type: string
 *           example: "pending"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
/**
 * @swagger
 * /api/v1/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [ORDERS]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrder'
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: order created successfully
 *                     orderId:
 *                       type: number
 *                       example: 123
 *                     snapToken:
 *                       type: string
 *                       example: token-mt-123
 *                     redirectUrl:
 *                       type: string
 *                       example: https://app.midtrans.com/snap/...
 *       400:
 *         description: Invalid input or Midtrans error
 *       404:
 *         description: Address or product not found
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/v1/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [ORDERS]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 0
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search product name
 *       - in: query
 *         name: orderStatus
 *         schema:
 *           type: string
 *         description: Filter by order status
 *       - in: query
 *         name: pagination
 *         schema:
 *           type: string
 *           enum: [true, false]
 *     responses:
 *       200:
 *         description: List of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   example:
 *                     totalItems: 10
 *                     totalPages: 1
 *                     currentPage: 0
 *                     items:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Order'
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/v1/orders/detail/{orderId}:
 *   get:
 *     summary: Get detail order by ID
 *     tags: [ORDERS]
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/v1/orders:
 *   delete:
 *     summary: Delete an order
 *     tags: [ORDERS]
 *     parameters:
 *       - in: query
 *         name: orderId
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Order deleted successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
