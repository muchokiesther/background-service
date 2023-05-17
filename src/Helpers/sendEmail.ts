import nodemailer from 'nodemailer';
import ejs from 'ejs';
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path:path.resolve(__dirname, '../../.env')})


let configurationOptions = {
    host: "smtp.gmail.com",
    service:'gmail' ,
    port: 587,
    auth: {
        user: 'muchokiesther8@gmail.com',
        pass: 'glfqriryzcjlfwci',
    }
}
function createTransporter (configOpts:any){
    return nodemailer.createTransport(configOpts)
}


export async function sendMail(messageOptions:any) {
    let transporter = createTransporter(configurationOptions)
    await transporter.sendMail(messageOptions, (err, response)=>{
        console.log(err)
    })
}