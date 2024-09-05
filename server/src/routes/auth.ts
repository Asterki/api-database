import express from "express";
import { z } from "zod";
import bcrypt from "bcrypt";

import { keys, users } from "../db";

const router = express.Router();

router.post("/api/getkey", async (req, res) => {
	const parsedBody = z
		.object({
			username: z.string(),
			password: z.string(),
		})
		.safeParse(req.body);

	if (!parsedBody.success)
		return res.status(400).send({
			status: "invalid-parameters",
		});

	try {
		const { username, password } = parsedBody.data;

		let user = await users.get(username);
		if (!user) {
			// Create a new user
			const newUser = {
				username: username,
				password: bcrypt.hashSync(password, 10),
				apiKey: [...Array(24)]
					.map(() => (~~(Math.random() * 36)).toString(36))
					.join(""),
			};

			users.set(username, newUser);
			keys.set(newUser.apiKey, username);

			return res.status(200).send({
				apiKey: newUser.apiKey,
			});
		} else {
			// Check password
			if (!bcrypt.compareSync(password, user.password)) {
				return res.status(401).send({
					status: "invalid-password",
				});
			} else {
				return res.status(200).send({
					apiKey: user.apiKey,
				});
			}
		}
	} catch (e) {
		res.status(500).send({
			status: "internal-error",
		});
	}
});

export default router;
