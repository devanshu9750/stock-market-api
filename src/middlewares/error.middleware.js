errorHandler = (err, _, res, __) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message });
}

module.exports = { errorHandler };