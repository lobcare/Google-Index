var request = require("request");
var { google } = require("googleapis");
var fs = require("fs");
var key = require("./pieseford-login-7a6188f975bd.json");

var urls = [];

fs.readFile("urls.txt", "utf-8", (err, content) => {
  urls = content.toString().split("\n");
});

const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ["https://www.googleapis.com/auth/indexing"],
  null
);

jwtClient.authorize(function (err, tokens) {
  if (err) {
    console.log(err);
    return;
  }

  // change these values for a batch
  const start = 1;
  const end = 978;
  console.log("*****************************************");
  console.log("Batch 5");
  console.log("*****************************************");

  for (let counter = start; counter <= end; counter++) {
    const index = counter - 1;

    const url = urls[index].replace("\r", "");
    let options = {
      url: "https://indexing.googleapis.com/v3/urlNotifications:publish",
      method: "POST",
      // Your options, which must include the Content-Type and auth headers
      headers: {
        "Content-Type": "application/json",
      },
      auth: { bearer: tokens.access_token },
      // Define contents here. The structure of the content is described in the next step.
      json: {
        url: url,
        type: "URL_UPDATED",
      },
    };
    request(options, function (error, response, body) {
      // Handle the response
      console.log(body);
    });

    // console.log(options.json.url)
  }
});
