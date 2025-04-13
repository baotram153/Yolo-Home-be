// create an async handler to avoid try-catch blocks in every route handler

export const asyncHandler = (fn: Function) => (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    });
}