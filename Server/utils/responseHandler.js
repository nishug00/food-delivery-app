// Success handler
const handleSuccess = (res, message, data) => {
    res.status(200).json({
      success: true,
      message,
      data,
    });
  };
  
  // Error handler
  const handleError = (res, message, error) => {
    res.status(500).json({
      success: false,
      message,
      error: error.message || "Server error",
    });
  };
  
  module.exports = { handleSuccess, handleError };
  