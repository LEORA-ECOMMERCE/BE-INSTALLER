"use strict";
/**
 * @swagger
 * tags:
 *   name: PAYMENT METHODS
 *   description: Payment method management APIs
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     CreatePaymentMethod:
 *       type: object
 *       required:
 *         - paymentMethodType
 *       properties:
 *         paymentMethodType:
 *           type: string
 *           enum: [bank, qris]
 *           example: "bank"
 *         paymentMethodBankName:
 *           type: string
 *           example: "Bank BCA"
 *         paymentMethodBankNumber:
 *           type: string
 *           example: "1234567890"
 *         paymentMethodBankOwner:
 *           type: string
 *           example: "John Doe"
 *         paymentMethodQris:
 *           type: string
 *           example: "https://example.com/qris.png"
 *         paymentMethodDescription:
 *           type: string
 *           example: "Primary business bank account"
 *
 *     PaymentMethod:
 *       type: object
 *       required:
 *         - paymentMethodId
 *         - paymentMethodType
 *       properties:
 *         paymentMethodId:
 *           type: string
 *           example: "a45b1c23-d678-4d9f-82d3-1b2f3c4d5e6f"
 *         paymentMethodType:
 *           type: string
 *           enum: [bank, qris]
 *           example: "bank"
 *         paymentMethodBankName:
 *           type: string
 *           example: "Bank Mandiri"
 *         paymentMethodBankNumber:
 *           type: string
 *           example: "9876543210"
 *         paymentMethodBankOwner:
 *           type: string
 *           example: "Jane Doe"
 *         paymentMethodQris:
 *           type: string
 *           example: "https://example.com/qris.jpg"
 *         paymentMethodDescription:
 *           type: string
 *           example: "For customer QRIS payments"
 */
/**
 * @swagger
 * /api/v1/payment-methods:
 *   get:
 *     summary: Get all payment methods
 *     tags: [PAYMENT METHODS]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Page number
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Page size
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by bank name or owner
 *       - in: query
 *         name: pagination
 *         schema:
 *           type: string
 *           enum: [true, false]
 *         description: Enable pagination
 *     responses:
 *       200:
 *         description: List of payment methods
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PaymentMethod'
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/v1/payment-methods/detail/{paymentMethodId}:
 *   get:
 *     summary: Get payment method detail by ID
 *     tags: [PAYMENT METHODS]
 *     parameters:
 *       - name: paymentMethodId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the payment method
 *     responses:
 *       200:
 *         description: Payment method retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/PaymentMethod'
 *       404:
 *         description: Payment method not found
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/v1/payment-methods:
 *   post:
 *     summary: Create a new payment method
 *     tags: [PAYMENT METHODS]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePaymentMethod'
 *     responses:
 *       201:
 *         description: Payment method created successfully
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
 *                   example: Payment method created successfully
 *                 data:
 *                   $ref: '#/components/schemas/PaymentMethod'
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/v1/payment-methods:
 *   patch:
 *     summary: Update an existing payment method
 *     tags: [PAYMENT METHODS]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentMethod'
 *     responses:
 *       200:
 *         description: Payment method updated successfully
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
 *                   example: Payment method updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/PaymentMethod'
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Payment method not found
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/v1/payment-methods/{paymentMethodId}:
 *   delete:
 *     summary: Delete a payment method by ID
 *     tags: [PAYMENT METHODS]
 *     parameters:
 *       - name: paymentMethodId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the payment method to delete
 *     responses:
 *       200:
 *         description: Payment method deleted successfully
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
 *                   example: Payment method deleted successfully
 *       404:
 *         description: Payment method not found
 *       500:
 *         description: Server error
 */
