var express = require('express'),
    cfenv = require('cfenv'),
    bodyParser = require('body-parser'),
    app = express();

app.get('/api', function (req, res) {
    res.send('Mock APIs are running');
});

app.get('/license', function (req, res) {
    console.log('license service was called ');
    var lic = require("./data/lic.json");

    res.json(lic);
});

app.get('/getProduct/:id', function (req, res) {
    var productID = req.params.id;

    console.log('getProduct service was called for id ' + productID);

    if (productID == "2100000017577") {
      // coldrex
        var obj = require("./data/product1.json");
    } else if (productID == "8594739217669") {
      // ibalgin
        var obj = require("./data/product2.json");
    } else if (productID == "2100000017300") {
      // strepsils
        var obj = require("./data/product3.json");
    } else if (productID == "3154140320102") {
      // strepsils kids
        var obj = require("./data/product4.json");
    } else {
      res.status(400);
      return res.json({
        "error": "Invalid product id"
      });
    }

    res.json(obj);
});

var appEnv = cfenv.getAppEnv();

app.listen(appEnv.port, '0.0.0.0', function() {
  console.log("Mock server listening on " + appEnv.url);
});
