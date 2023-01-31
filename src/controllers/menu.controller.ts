import { Menu, PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const insert = (req: Request, res: Response) => {
	prisma.menu
		.create({
			data: req.body,
		})
		.then((data: Menu) => {
			res.send(data);
		})
		.catch((err) => {
			res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
		});
};

export const getAll = async (req: Request, res: Response) => {
	const menus = await prisma.menu.findMany({});

	const treeList: any = [];

	menus.forEach((menu: Menu) => {
		if (menu.parentId === null) {
			const childrens = menus.filter((el: Menu) => el.parentId === menu.id);

			treeList.push({ ...menu, children: childrens });
		}
	});

	res.send(treeList);
};

export const remove = async (req: Request, res: Response) => {
	const { id } = req.body;

	if (!id) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.send({ status: 'error', message: 'Lütfen geçerli bir id gönderiniz.' });
	}

	const menu = await prisma.menu.findUnique({
		where: {
			id: parseInt(id),
		},
	});

	if (!menu) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.send({ status: 'error', message: 'Lütfen geçerli bir id gönderiniz.' });
	}

	const remove = await prisma.menu.delete({
		where: {
			id: parseInt(id),
		},
	});

	res.send({ status: 'success', message: 'Menü başarıyla silindi.' });
};

export const update = async (req: Request, res: Response) => {
	const { id } = req.body;

	if (!id) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.send({ status: 'error', message: 'Lütfen geçerli bir id gönderiniz.' });
	}

	const menu = await prisma.menu.findUnique({
		where: {
			id: parseInt(id),
		},
	});

	if (!menu) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.send({ status: 'error', message: 'Lütfen geçerli bir id gönderiniz.' });
	}

	const update = await prisma.menu.update({
		where: {
			id: parseInt(id),
		},
		data: req.body,
	});

	return res.send(update);
};
