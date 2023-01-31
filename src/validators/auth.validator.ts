import * as Joi from 'joi';

export const registerSchema = Joi.object().keys({
	username: Joi.string().min(3).max(25).required(),
	password: Joi.string().min(3).max(25).required(),
});
