const express = require('express');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');
dotenv.config();

const s3Client = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY,
    },
});

const app = express();

app.use(express.json());

app.get('/*', async (req: any, res: any) => {

    //Extracting the id from the subdomain of the website.
    const host = req.hostname;
    const id = host.split('.')[0];
    const fpath = req.path;

    // Define parameters for getting the object
    const params = {
        Bucket: "vercel",
        Key: `dist/${id}${fpath}` //file path in the vercel
    };

    // Execute the command to get the object
    try {
        const contents = await s3Client.send(new GetObjectCommand(params));
        console.log(contents); // This will contain the response from the GetObject API call

        const type = fpath.endsWith("html") ? "text/html" : fpath.endsWith("css") ? "text/css" : "application/javascript"
        res.set("Content-Type", type);

        res.send(contents.Body);

    } 
    catch (error) 
    {
        console.error("Error getting object:", error);
    }
})

app.listen(process.env.PORT, () => {
    console.log("Handler Server Started At : ", process.env.PORT);
})