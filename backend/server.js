const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { ethers } = require('ethers');
const Redis = require('redis');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
const redisClient = Redis.createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });

const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Contract Config (Placeholder addresses)
const RPC_URL = process.env.POLYGON_ZKEVM_RPC || "https://zkevm-rpc.com";
const provider = new ethers.JsonRpcProvider(RPC_URL);

// Abi fragments (Simplified)
const CUSTODY_ABI = [
    "event TrancheProposed(uint256 indexed id, uint256 amount, address indexed beneficiary)",
    "event FundsReleased(uint256 indexed id, uint256 amount, address indexed beneficiary)"
];

const ORACLE_ABI = [
    "event ProofSubmitted(bytes32 indexed proofId, string ipfsCid, int256 lat, int256 lon)",
    "event ProofVerified(bytes32 indexed proofId, bool status)"
];

async function startServer() {
    await redisClient.connect().catch(err => console.error("Redis Connection Failed:", err));

    const custodyContract = new ethers.Contract(process.env.RELIEF_CUSTODY_ADDRESS || ethers.ZeroAddress, CUSTODY_ABI, provider);
    const oracleContract = new ethers.Contract(process.env.RELIEF_ORACLE_ADDRESS || ethers.ZeroAddress, ORACLE_ABI, provider);

    // Event Listeners
    custodyContract.on("TrancheProposed", (id, amount, beneficiary) => {
        const eventData = { type: 'TRANCHE_PROPOSED', id: id.toString(), amount: ethers.formatUnits(amount, 6), beneficiary };
        io.emit('RELIEF_EVENT', eventData);
        redisClient.set(`event:${id}`, JSON.stringify(eventData));
    });

    custodyContract.on("FundsReleased", (id, amount, beneficiary) => {
        const eventData = { type: 'FUNDS_RELEASED', id: id.toString(), amount: ethers.formatUnits(amount, 6), beneficiary };
        io.emit('RELIEF_EVENT', eventData);
        redisClient.lPush('capital_flow', JSON.stringify(eventData));
    });

    oracleContract.on("ProofVerified", (proofId, status) => {
        io.emit('RELIEF_EVENT', { type: 'PROOF_VERIFIED', proofId, status });
    });

    // API Routes
    app.get('/api/stats', async (req, res) => {
        const capitalFlow = await redisClient.lRange('capital_flow', 0, 10);
        res.json({ capitalFlow: capitalFlow.map(JSON.parse) });
    });

    app.post('/api/proofs/verify', async (req, res) => {
        // Business logic for backend verification or signature generation
        res.json({ message: "Verification request received" });
    });

    server.listen(PORT, () => {
        console.log(`Sahayog Backend listening on port ${PORT}`);
    });
}

startServer();
