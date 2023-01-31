import * as Joi from 'joi';

export const insertSchema = Joi.object().keys({
	title: Joi.string().max(255).required(),
	slug: Joi.string().max(255).required(),
	parentId: Joi.number(),
});

export const updateSchema = Joi.object().keys({
	id: Joi.number().required(),
	title: Joi.string().max(255),
	slug: Joi.string().max(255),
	parentId: Joi.number(),
});
