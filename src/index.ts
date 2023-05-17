// import { log } from 'console';
// import nodemailer from 'nodemailer';
// import ejs from 'ejs';
// import dotenv from 'dotenv'
// import path from 'path'
// dotenv.config({path:path.resolve(__dirname, 'background services/.env')})

// //creating configurations

// // rendering the template
// ejs.renderFile('dist/Templates/welcome.ejs', {name: 'Esther Muchoki', message: 'Welcome all to the e-commerce site'}, (err, html) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(html);

//         // creating an object with message options
//         let messageOptions = {
//             from: "muchokiesther8gmail.com",
//             to: "muchokiesther8@gmail.com",
//             subject: "Greeting test",
//             html: html
//         };

//         // sending an email
//         async function sendMail(messageOpts:any){
//             let transporter = nodemailer.createTransport(configurationOptions)
//             await  transporter.sendMail(messageOpts);
//         }
//         sendMail(messageOptions);
//     }
// });
import cron from 'node-cron'
import{ sendWelcomeEmail } from './EamilServices/WelcomeEmail'
import { sendResetEmail } from './EamilServices/resetEmail'


cron.schedule(' */2 * * * * *' , async () => {
     await sendWelcomeEmail()
    await sendResetEmail()
})


