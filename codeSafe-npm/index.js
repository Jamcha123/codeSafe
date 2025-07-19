import axios from 'axios'
import fs from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'


export default class codesafe{
    async code_scanner(code_file, limit){
        const files = fs.readdirSync(dirname(fileURLToPath(import.meta.url)), "utf-8")
        for(let i = 0; i != files.length; i++){
            if(files[i] == code_file){
                const file = fs.readFileSync(code_file, "utf-8")
                const link = "https://code-x7yqwepyeq-uc.a.run.app?code=" + file + "&limit=" + limit
                return (await axios.get(link))["data"]
            }
        }
        throw new Error(code_file + ", not found in dictionary")
    }
}