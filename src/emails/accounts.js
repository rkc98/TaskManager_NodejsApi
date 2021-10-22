const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// sgMail.setApiKey(apiKey);
// const msg = {
//   to: "choudharyrahul041@gmail.com", // Change to your recipient
//   from: "rkc.98@outlook.com", // Change to your verified sender
//   subject: "Sending with SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };

const sendEmail = (email, user) => {
  const msg = {
    to: email,
    from: "rkc.98@outlook.com",
    subject: "Thank you for registering with us",
    text: `Welcome to the app, ${user} .Let me know your review on the app `,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

const sendEmailAfterDeletingAcccount = (email, user) => {
  const msg = {
    to: email,
    from: "rkc.98@outlook.com",
    subject: "Please share your feedback",
    text: `${user}, We would be glad if you tell us the reason for deleting your account `,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = {
  sendEmail, //es6 shorthand for sendEmail:sendEmail
  sendEmailAfterDeletingAcccount,
};
