require('dotenv').config();
const express = require('express');
const session = require('express-session');
const connectMongo = require('connect-mongo');
const MongoStore = connectMongo.default || connectMongo;
const passport = require('./config/passport');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');
const { connectToDatabase } = require('./db/connection');
const propertiesRoutes = require('./routes/properties');
const inquiriesRoutes = require('./routes/inquiries');
const authRoutes = require('./routes/auth');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/', authRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/properties', propertiesRoutes);
app.use('/inquiries', inquiriesRoutes);

connectToDatabase()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err.message);
        process.exit(1);
    });