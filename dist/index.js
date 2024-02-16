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
const { S3Client } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(express.json());
app.get('/*', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //extracting the id from the subdomain of the website.
    const host = req.hostname;
    const id = host.split('.')[0];
}));
app.listen(process.env.PORT, () => {
    console.log("Handler Server Started At : ", process.env.PORT);
});
