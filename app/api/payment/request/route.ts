import { NextResponse } from 'next/server';

// Define interface for Order
interface Order {
    phoneNumber: string;
    amount: number;
    transRef: string;
    status: string;
}

// Simulate order data
const orders: Order[] = [];

// Function to simulate order storage
const createOrder = (orderData: Order): Order => {
    orders.push(orderData); // Add order
    return orderData; // Return the order
};

/**
 * @swagger
 * /api/payment/request:
 *   post:
 *     summary: Request a payment
 *     description: Endpoint to request a payment for items
 *     tags:
 *       - Payment
 *     operationId: requestPayment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone_number:
 *                 type: string
 *                 description: The phone number of the customer.
 *                 example: "+1234567890"
 *               items:
 *                 type: array
 *                 description: An array of items the customer wants to purchase.
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The unique identifier for the product.
 *                       example: "prod_123"
 *                     quantity:
 *                       type: integer
 *                       description: The quantity of the product to purchase.
 *                       example: 2
 *     responses:
 *       '200':
 *         description: Payment request successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Payment request successful."
 *                 orderId:
 *                   type: string
 *                   example: "order_456"
 *       '400':
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid input data."
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error."
 */
export async function POST(request: Request) {
    const payload = await request.json();

    const orderData: Order = {
        phoneNumber: payload.msisdn,
        amount: payload.amount,
        transRef: `${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`,
        status: 'pending',
    };

    // Create the order
    const order = createOrder(orderData); // Store the order

    try {
        // Replace with your actual credentials
        const username = 'your_xusername';
        const password = 'your_password';
        const base64Credentials = Buffer.from(`${username}:${password}`).toString('base64');

        // Call the payment API service
        const response = await fetch(`https://yourpaymentapi.com/requestpayment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${base64Credentials}`, // Use Basic Authentication
            },
            body: JSON.stringify(orderData),
        });

        const result = await response.json();
        console.log('response', result);

        if (!response.ok) {
            return NextResponse.json({ error: 'Payment failed' }, { status: response.status });
        }

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.log('payment error', error);

        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
