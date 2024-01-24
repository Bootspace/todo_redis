exports.logger = (statusCode, message, status, res) => {
  console.log(message);
  res.status(statusCode).json({
   status: status,
   message: message
  })
};