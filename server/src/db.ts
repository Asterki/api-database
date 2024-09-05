import { QuickDB } from "quick.db";

export const db = new QuickDB({});


export const keys = db.table("keys");
export const users = db.table("users");