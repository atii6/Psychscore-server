import CustomError from "./customErrors.js";

const methodHandler = (handlers) => {
  return async (req, res) => {
    const handler = handlers[req.method];

    if (!handler) {
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
      await handler(req, res);
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ message: error.message });
      }

      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };
};

export default methodHandler;
