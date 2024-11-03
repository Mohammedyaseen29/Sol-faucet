import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Index } from "./components/Index"
import { AirdropComponent } from "./components/AirdropComponent"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import {WalletModalProvider, WalletMultiButton} from "@solana/wallet-adapter-react-ui"

function App() {
  return (
    <BrowserRouter>
      <ConnectionProvider endpoint={import.meta.env.VITE_RPC}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="airdrop" element={<AirdropComponent />} />
            </Routes>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </BrowserRouter>
  );
}

export default App
