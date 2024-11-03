import React from 'react'
import Spline from "@splinetool/react-spline";
import { BiStats } from "react-icons/bi";
import { AirdropComponent } from './AirdropComponent';
import { easeInOut, motion } from "framer-motion";
import { Link } from 'react-router-dom';

export const Home = () => {
    return (
        <div className="bg-black px-8 py-4 min-h-screen">
            <div>
                <BiStats className='w-14 h-14 text-white' />
            </div>
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 2, ease: easeInOut }} 
                className="mt-20 flex flex-col lg:flex-row items-center gap-10"
            >
                <div className="text-center lg:text-left">
                    <h1 className="text-4xl lg:text-7xl text-slate-300 font-bold">Solana Faucet.</h1>
                    <h1 className="text-3xl lg:text-6xl text-slate-300">Your Free Solana Token Source</h1>
                    <h1 className="text-lg lg:text-xl font-extralight mt-2 text-slate-300">
                        Get Free SOL Tokens for Testing and Development
                    </h1>
                    <Link to="airdrop">
                        <button className="bg-white rounded px-4 py-2 text-black font-semibold mt-5 hover:scale-95 transition">
                            AirDrop Your Sol
                        </button>
                    </Link>
                </div>
                <div className="w-full lg:w-1/2 h-64 lg:h-auto">
                    <Spline scene="https://prod.spline.design/xs9bJ-Et9TgFs-DW/scene.splinecode" />
                </div>
            </motion.div>
        </div>
    );
}
