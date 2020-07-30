const fs = require('fs');
const express = require('express');

const app = express();
const port = process.env.PORT || 8484;
const noCors = process.env.NOCORS || false;

if (!noCors) {
    cors = require('cors');
    app.use(cors());
}

function isNewRequest(req,res,next) {
    let requestDateString = req.header('If-Modified-Since');
    if (requestDateString) {
        let requestDate = new Date(requestDateString);
        if (requestDate >= serverStartDate) {
            req.notModified = true;
        }
    }
    if (!req.notModified) {
        res.append('Last-Modified', serverStartDate.toISOString());
    }
    next();
}

app.use(isNewRequest);

const noLogs = process.env.NOLOGS || false;
if (!noLogs) {
    const logger = require('morgan');
    app.use(logger(':date[iso] ":method :url :status :res[content-length] - :response-time ms"'));
}

let fontDir = `${__dirname}/_output`;

if (!fs.existsSync(fontDir)) {
    console.error(`font directory not found (${fontDir})`);
    process.exit(1);
}

let serverStartDate = new Date();


app.get('/:fontfamilies/:range', (req,res)=>{
    if (req.notModified) {
        res.status(304).send('Not Modified');
        return;
    }
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
console.log(`Font/Glyph server listening on port ${port}, cors ${noCors?'disabled':'enabled'}, logging ${noLogs?'disabled':'enabled'}`);