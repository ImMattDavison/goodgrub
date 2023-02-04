import { Client } from "@hashgraph/sdk";

if(!process.env.NEXT_PUBLIC_HEDERA_ACCOUNT_ID || !process.env.NEXT_PUBLIC_HEDERA_PUBLIC_KEY) {
    throw new Error("Missing Hedera Account ID or Public Key");
}

const client = Client.forTestnet();
client.setOperator(process.env.NEXT_PUBLIC_HEDERA_ACCOUNT_ID, process.env.NEXT_PUBLIC_HEDERA_PUBLIC_KEY);