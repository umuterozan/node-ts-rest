import * as Joi from 'joi';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Response, Request, NextFunction } from 'express';

const Validator = (schema: Joi.ObjectSchema) => {
	return async function (req: Request, res: Response, next: NextFunction) {
		const validate = schema.validate(req.body, { abortEarly: true });

		if (validate.error) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.send({ status: 'error', message: validate.error.message });
		}

		req.body = validate.value;
		next();
	};
};

export default Validator;
