import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import './App.css'
import {motion} from 'framer-motion'
import axios from 'axios'
import $ from 'jquery'


function AddNavbar(){
  const arr = ["dashboard", "usage", "billing", "keys"]
  const items = async (id) => {
    arr.forEach((e) => {
      document.getElementById(e).style.display = "none"
    })
    document.getElementById(id).style.display = "flex"
  }
  useEffect(() => {
    document.getElementById("dashboard").style.display = "flex"
  })
  return(
    <nav className="relative w-[20%] h-[100vh] m-auto p-[0] flex flex-col align-middle justify-center text-center bg-slate-200 ">
      <ul className="relative w-[100%] h-[80%] m-auto p-[0] flex flex-col align-top justify-center text-center ">
        <div className="relative w-[100%] h-[40%] m-auto p-[0] flex flex-col align-middle justify-center text-center gap-[0px] ">
          <div className="relative w-[100%] h-[25%] m-auto p-[0] bg-slate-300 flex flex-row align-middle justify-center text-center  ">
            <motion.h1 onClick={() => items("dashboard")} initial={{scale: 1}} whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{type: "spring", duration: 1}} className="text-2xl text-black mt-[5%] underline underline-offset-2 cursor-pointer ">Dashboard</motion.h1>
          </div>
          <div className="relative w-[100%] h-[25%] m-auto p-[0] bg-slate-300 flex flex-row align-middle justify-center text-center  ">
            <motion.h1 onClick={() => items("usage")} initial={{scale: 1}} whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{type: "spring", duration: 1}} className="text-2xl text-black mt-[5%] underline underline-offset-2 cursor-pointer ">Usage</motion.h1>
          </div>
          <div className="relative w-[100%] h-[25%] m-auto p-[0] bg-slate-300 flex flex-row align-middle justify-center text-center  ">
            <motion.h1 onClick={() => items("keys")} initial={{scale: 1}} whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{type: "spring", duration: 1}} className="text-2xl text-black mt-[5%] underline underline-offset-2 cursor-pointer ">API</motion.h1>
          </div>
          <div className="relative w-[100%] h-[25%] m-auto p-[0] bg-slate-300 flex flex-row align-middle justify-center text-center  ">
            <motion.h1 onClick={() => items("billing")} initial={{scale: 1}} whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{type: "spring", duration: 1}} className="text-2xl text-black mt-[5%] underline underline-offset-2 cursor-pointer ">Billing</motion.h1>
          </div>
        </div>
        <div className="relative w-[100%] h-[60%] m-auto p-[0] flex flex-col align-middle justify-center text-center "></div>
      </ul>
      <ul className="relative w-[100%] h-[20%] m-auto p-[0] flex flex-col align-middle justify-center text-center ">

      </ul>
    </nav>
  )
}
export default function App(){
  useEffect(() => {
    const form = document.getElementById("form")
    const files = document.getElementById("files")

    const plain = document.getElementById("plain")
    const summary = document.getElementById("summary")
    
    let texts = document.createElement("h1")
    texts.classList.add("plain")
    texts.innerText = "please have patience with CodeSafe, can take some time"
    summary.appendChild(texts)

    files.addEventListener("change", async (e) => {
      e.preventDefault()
      $("#plain").empty()
      $("#summary").empty()

      const reader = new FileReader()

      reader.onload = async (event) => {
        const text = event.target.result
        
        let x = document.createElement("h1")
        x.classList.add("plain")
        x.innerText = text
        plain.appendChild(x)

        const webby = await axios("https://code-x7yqwepyeq-uc.a.run.app?code=" + text + "&limit=200")
        
        let data = document.createElement("h1")
        data.classList.add("plains")
        data.innerText = webby["data"]
        summary.appendChild(data)

      }
      reader.readAsText(new Blob([e.target.files[0]]))
    })
  })
  return(
    <div className="relative w-[100%] h-[100vh] m-auto p-[0] bg-slate-100 flex flex-row align-middle justify-center text-center ">
      <AddNavbar></AddNavbar>
      <div className="relative w-[80%] h-[100vh] m-auto p-[0] flex flex-col align-middle justify-center bg-transparent ">
        <section id="dashboard" className="relative w-[100%] h-[100vh] m-auto p-[0] hidden flex-col align-middle justify-center text-center ">
          <div className="relative w-[100%] h-[20%] m-auto p-[0] flex flex-col align-middle justify-center text-center bg-transparent ">
            <div className="relative w-[100%] h-[50%] m-auto p-[0] bg-transparent flex flex-row align-middle justify-center text-center ">
              <h1 className="text-2xl text-black" >CodeSafe Dashboard</h1>
            </div>
          </div>
          <div className="relative w-[100%] h-[10%] m-auto p-[0] flex flex-col align-middle justify-center text-center bg-transparent ">
            <div className="relative w-[100%] h-[50%] m-auto p-[0] flex flex-row align-middle justify-center text-center  ">
              <form method="get" id="form" className="relative w-[75%] m-auto p-[0] h-[100%] flex flex-row align-middle justify-center text-center ">
                <motion.label initial={{scale: 1}} whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{type: "spring", duration: 1}}  htmlFor="files" className="text-xl text-black text-center underline underline-offset-2 cursor-pointer w-[50%] h-[2em] mr-[0%] m-auto p-[0] relative ">Upload your code file here</motion.label>
                <motion.input type="file" required name="files" id="files" placeholder="Upload your code file here" initial={{scale: 1}} whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{type: "spring", duration: 1}} className="w-[50%] h-[2em] mr-[0%] m-auto p-[0] relative flex flex-row align-middle justify-center text-center underline underline-offset-2 cursor-pointer text-xl text-black " />
              </form>
              <form className="relative w-[25%] m-auto p-[0] h-[100%] flex flex-col align-middle justify-center text-center ">
                
              </form>
            </div>
          </div>
          <div className="relative w-[100%] h-[70%] m-auto p-[0] flex flex-col md:flex-row align-middle justify-center text-center bg-transparent ">
            <div id="plain" className="relative w-[100%] md:w-[50%] h-[50%] md:h-[75%] m-auto p-[0] flex flex-col align-middle justify-center text-center overflow-y-scroll bg-transparent "></div>
            <div id="summary" className="relative w-[100%] md:w-[50%] h-[50%] md:h-[75%] m-auto p-[0] flex flex-col align-middle justify-center text-center overflow-y-scroll bg-transparent "></div>
          </div>
        </section>
        <section id="usage" className="relative w-[100%] h-[100vh] m-auto p-[0] hidden flex-col align-middle justify-center text-center "></section>
        <section id="keys" className="relative w-[100%] h-[100vh] m-auto p-[0] hidden flex-col align-middle justify-center text-center "></section>
        <section id="billing" className="relative w-[100%] h-[100vh] m-auto p-[0] hidden flex-col align-middle justify-center text-center "></section>
      </div>
    </div>
  )
}