'use strict';

const Promise = require('bluebird');
const config = require('../config');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport(`smtps://${config.email.sender}:${config.email.password}@smtp.gmail.com`);
const RenderHBS = require('../libs/render-hbs')(`${__dirname}/templates`);

const Email = {

  /**
   *
   * @param user
   * @param token
   * @returns user
   */
  sendVerifyEmail: (user, token) => new Promise((resolve, reject) => {
    const url = `${config.email.api}/${token}`;
    const options = {
      from: `"${config.email.name}" <${config.email.sender}>`,
      to: user.email,
      subject: 'Activate your account',
      text: 'Plain text',
      html: RenderHBS.render('verify-email.hbs', {url})
    };

    transporter.sendMail(options, (error, info) => {
      if(error) return reject(error);

      resolve(user.email);
    });
  })

};

module.exports = Email;
