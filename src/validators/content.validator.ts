import * as Joi from 'joi';

export const insertSchema = Joi.object().keys({
	menuId: Joi.number().required(),
	icon: Joi.string().max(255).required(),
	brief: Joi.string().max(50).required(),
	content: Joi.string().required(),
	title: Joi.string().max(255).required(),
	slug: Joi.string().max(50).required(),
	image: Joi.string().max(255),
});

export const updateSchema = Joi.object().keys({
	id: Joi.number().required(),
	icon: Joi.string().max(255),
	brief: Joi.string().max(50),
	content: Joi.string(),
	title: Joi.string().max(255),
	slug: Joi.string().max(50),
});
