const nodemailer = require('nodemailer');

class MailService {
    private transporter: any;

    constructor() {
        this.transporter = nodemailer.createTrasport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                secure: false,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
            }
        )
    }

    public async sendActivationLink(to:any, link:any) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Account activation',
            text: '',
            html:
                `
                    <div>
                        <h1>Click the link to activate your account</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })
    }
}

export = new MailService();