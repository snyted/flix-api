// Middleware logging
export default function logGlobal(req, res, next) {
    console.log("Requisição feita: " + req.method);
    next();
  }