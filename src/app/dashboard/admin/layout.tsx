import { auth } from "@/lib/utils/auth/auth" 
import { headers } from "next/headers" 
import { redirect } from "next/navigation" 
import React from "react"

export default async function AdminLayout({ 
    children 
}: { 
    children: React.ReactNode 
}) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        redirect("/login");
    }

    if (session.user.role !== "ADMIN") {
       redirect("/unauthorized");
    }

    return (
        <div className="admin-layout-wrapper">
            {children}
        </div>
    );
}