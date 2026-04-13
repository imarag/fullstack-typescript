import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const ErrorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof ZodError) {
    const messages = error.issues.map(issue => issue.message);
    return res.status(400).json({
      error: messages.join(", "),
    });
  }

  console.error(error);

  return res.status(500).json({
    error: "Internal server error",
  });
};