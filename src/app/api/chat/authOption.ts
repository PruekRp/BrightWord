import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

export async function getSession() {
    return await getServerSession(authOptions as any)
}