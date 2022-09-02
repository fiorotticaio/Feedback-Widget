import { prisma } from './prisma';
import express from 'express';
import nodemailer from 'nodemailer';

const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "eb87b8ec106c78",
      pass: "7a762073e2e480"
    }
  });

app.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;

    const feedback = await prisma.feedback.create({
        data: {
            type,
            comment, 
            screenshot, 
        }
    })

    await transport.sendMail({
        from: 'EQquipe Feedget <oi@feedget.com>',
        to: 'Caio Fiorotti <caiofiorotti@gmail.com>',
        subject: 'Novo feedback',
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
            `<p>Tipo do feedback: ${type}</p>`,
            `<p>Comment: ${comment}</p>`,
            `</div>`
        ].join('\n')
    })

    return res.status(201).json({ data: feedback }); // 201 Created
})

app.listen(3333, () => {
    console.log('Server started on port 3333!');
})