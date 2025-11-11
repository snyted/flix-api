export function errorHandler(err, req, res, next) {
  console.error("🔥 Erro capturado:", err);

  const status = err.statusCode || 500;
  const message =
    err.message || "Erro interno no servidor. Tente novamente mais tarde.";

  return res.status(status).json({ message });
}
