require('dotenv').config();
require('express-async-errors');

// extra security packages
const helmet = require('helmet');
const cors = require('cors'); // accessible from different domain
const xss = require('xss-clean'); // prevent inject malicious code
const rateLimiter = require('express-rate-limit'); // 

// Swagger
//const swaggerUI = require('swagger-ui-express');
//const YAML = require('yamljs');
//const swaggerDocument = YAML.load('./swagger.yaml');

// Express framework
const express = require('express');
const app = express();

// Database
const mongoose = require('mongoose')

// routers
const authenticationRouter = require('./Routes/AuthenticationRoutes');
const carRouter = require('./Routes/CarRoutes');
const userRouter = require('./Routes/UserRoutes');

// error handler
const authenticationMiddleware = require('./Middlewares/AuthenticationMiddleware');
const routeNotFoundMiddleware = require('./Middlewares/RouteNotFoundMiddleware');
const errorHandleMiddleware = require('./Middlewares/ErrorHandleMiddleware');

// This line tells Express.js to trust the X-Forwarded-For header, which is often used by proxies or load balancers to identify the original client IP address.
// Important: Only enable this if you are behind a trusted proxy.Otherwise, it could lead to security vulnerabilities.
app.set('trust proxy', 1);

app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000, // in 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
    })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

//app.get('/', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.get('/', (req, res) => {
    res.send('<h1>Car API</h1>');
});

// routes
app.use('/api/', authenticationRouter);
app.use('/api/', authenticationMiddleware, carRouter);
app.use('/api/', authenticationMiddleware, userRouter);

app.use(routeNotFoundMiddleware);
app.use(errorHandleMiddleware);

const port = process.env.PORT || 5000;

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        app.listen(port, () =>
            console.log(`Server is listening on http://localhost:${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
