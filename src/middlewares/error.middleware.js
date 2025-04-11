errorHandler = (err, _, res, __) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: err.message });
}

module.exports = { errorHandler };