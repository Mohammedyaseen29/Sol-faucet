import React, { useState } from 'react'
import { Dialog,DialogContent,DialogTrigger,DialogTitle,DialogDescription } from './ui/dialog'

import { MdOutlineWifiTethering } from "react-icons/md";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {LAMPORTS_PER_SOL} from "@solana/web3.js"
import toast, { Toaster } from "react-hot-toast";
export const AirDrop = ({getBalance}) => {
    const [open,setOpen] = useState(false);
    const [amount,setamount] = useState(1);
    const wallet = useWallet();
    const {connection} = useConnection();
    

    async function  RequestAirdrop() {
        try {
            await connection.requestAirdrop(wallet.publicKey,amount*LAMPORTS_PER_SOL);
            toast.success("Airdropped " + amount + " SOL")
            setOpen(false);
            setamount(1);
            getBalance();
        } catch (error) {
            toast.error("Airdrop failed" + error.message);
        }
    }
    return (
        <div>
            <Toaster/>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <button onClick={()=>setOpen(true)}>
                        <MdOutlineWifiTethering className='text-white bg-indigo-800 w-20 h-20 p-4 rounded-full hover:scale-95 font-bold'/>
                    </button>
                </DialogTrigger>
                <DialogContent className="px-6 py-3">
                    <DialogTitle className="text-center text-2xl text-black font-semibold">Claim Your Free SOL Airdrop</DialogTitle>
                    <DialogDescription className="text-black text-center">Request a small amount of cryptocurrency to test the network and develop dApps</DialogDescription>
                    <div className='mt-5'>
                        <input className='p-2 bg-white rounded-lg w-full' placeholder='Enter Sol to airdrop' onChange={(e)=>setamount(e.target.value)} value={amount}/>
                        <div className='flex justify-end mt-5'>
                            <button onClick={RequestAirdrop} className='bg-indigo-800 text-white font-bold px-4 py-2 rounded-md hover:scale-95'>Airdrop</button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
