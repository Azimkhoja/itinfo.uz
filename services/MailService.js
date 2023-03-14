const nodemailer = require('nodemailer')
const config = require('config')

class MailService{
    constructor(){
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            host:config.get("smtp_host"),
            port: config.get("smtp_port"),
            secure: false,
            auth: {
                user: config.get("smtp_user"),
                pass: config.get("smtp_password")
            },
        })
    }
    async sendActivationMail(toMail, link){
        // let send = link.slice(0,link.lastIndexOf("/"))
        let pass = link.slice(link.lastIndexOf("/"), link.length-1)
        await this.transporter.sendMail({
            from: config.get("smtp_user"),
            to: toMail,
            subject: "ITinfo service",
            text: "",
            html:`
                <div> 
                    <h1> Your temporary password </h1>
                    <p> ${pass} </p>
                    <a href="${link}" >Back to log in</a>
                </div>    
            `
        })
    }
}

module.exports = new MailService()