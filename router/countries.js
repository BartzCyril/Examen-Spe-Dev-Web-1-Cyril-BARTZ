const express = require('express');
const countries = express.Router();
const loggedMiddleware = require('../middlewares/logged');
const adminMiddleware = require('../middlewares/admin');
const Country = require('../helper/Country');
const ObjectHelper = require('../helper/Object');

countries.get('/', loggedMiddleware, (req, res) => {
    res.send(Country.getAll());
});

countries.get('/update/:id', adminMiddleware, (req, res) => {
    const id = parseInt(req.params.id);

    if (!id) {
        res.status(400).send('ID is required');
        return;
    }

    const result = Country.get(id);

    if (result.error) {
        res.status(result.status).render('countries', {error: result.message});
        return;
    }

    res.render('countries', {data: result.data});
});

countries.post('/update', adminMiddleware, async (req, res) => {
    const data = req.body;
    delete data._method;
    const reconstructData = ObjectHelper.reconstruct(data);
    const update = await Country.update(reconstructData);

    if (update.error) {
        res.status(update.status).send(update.message);
        return;
    }

    res.status(update.status).redirect('/countries/update/' + reconstructData.ccn3);
});

countries.get('/:id/:type', loggedMiddleware, (req, res) => {
    const id = parseInt(req.params.id);
    const type = req.params.type;

    if (!id || !type) {
        res.status(400).send('ID and type are required');
        return;
    }

    const getResult = (result) => {
        if (result.error) {
            res.status(result.status).send(result.message);
            return;
        }

        res.status(200).send(result.data);
    }

    switch (type.toLowerCase()) {
        case 'full':
            return getResult(Country.getFullData(id));
        case 'normal':
            return getResult(Country.getNormalData(id));
        case 'short':
            return getResult(Country.getShortData(id));
        default:
            res.status(400).send('Invalid type');
            break;
    }
});

countries.get('/custom/:id/:fields', loggedMiddleware, (req, res) => {
    const id = parseInt(req.params.id);
    const fields = req.params.fields;

    if (!id || !fields) {
        res.status(400).send('ID and fields are required');
        return;
    }

    const result = Country.getCustomData(id, fields.trim().split(','));

    if (result.error) {
        res.status(result.status).send(result.message);
        return;
    }

    res.status(200).send(result.errors ? {
        data: result.data,
        errors: result.message + ' : ' + result.errors.join(', ')
    } : result.data);
});

module.exports = countries;