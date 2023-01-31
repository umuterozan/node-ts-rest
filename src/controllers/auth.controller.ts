import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	const admin = await prisma.admin.findFirst({
		where: {
			username,
		},
	});

	if (admin) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.send({ status: 'error', message: 'Zaten böyle bir kullanıcı kayıtlı.' });
	}

	const salt = await bcrypt.genSalt(8);
	const hashedPassword = await bcrypt.hash(password, salt);

	const insert = await prisma.admin.create({
		data: {
			username,
			password: hashedPassword,
		},
	});

	res.send({
		status: 'success',
		message: 'Admin kaydı başarıyla oluşturuldu.',
	});
};

export const login = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	const admin = await prisma.admin.findFirst({
		where: {
			username,
		},
	});

	if (!admin) {
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.send({ status: 'error', message: 'Kullanıcı adı veya şifre hatalı.' });
	}

	const decrpyt = await bcrypt.compare(password, admin.password);

	if (!decrpyt) {
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.send({ status: 'error', message: 'Kullanıcı adı veya şifre hatalı.' });
	}

	const accessToken = jwt.sign(
		{ id: admin.id },
		process.env.ACCESS_SECRET_KEY || '',
		{
			expiresIn: process.env.ACCESS_EXPIRE,
		}
	);
	const refreshToken = jwt.sign(
		{ id: admin.id },
		process.env.REFRESH_SECRET_KEY || '',
		{
			expiresIn: process.env.REFRESH_EXPIRE,
		}
	);

	await prisma.token.create({
		data: {
			token: refreshToken,
			adminId: admin.id,
		},
	});

	res.send({
		status: 'success',
		message: 'Admin girişi başarılı.',
		accessToken,
		refreshToken,
	});
};

export const token = async (req: Request, res: Response) => {
	const auth = req.headers['authorization'];
	const token = auth && auth.split(' ')[1];

	if (!token) {
		return res.sendStatus(StatusCodes.FORBIDDEN);
	}

	const valid = jwt.verify(token, process.env.REFRESH_SECRET_KEY || '');

	if (!valid) {
		return res.sendStatus(StatusCodes.FORBIDDEN);
	}


	return res.send({accessToken: })
};
