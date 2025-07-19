import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import './App.css'
import {motion} from 'framer-motion'
import axios from 'axios'


export default function App(){
  return(
    <div className="relative w-[100%] h-[100vh] m-auto p-[0] bg-slate-200 flex flex-col align-middle justify-center text-center ">
      <div className="relative w-[100%] h-[50%] m-auto p-[0] flex flex-row align-middle justify-center text-center gap-[20px] ">
        <div className="relative w-[40em] h-[20em] m-auto p-[0] flex flex-col align-middle justify-center text-center bg-slate-600 rounded-md ">
          
        </div>
        <div className="relative w-[40em] h-[20em] m-auto p-[0] flex flex-col align-middle justify-center text-center bg-slate-600 rounded-md ">

        </div>
      </div>
      <div className="relative w-[100%] h-[50%] m-auto p-[0] flex flex-row align-middle justify-center text-center ">

      </div>
    </div>
  )
}