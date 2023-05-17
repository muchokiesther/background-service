import mssql from 'mssql'
import { sqlConfig } from "../config";
import ejs from 'ejs';
import dotenv from 'dotenv'
import path from 'path'
import { sendMail } from '../Helpers/sendEmail';
dotenv.config({path:path.resolve(__dirname, 'background services/.env')})


interface User {
    id: string
    userName: string
    fullName: string
    email: string
    phoneNumber: number
    password: string
    emailSent: number
    isDeleted: number
    roles:string
}

export const sendResetEmail = async() => {
    const pool = await mssql.connect(sqlConfig)
    const users: User[] = (await (await pool.request()).query('SELECT * FROM users WHERE isReset=1')).recordset
    console.log(users);

    // looping through and send an email
   
    for (let user of users) {
        ejs.renderFile('dist/Templates/reset.ejs', {name:user.fullName}, async(err, html) => {
          //send email
                try {
                
                let messageOptions = {
                    from: "muchokiesther8gmail.com",
                    to: user.email,
                    subject: "Welcome Email",
                    html
                }
                // console.log(user)
                 await sendMail(messageOptions)   
                 //update the database email was sent
                 await pool.request().query(`UPDATE users SET isReset=0 WHERE id='${user.id}'`);

            } catch (error) {
                    
            }
            
                   
        })
    }
};