const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const s3Client = new S3Client({
    endpoint: process.env.ENDPONT, // Replace with your region
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY,
    },
    region: process.env.REGION, // Set your desired region here
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
        Bucket: "vercel-storage",
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