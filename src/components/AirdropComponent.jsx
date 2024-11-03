import React, { useEffect, useState } from 'react'
import { BiStats } from "react-icons/bi";
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { motion } from "framer-motion";
import { Send } from './Send';
import { AirDrop } from './AirDrop';
import { Link } from 'react-router-dom';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {LAMPORTS_PER_SOL} from "@solana/web3.js"

export const AirdropComponent = () => {
    const wallet = useWallet();
    const {connection} = useConnection();
    const[balance,setBalance] = useState(0);

    async function getbalance() {
        if(wallet.publicKey){
            const bal = await connection.getBalance(wallet.publicKey);
            setBalance(bal);
        }
    }
    useEffect(()=>{
        getbalance();
    },[wallet])
    return (
        <div className='bg-black px-4 sm:px-8 py-4 min-h-screen'>
            <div className='flex justify-between items-center'>
                <Link to="/">
                    <BiStats className='w-10 h-10 sm:w-14 sm:h-14 text-white' />
                </Link>
                <div className="flex justify-end">
                    <WalletMultiButton className="text-xs sm:text-base" />
                </div>
            </div>
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 2, ease: "easeInOut" }} 
                className='flex flex-col items-center mt-8 sm:mt-10'
            >
                <div className='text-center'>
                    <h1 className='text-white font-bold text-3xl sm:text-5xl'>{balance/LAMPORTS_PER_SOL} SOL</h1>
                    <h2 className='text-slate-400 mt-2 sm:mt-3 text-sm sm:text-base font-semibold'>
                        {wallet.publicKey?`This is the balance of this ${wallet.publicKey.toBase58()} ` : "please connect to wallet"}
                    </h2>
                </div>
                <div className='flex justify-center space-x-4 sm:space-x-6 mt-5 sm:mt-7'>
                    <Send getBalance={getbalance} />
                    <AirDrop getBalance={getbalance} />
                </div>
            </motion.div>
        </div>
    );
};
