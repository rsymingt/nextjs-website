import type { NextApiRequest, NextApiResponse } from 'next';

import React from 'react';

import { renderToStaticMarkup } from 'react-dom/server';

import httpStatus from 'http-status';
import nodemailer from 'nodemailer';
import Post from '../../models/Post';

import dotenv from 'dotenv';

dotenv.config();

Post.query()
  .insert({
    name: 'test',
  })
  .then((res) => {
    console.log(res);
  });

const transporter = nodemailer.createTransport({
  port: 465,
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  secure: true,
});

export interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactRequest extends NextApiRequest {
  body: ContactData;
}

export default function handler(
  req: ContactRequest,
  res: NextApiResponse<void>
) {
  const { name, email, subject, message } = req.body;

  return new Promise<void>((resolve, reject) => {
    transporter.sendMail(
      {
        from: process.env.SMTP_USER,
        to: process.env.SMTP_CONTACT_EMAIL,
        subject,
        text: message,
        html: renderToStaticMarkup(
          <div>
            <h1>Message from: {name}</h1>
            <p>{message}</p>
            <br />
            <p>Sent From: {email}</p>
          </div>
        ),
      },
      function (err) {
        if (err) {
          res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
          reject();
        } else {
          res.status(httpStatus.OK).send();
          resolve();
        }
      }
    );
  });
}
