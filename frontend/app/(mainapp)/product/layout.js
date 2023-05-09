"use client";

import { ConnectKitProvider } from "connectkit";
import { NotificationProvider } from "web3uikit";
import { WagmiConfig } from "wagmi";
import { client } from "../../../utils/wagmi";
import { Inter } from "next/font/google";
import "../../../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function AppLayout({ children }) {
  return (
    <html>
      <head />
      <body className={inter.className}>
        <WagmiConfig client={client}>
          <ConnectKitProvider>
            <NotificationProvider>{children}</NotificationProvider>
          </ConnectKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
