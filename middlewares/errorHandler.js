// This code defines an error handling middleware for an Express.js application. It logs the error stack to the console and sends a JSON response with the error message and stack trace (if not in production). The status code is set to 500 if not already set, indicating a server error.
// The middleware is then exported for use in other parts of the application.

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
    res.status(statusCode).json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  };
  
  module.exports = { errorHandler };

