/** This module defines the routes for pins using mongoose
 *
 * @author Johannes Konert
 * @licence MIT
 *
 * @module routes/pins
 * @type {Router}
 */


// modules
const express = require('express');
const logger = require('debug')('we2:pins');
const codes = require('../restapi/http-codes');
const HttpError = require('../restapi/http-error.js');

// TODO add here your require for your own model file


const pins = express.Router();

const storeKey = 'pins';

// routes **************
pins.route('/')
    .get((req, res, next) => {
        // TODO replace store and use mongoose/MongoDB
        // res.locals.items = store.select(storeKey);
        res.locals.processed = true;
        logger("GET fetched items");
        next();
    })
    .post((req,res,next) => {
        req.body.timestamp = new Date().getTime();
        // TODO replace store and use mongoose/MongoDB
        // var result = store.insert(storeKey, req.body);

        res.status(codes.created);

        // TODO replace store and use mongoose/MongoDB
        // res.locals.items = store.select(storeKey, id);
        res.locals.processed = true;
        next();
    })
    .all((req, res, next) => {
        if (res.locals.processed) {
            next();
        } else {
            // reply with wrong method code 405
            let err = new HttpError('this method is not allowed at ' + req.originalUrl, codes.wrongmethod);
            next(err);
        }
    });

pins.route('/:id')
    .get((req, res,next) => {
        // TODO replace store and use mongoose/MongoDB
        // res.locals.items = store.select(storeKey, req.params.id);
        res.locals.processed = true;
        next();
    })
    .put((req, res,next) => {

        // TODO replace store and use mongoose/MongoDB
        // store.replace(storeKey, req.body.id, req.body);
        res.status(codes.success);
        // res.locals.items = store.select(storeKey, id);
        res.locals.processed = true;
        next();
    })
    .delete((req,res,next) => {
        // TODO replace store and use mongoose/MongoDB
        // store.remove(storeKey, id);

        // ...
        //    var err = new HttpError('No element to delete with id ' + req.params.id, codes.notfound);
        //    next(err);
        // ...
        res.locals.processed = true;
        next();
    })

    .all((req, res, next) => {
        if (res.locals.processed) {
            next();
        } else {
            // reply with wrong method code 405
            let err = new HttpError('this method is not allowed at ' + req.originalUrl, codes.wrongmethod);
            next(err);
        }
    });

/**
 * This middleware would finally send any data that is in res.locals to the client (as JSON)
 * or, if nothing left, will send a 204.
 */
pins.use((req, res, next) => {
    if (res.locals.items) {
        res.json(res.locals.items);
        delete res.locals.items;
    } else if (res.locals.processed) {
        res.set('Content-Type', 'application/json'); // not really necessary if "no content"
        if (res.get('Status-Code') == undefined) { // maybe other code has set a better status code before
            res.status(204); // no content;
        }
        res.end();
    } else {
        next(); // will result in a 404 from app.js
    }
});

module.exports = pins;
