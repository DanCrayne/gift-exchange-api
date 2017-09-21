var config  = require(process.cwd() + '/config');
var nodemailerSettings = require(config.nodemailerSettings);

module.exports = {
  
  sendMessages : function(pairs) {
    const nodemailer = require('nodemailer');
    let mailOptions = {};

    let transporter = nodemailer.createTransport({
      host:   nodemailerSettings.host
    , port:   nodemailerSettings.port
    , secure: nodemailerSettings.secure
    , auth: {
        user: nodemailerSettings.auth.user
      , pass: nodemailerSettings.auth.pass
      }
    });

    for (pair of pairs) {
      htmlMessage = `
                    Greetings ${pair.giver_first_name},
                    <br><br>
                    You've been selected to give ${pair.receiver_first_name} 
                    ${pair.receiver_last_name} a gift.
                    `

      console.log(pair.giver_email_addr + ' -> ' + pair.receiver_first_name + ' ' + pair.receiver_last_name);

      if (nodemailerSettings.testing === true) {
        mailOptions = {
            from:     nodemailerSettings.auth.user
          , to:       nodemailerSettings.testRecipient
          , subject:  'Gift Exchange Information (TESTING)'
          , html:     htmlMessage
        };
      }
      else {
        mailOptions = {
          from:     nodemailerSettings.auth.user
        , to:       nodemailerSettings.testAcct
        , subject:  'Gift Exchange Information'
        , html:     htmlMessage
        };
      }

      transporter.sendMail(mailOptions, (error, info) => {
        if (error)
          return console.log(error);
        console.log('Message %s sent: %s', info.messageId, info.response);
      });
    }
  }
};
