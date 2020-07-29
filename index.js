const fs = require('fs');
const express = require('express');

const app = express();
const port = process.env.PORT || 8484;
const noCors = process.env.NOCORS || false;

if (!noCors) {
    cors = require('cors');
    app.use(cors());
}

let fontDir = `${__dirname}/_output`;

if (!fs.existsSync(fontDir)) {
    console.error(`font directory not found (${fontDir})`);
    process.exit(1);
}

app.get('/:fontfamilies/:range', (req,res)=>{
    let fontFamilies = req.params.fontfamilies.split(',');
    let range = req.params.range;
    let found = false;
    for (let fontFamily of fontFamilies) {
        if (fs.existsSync(`${fontDir}/${fontFamily}`)) {
            let filename = `${fontDir}/${fontFamily}/${range}`;
            if (fs.existsSync(filename)) {
                res.setHeader('Content-Type', 'application/x-protobuf');
                fs.createReadStream(filename).pipe(res);
                found = true;
                break;
            }
        }
    }
    if (!found) {
        res.status(404).send('File not found');
    }
})

app.listen(port);
console.log(`Font/Glyph server listening on port ${port}, cors ${noCors?'disabled':'enabled'}`);