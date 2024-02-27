"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
app.get('/*', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const contents = yield s3Client.send(new GetObjectCommand(params));
        console.log(contents); // This will contain the response from the GetObject API call
        const type = fpath.endsWith("html") ? "text/html" : fpath.endsWith("css") ? "text/css" : "application/javascript";
        res.set("Content-Type", type);
        res.send(contents.Body);
    }
    catch (error) {
        console.error("Error getting object:", error);
    }
}));
app.listen(process.env.PORT, () => {
    console.log("Handler Server Started At : ", process.env.PORT);
});
