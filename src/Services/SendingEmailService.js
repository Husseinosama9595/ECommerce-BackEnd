import nodemailer from "nodemailer"

export const Subjects={
    register:"Activate your account",
    resetPassword:"Reset your password"
}

export const sendEmail=async(to,subject,html)=>{
    const transporter=nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        secure:true,
        auth:{
            user:process.env.PERSONAL_EMAIL,
            pass:process.env.EMAIL_PASSWORD
        }        
    })

    const info=await transporter.sendMail({
        from:process.env.PERSONALL_EMAIL,
        to,
        subject,
        html,
    })
 

}

