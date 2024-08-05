import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

class NoteValidator {
    public updateNote = (req, res, next) => {
        const schema = Joi.object({
            title: Joi.string().optional(),
            description: Joi.string().optional(),
            color: Joi.string().optional(),
            archive: Joi.boolean().optional(),
            trash: Joi.boolean().optional(),
            createdBy: Joi.number().optional(),
        });

        const header_schema = Joi.object({
            authorization: Joi.string().required(),
        }).unknown(true);

        const { error: bodyError } = schema.validate(req.body);
        if (bodyError) {
            return res.status(400).json({ error: bodyError.details[0].message });
        }
        const { error: headersError } = header_schema.validate(req.headers);
        if (headersError) {
            return res.status(400).json({ error: headersError.details[0].message });
        }
        next();
    };
}
export default NoteValidator;