import dotenv from 'dotenv';
import { SolanaConsolidationAgent } from './agent';
import { WalletConfig } from './types';
import * as fs from 'fs';

dotenv.config();

async function main() {
  const agent = new SolanaConsolidationAgent(process.env.SOLANA_RPC_URL!);
  
  try {
    const wallets: WalletConfig[] = JSON.parse(
      fs.readFileSync(process.env.WALLETS_CONFIG_PATH!, 'utf-8')
    );

    for (let i = 0; i < wallets.length - 1; i++) {
      console.log(`Processing wallet ${i + 1}/${wallets.length}`);
      await agent.processWallet(wallets[i], wallets[i + 1].publicKey);
    }

    console.log('Token consolidation complete');
  } catch (error) {
    console.error('Error during consolidation:', error);
    process.exit(1);
  }
}

main();