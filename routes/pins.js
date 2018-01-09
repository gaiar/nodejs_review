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
const PinModel = require('../models/pin');

const pins = express.Router();

// routes **************
pins.route('/')
    .get((req, res, next) => {
        // TODO replace store and use mongoose/MongoDB
        // res.locals.items = store.select(storeKey);


        let limit = parseInt(req.query.limit);
        if((!req.query.limit >= 0 || isNaN(limit)) && !limit === undefined){
            next(new HttpError("Invalid value for argument limit", codes.wrongrequest));
            return;
        }
        let offset = parseInt(req.query.offset);
        logger("offset"+offset)
        if(!req.query.offset >= 0 || isNaN(offset)&& !offset === undefined){
            next(new HttpError("Invalid value for argument offset", codes.wrongrequest));
            return;
        }


        let query = PinModel.find({})
            .skip(offset)
            .limit(limit);

        query.exec((err, items) => {
            res.status(codes.success).json(items);
            res.locals.processed = true;
            logger("GET fetched items");

        });

    })
    .post((req,res,next) => {
        // req.body.timestamp = new Date().getTime();
        // TODO replace store and use mongoose/MongoDB
        // var result = store.insert(storeKey, req.body);
        let pin = new PinModel(req.body);
        logger(pin);
        pin.save(err => {
            if (err) {
                return next(err);
            }
            res.status(codes.created).json(pin);
            res.locals.processed = true;
            //next();
        });

        // TODO replace store and use mongoose/MongoDB
        // res.locals.items = store.select(storeKey, id);

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
        PinModel.findById(req.params.id, (err, item) => {
            if (err) {
                let err = new HttpError('No element with id ' + req.params.id, codes.notfound);
                return next(err);
            }
            res.status(codes.success).json(item);
            res.locals.processed = true;
        });

        //next();
    })
    .put((req, res,next) => {

        // TODO replace store and use mongoose/MongoDB
        // store.replace(storeKey, req.body.id, req.body);
        PinModel.findByIdAndUpdate(req.params.id, req.body, {runValidators: true, new: true}, (err, item) => {
            if (err) {
                let err = new HttpError('No element to update with id ' + req.params.id, codes.notfound);
                return next(err);
            }
            res.status(codes.success).json(item);
            res.locals.processed = true;
        });
        // res.status(codes.success);
        // res.locals.items = store.select(storeKey, id);

        //next();
    })
    .delete((req,res,next) => {
        // TODO replace store and use mongoose/MongoDB
        // store.remove(storeKey, id);

        // ...
        //let err = new HttpError('No element to delete with id ' + req.params.id, codes.notfound);
        //    next(err);
        // ...
        PinModel.findByIdAndRemove(req.params.id, (err, item) => {

            if (err) {
                let err = new HttpError('No element to delete with id ' + req.params.id, codes.notfound);
                return next(err);
            }
            res.status(codes.success).json(item);
            res.locals.processed = true;
        });

        //next();
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
        if (res.get('Status-Code') === undefined) { // maybe other code has set a better status code before
            res.status(204); // no content;
        }
        res.end();
    } else {
        next(); // will result in a 404 from app.js
    }
});

module.exports = pins;
