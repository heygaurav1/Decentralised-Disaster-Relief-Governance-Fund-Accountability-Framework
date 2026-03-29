"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle } from "lucide-react";

export function CreateProposalModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Still render the AnimatePresence so exit animations work, 
  // but if it's not open, we just return null inside AnimatePresence

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
                <h2 className="text-lg font-black text-slate-900">Create DAO Proposal</h2>
                <button onClick={onClose} className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors">
                  <X size={18} className="text-slate-500" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                {success ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Proposal Submitted</h3>
                    <p className="text-sm text-slate-500">Your transaction has been confirmed on Polygon zkEVM.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Action Type</label>
                      <select className="form-input" required defaultValue="">
                        <option value="" disabled>Select proposal type...</option>
                        <option value="tranche">Tranche Release</option>
                        <option value="allocation">Fund Allocation</option>
                        <option value="ngo">NGO Onboarding</option>
                        <option value="parameter">Protocol Parameter Change</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Proposal Title</label>
                      <input type="text" className="form-input w-full" placeholder="e.g., Release ₹5L for Medical Supplies" required />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Description & Justification</label>
                      <textarea className="form-input w-full min-h-[100px] resize-y" placeholder="Detail the purpose, breakdown of funds, and any IPFS artifact links..." required></textarea>
                    </div>

                    {/* Network fee notice */}
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-3 mt-4">
                      <AlertCircle className="text-amber-600 shrink-0 mt-0.5" size={16} />
                      <div className="text-xs text-amber-800 leading-relaxed">
                        <strong>Network Cost:</strong> Submitting a proposal requires ~0.0024 ETH on Polygon zkEVM. 
                        Make sure you have enough governance voting power (min 1%).
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex justify-end gap-3">
                      <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors">
                        Cancel
                      </button>
                      <button type="submit" disabled={loading} className="btn-primary px-6 py-2.5 text-sm flex items-center justify-center min-w-[140px]">
                        {loading ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          "Submit to DAO"
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
