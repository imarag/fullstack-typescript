export type ZodErrorResponse = {
  error: {
    code: string;
    path: (string | number)[];
    message: string;
  }[];
};