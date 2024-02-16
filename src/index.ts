const express = require('express');
const {S3Client} = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.json());

app.get('/*', async(req : any, res : any) => {

    //extracting the id from the subdomain of the website.
    const host = req.hostname;
    const id = host.split('.')[0];
})

app.listen(process.env.PORT, () => {
    console.log("Handler Server Started At : ", process.env.PORT);
})