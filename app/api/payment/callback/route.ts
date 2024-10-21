import { NextResponse } from 'next/server';

// Mock database as an example (replace with your database solution)
let payments = [
  { transRef: '12345', status: 'pending', serviceRef: null, amount: 0 }
];
/**
 * @swagger
 * /api/payment/confirmation:
 *   post:
 *     summary: Handle payment confirmation from QOSIC aggregator.
 *     description: This endpoint processes the payment confirmation received from QOSIC after a client confirms a payment.
 *     tags:
 *       - Payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: Payment status (SUCCESSFUL, FAILED, etc.).
 *                 example: SUCCESSFUL
 *               transRef:
 *                 type: string
 *                 description: Unique transaction reference.
 *                 example: 12345ABCDEF
 *               amount:
 *                 type: string
 *                 description: Payment amount.
 *                 example: "1500"
 *               serviceRef:
 *                 type: string
 *                 description: Service reference for the transaction.
 *                 example: 98765ZYXWVU
 *     responses:
 *       200:
 *         description: Payment confirmation successfully processed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Confirmation received successfully.
 *       500:
 *         description: Internal server error while processing the confirmation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error processing confirmation.
 */
export async function POST(request: Request) {
  try {
    const payload = await request.json()

    // Extract necessary fields from payload
    const { status, transRef, amount, serviceRef } = payload;

    // Find the payment record by transRef
    const payment = payments.find(p => p.transRef === transRef);

    if (!payment) {
      return NextResponse.json({ message: 'Transaction not found.' }, { status: 404 });
    }

    // Update payment status based on confirmation
    if (status === 'SUCCESSFUL') {
      payment.status = 'completed';
      payment.serviceRef = serviceRef;
      payment.amount = parseFloat(amount);
    } else {
      payment.status = 'failed';
    }

    return NextResponse.json({ message: 'Confirmation received successfully.' });
  } catch (error) {
    return NextResponse.json({ message: 'Error processing confirmation.' }, { status: 500 });
  }
}
