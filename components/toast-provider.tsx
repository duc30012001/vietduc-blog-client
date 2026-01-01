"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 4000,
                style: {
                    background: "#333",
                    color: "#fff",
                },
                success: {
                    style: {
                        background: "#10b981",
                    },
                },
                error: {
                    style: {
                        background: "#ef4444",
                    },
                    duration: 5000,
                },
            }}
        />
    );
}
