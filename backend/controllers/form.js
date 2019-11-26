const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.contactForm = (req, res) => {
  const { name, email, message } = req.body;

  const emailData = {
    to: process.env.EMAIL_TO,
    from: email,
    subject: `Contact form - ${process.env.APP_NAME}`,
    text: `Email received from contact form \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
    html: `
            <h4>Email received from contact form:</h4>
            <p>Sender name: ${name}</p>
            <p>Sender email: ${email}</p>
            <p>Sender Message: ${message}</p>
            <hr/>
            <p>This email may contain sensetive information</p>
            <p>https://seoblog.com</p>
        `
  };

  sgMail.send(emailData).then(send => {
    return res.json({
      success: true
    });
  });
};

// Contact Blog Author Form
exports.contactBlogAuthorForm = (req, res) => {
  const { name, authorEmail, email, message } = req.body;
  let mailList = [authorEmail, process.env.EMAIL_TO];
  const emailData = {
    to: mailList,
    from: email,
    subject: `Someone message you from - ${process.env.APP_NAME}`,
    text: `Email received from contact form \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
    html: `
            <h4>Email received from:</h4>
            <p>name: ${name}</p>
            <p>email: ${email}</p>
            <p>Message: ${message}</p>
            <hr/>
            <p>This email may contain sensetive information</p>
            <p>https://seoblog.com</p>
        `
  };

  sgMail.send(emailData).then(send => {
    return res.json({
      success: true
    });
  });
};
