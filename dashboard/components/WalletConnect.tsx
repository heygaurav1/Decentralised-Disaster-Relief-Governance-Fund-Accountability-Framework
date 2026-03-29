"use client";

import { Wallet, LogOut, Loader2 } from "lucide-react";
import { useState } from "react";
import { useWallet } from "../hooks/useWallet";

export function WalletConnect() {
  const { address, shortAddress, connect, disconnect, isConnecting } = useWallet();
  const [showDropdown, setShowDropdown] = useState(false);

  if (address) {
    return (
      <div className="relative">
        <button 
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-mono font-bold text-emerald-700 hover:bg-emerald-100 transition-colors cursor-pointer"
        >
          <Wallet size={13} />
          {shortAddress}
        </button>
        
        {showDropdown && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)}></div>
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg shadow-slate-200/50 py-1 z-50 overflow-hidden">
              <div className="px-4 py-2 border-b border-slate-100 bg-slate-50">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Connected Session</p>
                <p className="text-xs font-mono text-slate-900 truncate" title={address}>{address}</p>
                <div className="mt-2 text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-semibold inline-block">ERC-4337 Sponsored</div>
              </div>
              <button 
                onClick={() => { disconnect(); setShowDropdown(false); }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-semibold"
              >
                <LogOut size={14} />
                Disconnect App
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <button 
      onClick={connect}
      disabled={isConnecting}
      className="flex items-center gap-2 px-4 py-1.5 bg-blue-700 border border-blue-800 rounded-lg text-xs font-bold text-white hover:bg-blue-800 transition-colors shadow-sm disabled:opacity-70 cursor-pointer"
    >
      {isConnecting ? <Loader2 size={13} className="animate-spin" /> : <Wallet size={13} />}
      Connect Wallet
    </button>
  );
}
