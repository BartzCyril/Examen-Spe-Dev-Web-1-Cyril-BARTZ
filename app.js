const express = require('express');
const expressSession = require('express-session');
const app = express();
app.set('view engine', 'ejs');
app.set('views', './pages');
const appProperties = {
    port: 3000,
    session: {
        secret: 'examen',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 10 * 60 * 1000,
            sameSite: 'Lax'
        }
    }
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    expressSession(appProperties.session)
);
app.use('/countries', require('./router/countries'));
app.use('/authentication', require('./router/authentication'));
app.use('/users', require('./router/users'));

app.listen(appProperties.port, () => {
    console.log(`Server is running on port ${appProperties.port}`);
});