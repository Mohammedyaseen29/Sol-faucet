import React, { useState } from 'react';
import { Buffer } from "buffer";
import { Dialog, DialogContent, DialogClose, DialogTrigger, DialogTitle, DialogDescription } from './ui/dialog';
import { GoArrowUpRight } from "react-icons/go";
import toast, { Toaster } from 'react-hot-toast';
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export const Send = () => {
    const [open, setOpen] = useState(false);
    const [address, setAddress] = useState("");
    const [amount, setAmount] = useState(1);
    const wallet = useWallet();
    const { connection } = useConnection();

    async function sendTransaction() {
        try {
            const transaction = new Transaction();
            transaction.add(SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey: new PublicKey(address),
                lamports: amount * LAMPORTS_PER_SOL
            }));

            const signature = await wallet.sendTransaction(transaction, connection)
            toast.success(`Successfully sent SOL to ${address}`);
            setOpen(false);
            setAddress("");
            setAmount(0);
            getBalance();
        } catch (error) {
            toast.error("Transaction failed: " + error.message);
        }
    }

    return (
        <div>
            <Toaster />
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <button onClick={() => setOpen(true)}>
                        <GoArrowUpRight className='text-white bg-indigo-800 w-20 h-20 p-4 rounded-full hover:scale-95 font-bold'/>
                    </button>
                </DialogTrigger>
                <DialogContent className="px-6 py-3">
                    <DialogTitle className="text-center text-2xl text-black font-semibold">Send a SOL Transaction</DialogTitle>
                    <DialogDescription className="text-black text-center">Transfer SOL tokens to any Solana wallet address</DialogDescription>
                    <div className='mt-5'>
                        <input onChange={(e) => setAddress(e.target.value)} value={address} className='p-2 border-2 border-indigo-800 bg-white rounded-lg w-full focus:outline-none' placeholder='Enter the public address' />
                        <input onChange={(e) => setAmount(Number(e.target.value))} value={amount} className='p-2 mt-2 border-2 border-indigo-800 bg-white rounded-lg w-full focus:outline-none' placeholder='Enter the amount of SOL' />
                        <div className='flex justify-end mt-5'>
                            <button onClick={sendTransaction} className='bg-indigo-800 text-white font-bold px-4 py-2 rounded-md hover:scale-95'>Send</button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};
