const express = require('express');
const bodyParser = require(body-parser);
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const server = app.listen(3000);
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: '1a50ae84',
  apiSecret: dVRnz9vyf2p5hiq5
});
nexmo.message.sendSms(
    YOUR_VIRTUAL_NUMBER, '15105551234', 'yo',
      (err, responseData) => {
        if (err) {
          console.log(err);
        } else {
          console.dir(responseData);
        }
      }
   );
   app.post('/send', (req, res) => {
    // Send SMS
    nexmo.message.sendSms(
      config.number, req.body.toNumber, req.body.message, {type: 'unicode'},
      (err, responseData) => {if (responseData) {console.log(responseData)}}
    );
  });
 