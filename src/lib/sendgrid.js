const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const sendWelcomeEmail = (firstName,email) => {
       const msg = {
        to: email,
        from: "admin@reelfolio.com",
        templateId: "d-245f4763e11545b7945ae3581a171d72",
        dynamicTemplateData: {
          FIRST_NAME: firstName
        }
      };
    return sgMail.send(msg);
};

module.exports = {
    sendWelcomeEmail
};