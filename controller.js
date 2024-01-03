import { sendJsonSuccess } from './helpers.js';

export const GETController = (req, res, url, payload) => {
  const ip = res.socket.remoteAddress;
  const port = res.socket.remotePort;
  const response = { name: `Path ${url.pathname}. Your IP address is ${ip} and your source port is ${port}.` };
  sendJsonSuccess(res, response);
};

export const POSTController = (req, res, url, payload) => {
  const response = { user: payload };
  sendJsonSuccess(res, response);
};

export const OPTIONSController = (req, res, url, payload) => {
  res.setHeader('Allow', 'OPTIONS, GET, POST');
  res.setHeader('Content-Type', 'text/plain');
  res.end(JSON.stringify({ message: 'OK' }));
};
