/* jshint node: true */

var express     = require('express'),
    app         = express(),
    port        = process.env.PORT || 8080,
    morgan      = require('morgan'),
    compression = require('compression'),
    path        = require('path');

app.use(morgan('short'));

app.use(compression());
app.use('/', express.static(path.join(__dirname, '../dist')));

app.listen(port);
console.log('Started server on port ' + port);
