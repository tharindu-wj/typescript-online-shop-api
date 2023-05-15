import { Request, Response } from "express";

const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err: any, req: Request, res: Response) => {
  console.log(res.send);

  let error = { ...err };
  error.message = err.message;

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val: any) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res
    //.status(error.statusCode || 500)
    .send({ success: false, error: error.message || "Sever Error" });
};

export default errorHandler;
