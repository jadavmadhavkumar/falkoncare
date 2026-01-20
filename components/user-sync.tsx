"use client";

import { useConvexAuth, useMutation } from "convex/react";
import { useEffect } from "react";
import { api } from "@/convex/_generated/api";

export function UserSync() {
    const { isAuthenticated } = useConvexAuth();
    const storeUser = useMutation(api.users.store);

    useEffect(() => {
        console.log("UserSync: isAuthenticated =", isAuthenticated);
        if (isAuthenticated) {
            console.log("UserSync: Calling storeUser mutation...");
            storeUser()
                .then(() => console.log("UserSync: User stored successfully"))
                .catch((err) => console.error("UserSync: Error storing user:", err));
        }
    }, [isAuthenticated, storeUser]);

    return null;
}
