import express, { Router } from 'express';
import { Document, Model } from 'mongoose';

export function exposeCrud(app: Router, path: string, model: Model<any>) {
    app.use(express.json());

    app.post(path, async function (req, res, next) {
        try {
            let user: Document;
            console.log('req.body', req.body);
            try {
                user = new model(req.body);
            } catch (error) {
                return res.status(400).end();
            }
            await user.save();
            res.status(201).json(user);
        } catch (error) {
            res.status(500).end();
        }
    });

    app.get(path, async function (req, res, next) {
        try {
            const result = await model.find();
            res.json(result);
        } catch (error) {
            res.status(500).end();
        }
    });

    app.get(`${path}/:id`, async function (req, res, next) {
        try {
            const id = req.params.id;
            const result = await model.findById(id);
            if (!result) {
                return res.status(404).end();
            }
            res.json(result);
        } catch (error) {
            res.status(500).end();
        }
    });

    app.put(`${path}/:id`, async function (req, res, next) {
        try {
            const id = req.params.id;
            const user = await model.findById(id);
            user.overwrite(req.body);
            await user.save();
            res.status(204).end();
        } catch (error) {
            console.error('error: ', error);
            res.status(500).end();
        }
    });

    app.patch(`${path}/:id`, async function (req, res, next) {
        try {
            const id = req.params.id;
            const user = req.body;
            await model.findByIdAndUpdate(id, user, {});
    
            res.status(204).end();
        } catch (error) {
            console.error('error: ', error);
            res.status(500).end();
        }
    });

    app.delete(`${path}/:id`, async function (req, res, next) {
        try {
            const id = req.params.id;
            await model.findByIdAndDelete(id);
            res.status(204).end();
        } catch (error) {
            console.error('error: ', error);
            res.status(500).end();
        }
    });

    app.delete(path, async function (req, res, next) {
        try {
            await model.remove({});
            res.status(204).end();
        } catch (error) {
            console.error('error: ', error);
            res.status(500).end();
        }
    });
}















