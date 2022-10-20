import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

import { WagmiConfig, createClient, chain } from 'wagmi';
import { ConnectKitProvider, getDefaultClient } from 'connectkit';

const client = createClient(
  getDefaultClient({
    appName: 'My App Name',
    //infuraId: process.env.REACT_APP_INFURA_ID,
    //alchemyId:  process.env.REACT_APP_ALCHEMY_ID,
    chains: [chain.polygonMumbai, chain.polygon],
  })
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <ConnectKitProvider customTheme={{
        "--ck-accent-color": "#00D54B",
        "--ck-accent-text-color": "#ffffff",
      }}>
        <App />
      </ConnectKitProvider>
    </WagmiConfig>
  </React.StrictMode>
)
