# Next.js [QOSIC](https://www.qosic.com/online-payment) Pay Integration Demo (WIP)

This repository demonstrates how to integrate QOSIC Pay (🇹🇬) into a Next.js 14 application. It covers the following features:

- Initiating payments via Moov Money (Flooz) and T-money.
- Handling payment confirmations through SMS or USSD.
- Receiving callbacks from QOSIC for payment status updates.

## Prerequisites

- Node.js (v18+)
- Next.js (v14)
- QOSIC API credentials (ClientID, username, password)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/gausoft/next-ts-qosic-pay.git
    cd next-ts-qosic-pay
    ```
2. Install dependencies:
    ```bash
    npm i
    ```
3. Create a `.env.local` file in the root of the project and configure your QOSIC API credentials:
    ```bash
    QOSIC_BASE_URL="https://api.qosic.net"

    QOSIC_CLIENTID="YOUR_CLIENT_ID"
    QOSIC_ACC_USERNAME="YOUR_CLIENT_USERNAME"
    QOSIC_ACC_PASSWORD="YOUR_CLIENT_PASSWORD"
    ```
4. Running the Project
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Deployment

## License
This project is licensed under the MIT License.
