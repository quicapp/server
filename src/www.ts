import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
import setRoutes from './routes';

const app = express();

dotenv.load({ path: '.env' });

const port = process.env.PORT || 3000;

app.set('port', parseInt(port) + 100);

// app.use('/', express.static(path.join(__dirname, '../../public')));

app.use(jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://quicappdev.auth0.com/.well-known/jwks.json"
  }),

  // Validate the audience and the issuer
  audience: 'https://www.quicapp.com',
    issuer: "https://quicappdev.auth0.com/",
  algorithms: [ 'RS256' ]
}));

// return error message for unauthorized requests
app.use((err, req, res, next) => {
  console.log(req.headers);
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({message:'Missing or invalid token'});
  }
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));


mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
(<any>mongoose).Promise = global.Promise;

var jwtCheck = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://quicappdev.auth0.com/.well-known/jwks.json"
    }),
    // audience: 'https://www.quicapp.com/',
    issuer: "https://quicappdev.auth0.com/",
    algorithms: ['RS256']
});

app.use(jwtCheck);

app.get('/api/protected', function (req, res) {
  console.log("User", req['user']);
  res.send('Secured Resource');
});

app.listen(port);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  setRoutes(app);

  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });

  app.listen(app.get('port'), () => {
    console.log('quicApp listening on port ' + app.get('port'));
  });

});

export { app };
