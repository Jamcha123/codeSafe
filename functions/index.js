import * as functions from 'firebase-functions'
import axios from 'axios'
import dotenv from 'dotenv'
import * as cheerio from 'cheerio'
import exec from 'child_process'
import fs from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import Client from '@azure-rest/ai-inference'
import {AzureKeyCredential} from '@azure/core-auth'

dotenv.config()

const model = "meta/Llama-4-Scout-17B-16E-Instruct"
const token = process.env["KEY"]
const endpoint ="https://models.github.ai/inference"

const client = Client(
    endpoint, 
    new AzureKeyCredential(token)
)

const scanner = async (text) => {
    const response = await client.path("/chat/completions").post({
        body: {
            model: model, 
            max_tokens: 1000, 
            top_p: 1, 
            temperature: 0, 
            messages: [
                {role: "user", content: "are there any bugs, malware or backdoors in this code " + text + " in 50 words or less, please"}
            ]
        }
    })
    return response.body.choices[0].message.content
}

export const codesafe = functions.https.onRequest({cors: true}, async (req, res) => {
    const {repo, path} = req.query
    const folder = repo.split("/")

    const items1 = new Promise((resolve) => {
        const files = fs.readdirSync(dirname(fileURLToPath(import.meta.url)), "utf-8")
        files.forEach((e) => {
            if(e == folder[folder.length-1]){
                resolve("folder exists")
            }
        })
        resolve("folder doesn't exist")
    })
    if(await items1 == "folder doesn't exist"){
        exec.execSync("git clone "+ repo)
    }
    const items2 = new Promise((resolve) => {
        fs.readFile(path, "utf-8", (err, data) => {
            if(err){
                resolve("file, not found")
            }
            resolve(data)
        })
    })

    if(await items2 == "file, not found"){
        return res.status(400).send(path + " isn't in the repo, maybe get rid of the tree/main")
    }
    const target = await scanner(await items2)

    res.status(200).send(target)
    return res.end()
})