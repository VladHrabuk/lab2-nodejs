export function sendJsonSuccess(res, data) {
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify({ status: 'Success', data }));
}

export function sendJsonError(res, status, errorMessage, statusCode = 500) {
  res.statusCode = statusCode;
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify({ status, message: errorMessage }));
}

export function parseJSON(data) {
  this.end(JSON.stringify(data));
}
