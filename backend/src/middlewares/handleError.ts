export const handleError = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message
    }
    return "An Internal Server error occured !"
}

// ? Custom error class (aligned with controller)
export class ApiError extends Error {
    constructor(
        public statusCode: number,
        message: string,
    ) {
        super(message);
        this.name = "ApiError";
    }
}
