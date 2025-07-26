"use server";

import { db } from "@/drizzle/db";
import { learning_partner, session_history } from "@/drizzle/schema";
import { getLearningPartner, LearningPartner } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { desc, eq, sql } from "drizzle-orm";

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

export const getCompanion = async (id: string) => {
	try {
		const data = await db
			.select()
			.from(learning_partner)
			.where(eq(learning_partner.id, id));
		if (!data || data.length === 0) {
			throw new Error("Companion not found");
		}
		return { success: true, data: data[0] };
	} catch (error: any) {
		return { success: false, error: error.message || "Unknown error" };
	}
};

export const companionSessionHistory = async (companionId: string) => {
	const { userId } = await auth();
	try {
		const result = await db
			.insert(session_history)
			.values({
				learning_partner_id: companionId,
				user_id: userId,
			})
			.returning();

		if (!result || result.length === 0) {
			throw new Error("Failed to create session history");
		}

		return { success: true, data: result[0] };
	} catch (error: any) {
		return { success: false, error: error.message || "Unknown error" };
	}
};

// fetch Session History

export const getSessionHistory = async (limit = 10) => {
  try {
    const data = await db
      .select({
        session: session_history,
        partner: learning_partner,
      })
      .from(session_history)
      .leftJoin(
        learning_partner,
        eq(session_history.learning_partner_id, learning_partner.id)
      )
      .orderBy(desc(session_history.created_at))
      .limit(limit);

    if (!data) throw new Error("No session history found");

    return {
      success: true,
      data: data.map(({ session, partner }) => ({
        ...partner,
        session_id: session.id,
        session_created_at: session.created_at,
      })),
      full: data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Unknown error occurred",
    };
  }
};


export const getUsersSessions = async (userId: string, limit = 10) => {
	try {
		const data = await db
			.select()
			.from(session_history)
			.where(eq(session_history.user_id, userId))
			.orderBy(desc(session_history.created_at))
			.limit(limit);
		if (!data) throw new Error("Failed to fetch session history");
		return { success: true, data };
	} catch (error: any) {
		return { success: false, error: error.message || "Unknown error" };
	}
};

export const getUserCompanion = async (userId: string) => {
	try {
		const data = await db
			.select()
			.from(learning_partner)
			.where(eq(learning_partner.author, userId));
		if (!data || data.length === 0) {
			throw new Error("Companion not found");
		}
		return { success: true, data };
	} catch (error: any) {
		return { success: false, error: error.message || "Unknown error" };
	}
};

export const newCompanionPermission = async () => {
	const { userId, has } = await auth();
	let limit = 0;
	try {
		if (has({ plan: "pro" })) {
			return true;
		} else if (has({ feature: "3_active_session" })) {
			limit = 3;
		} else if (has({ feature: "10_active_session" })) {
			limit = 10;
		}
		if (!userId) throw new Error("User ID is required");
		const [{ count: totalCount }] = await db
			.select({ count: sql<number>`COUNT(*)` })
			.from(learning_partner)
			.where(eq(learning_partner.author, userId));

		if (totalCount >= limit) {
			return false;
		} else {
			return true;
		}
	} catch (error: any) {
		throw new Error(
			error.message || "Failed to check companion creation permission"
		);
	}
};
