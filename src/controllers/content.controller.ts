import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { insertSchema, updateSchema } from '../validators/content.validator';
import Upload from '../helpers/Upload';
import fs from 'fs';
import { StatusCodes } from 'http-status-codes';
import Joi, { equal } from 'joi';
import path from 'path';

const prisma = new PrismaClient();

export const insert = async (req: Request, res: Response) => {
	Upload(req, res, async function (err) {
		if (err) {
			return res.status(StatusCodes.BAD_REQUEST).send({
				status: 'error',
				message: 'Resim yüklenirken hata oluştu!',
				description: err,
			});
		}

		const validate = insertSchema.validate(req.body, { abortEarly: true });

		if (validate.error) {
			if (req.file && fs.existsSync(req.file.path)) {
				fs.unlinkSync(req.file.path);
			}

			return res
				.status(400)
				.send({ status: 'error', message: validate.error.message });
		}

		const insert = await prisma.content.create({
			data: {
				...validate.value,
				image: req.file?.filename,
			},
		});

		return res.send(insert);
	});
};

export const get = async (req: Request, res: Response) => {
	const { slug } = req.params;

	const content = await prisma.content.findFirst({
		include: { menu: true },
		where: {
			slug: `/${slug}`,
		},
	});

	if (!content) {
		return res.sendStatus(StatusCodes.NOT_FOUND);
	}

	return res.send(content);
};

export const remove = async (req: Request, res: Response) => {
	const { id } = req.body;

	if (!id) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.send({ status: 'error', message: 'Lütfen geçerli bir id gönderiniz.' });
	}

	const content = await prisma.content.findUnique({
		where: {
			id: parseInt(id),
		},
	});

	if (!content) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.send({ status: 'error', message: 'Lütfen geçerli bir id gönderiniz.' });
	}

	const remove = await prisma.content.delete({
		where: {
			id: parseInt(id),
		},
	});

	if (content.image) {
		fs.unlinkSync(path.join(process.env.STATIC_DIR || '', content.image));
	}

	res.send({ status: 'success', message: 'Sayfa başarıyla silindi.' });
};

export const update = async (req: Request, res: Response) => {
	
};
