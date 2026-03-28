const { create } = require('@web3-storage/w3up-client');
const { filesFromPaths } = require('files-from-path');
require('dotenv').config();

class IPFSService {
    constructor() {
        this.client = null;
    }

    async init() {
        try {
            // In a real environment, you'd need a delegation/proof
            // For MVP, we assume the environment is pre-configured or uses a token
            this.client = await create();
            // In modern w3up, we need to login and select a space
            // This is usually done via CLI, but for MVP we wrap the logic
            console.log("IPFS Service Initialized (Web3.Storage)");
        } catch (error) {
            console.error("Failed to initialize IPFS Service:", error);
        }
    }

    async uploadEvidence(filePath) {
        if (!this.client) await this.init();
        
        try {
            const files = await filesFromPaths([filePath]);
            const cid = await this.client.uploadDirectory(files);
            return cid.toString();
        } catch (error) {
            console.error("IPFS Upload Error:", error);
            throw error;
        }
    }

    async getEvidenceMetadata(cid) {
        // Retrieve metadata from IPFS/Web3.Storage
        return `https://${cid}.ipfs.w3s.link`;
    }
}

module.exports = new IPFSService();
