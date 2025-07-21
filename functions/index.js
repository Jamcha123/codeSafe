import * as functions from 'firebase-functions'
import axios from 'axios'
import dotenv from 'dotenv'
import Client, {isUnexpected} from '@azure-rest/ai-inference'
import {AzureKeyCredential} from '@azure/core-auth'
import fs from 'fs'
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import {AzureOpenAI} from 'openai'
import admin from 'firebase-admin'
import { createHash, randomBytes } from 'crypto'

admin.initializeApp()

dotenv.config()
const apiKey = process.env["KEY"]
const endpoint ="https://james-md99ufml-westeurope.cognitiveservices.azure.com/"
const apiVersion = "2024-12-01-preview"
const modelName = "gpt-4.1";
const deployment = "gpt-4.1";
const options = { endpoint, apiKey, deployment, apiVersion }



const client = new AzureOpenAI(options)

const scanner = async (text, limit) => {
    const classes = fs.readFileSync("file.txt", "utf-8")
    const response = await client.chat.completions.create({
        model: "gpt-4.1",
        temperature: 0, 
        top_p: 1, 
        messages: [{
            role: "user", 
            content: [
                {type: "text", text: "are there any bugs, malware or backdoors in this code " + text + " in " + limit + " words or less and add a class " + classes + ", please"}, 
            ],
        }]
    })
    return response.choices[0].message["content"]
}

export const code = functions.https.onRequest({cors: true}, async (req, res) => {
    const {code, limit} = req.query

    const target = await scanner(code, limit)
    res.status(200).send(target)
    return res.end()
})

export const apiKeys = functions.https.onRequest({cors: true}, async (req, res) => {
    const {user} = req.query

    const id = (await admin.auth().getUser(user)).toJSON()

    const token = Buffer.concat([Buffer.from(id["uid"]), randomBytes(16)])
    const hashed = createHash("sha256", randomBytes(16)).update(token).digest("hex")
     
    if(((await admin.firestore().doc("tokens/keys").get()).get("api")) == null || ((await admin.firestore().doc("tokens/keys").get()).get("api")) == undefined){
        await admin.firestore().doc("tokens/keys").set({"api": [hashed]})
        await admin.firestore().doc("tokens/" + id["uid"]).set({"api": [hashed]})
    }else{
        const arr = (await admin.firestore().doc("tokens/keys").get()).get("api")
        arr.push(hashed)
        await admin.firestore().doc("tokens/keys").set({"api": arr})
        await admin.firestore().doc("tokens/" + id["uid"]).set({"api": arr})
    }
    res.status(200).json((await admin.firestore().doc("tokens/keys").get()).data())
    return res.end()
})