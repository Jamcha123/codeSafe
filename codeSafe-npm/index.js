import fs from 'fs'

const item = async (codeFileame) => {
    const file = new Promise((resolve) => {
        fs.readFile(codeFileame, "utf-8", (err, data) => {
            if(err){
                resolve(err)
            }
            resolve(data)
        })
    })
    return await file
}
console.log(await item("index.py"))