import express from "express";
import { z } from "zod";
import bcrypt from "bcrypt";

import { db, keys } from "../db";

const router = express.Router();

// Get
router.post("/api/db/get", async (req, res) => {
	const parsedBody = z
		.object({
			apiKey: z.string(),
			key: z.string(),
		})
		.safeParse(req.body);

	if (!parsedBody.success)
		return res.status(400).send({
			status: "invalid-parameters",
		});

	try {
		const { apiKey, key } = parsedBody.data;

		const user = await keys.get(apiKey);
		if (!user) {
			return res.status(401).send({
				status: "invalid-api-key",
			});
		}

		const table = db.table(user);
		let value = await table.get(key);
		if (!value) {
			return res.status(404).send({
				status: "key-not-found",
			});
		}

		value = JSON.parse(value);
		return res.status(200).send({
			value,
		});
	} catch (e) {
		res.status(500).send({
			status: "internal-error",
		});
	}
});

// Set
router.post("/api/db/set", async (req, res) => {
	const parsedBody = z
		.object({
			apiKey: z.string(),
			key: z.string(),
			value: z.any(),
		})
		.safeParse(req.body);

	if (!parsedBody.success)
		return res.status(400).send({
			status: "invalid-parameters",
		});

	try {
		const { apiKey, key, value } = parsedBody.data;

		const user = await keys.get(apiKey);
		if (!user) {
			return res.status(401).send({
				status: "invalid-api-key",
			});
		}

		const table = db.table(user);
		table.set(key, JSON.stringify(value));

		return res.status(200).send({
			status: "success",
		});
	} catch (e) {
		res.status(500).send({
			status: "internal-error",
		});
	}
});

// Delete
router.post("/api/db/delete", async (req, res) => {
	const parsedBody = z
		.object({
			apiKey: z.string(),
			key: z.string(),
		})
		.safeParse(req.body);

	if (!parsedBody.success)
		return res.status(400).send({
			status: "invalid-parameters",
		});

	try {
		const { apiKey, key } = parsedBody.data;

		const user = await keys.get(apiKey);
		if (!user) {
			return res.status(401).send({
				status: "invalid-api-key",
			});
		}

		const table = db.table(user);
		table.delete(key);

		return res.status(200).send({
			status: "success",
		});
	} catch (e) {
		res.status(500).send({
			status: "internal-error",
		});
	}
});

export default router;
