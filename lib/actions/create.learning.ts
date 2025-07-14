"use server";

import { db } from "@/drizzle/db";
import { learning_partner } from "@/drizzle/schema";
import { getLearningPartner, LearningPartner } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { eq, sql } from "drizzle-orm";
export const createLearningPartner = async (params: LearningPartner) => {
	const { userId: author } = await auth();
	try {
		const insertedRow = await db
			.insert(learning_partner)
			.values({ ...params, author })
			.returning();
		if (!insertedRow) throw new Error("Failed to Create Learning Partner");
		return {
			success: true,
			data: insertedRow,
		};
	} catch (error: any) {
		return { success: false, error: error.message || "Unknown error" };
	}
};

// get learning partner

export const fetchLearningPartner = async ({
	limit = 10,
	page = 1,
	subject,
	teaching_subject,
}: getLearningPartner) => {
	try {
		const offset = (page - 1) * limit;

		// Base query: fetch all from the table
		let query;
		query = db.select().from(learning_partner);

		// Apply filters if any
		if (subject && teaching_subject) {
			query = query.where(
				sql`${learning_partner.subject} ILIKE ${`%${subject}%`} AND ${
					learning_partner.teaching_subject
				} ILIKE ${`%${teaching_subject}%`}`
			);
		} else if (subject) {
			query = query.where(
				sql`${learning_partner.subject} ILIKE ${`%${subject}%`}`
			);
		} else if (teaching_subject) {
			query = query.where(
				sql`${
					learning_partner.teaching_subject
				} ILIKE ${`%${teaching_subject}%`}`
			);
		}

		// Add pagination
		query = query.limit(limit).offset(offset);

		// Execute and return results
		const result = await query;
		return result;
	} catch (error: any) {
		throw new Error(error.message || "Failed to fetch learning partners");
	}
};


export const getCompanion = async (id:string) => { 

try {
	const data = await db.select().from(learning_partner).where(eq(learning_partner.id, id));
	 if (!data || data.length === 0) {
      throw new Error("Companion not found");
    }
	return {success:true,data:data[0]}
} catch (error:any) {
	return {success:false,error:error.message || "Unknown error"}
}


 }