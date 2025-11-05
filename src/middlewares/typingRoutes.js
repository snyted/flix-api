export function typingRoutes(type) {
  return function (req, res, next) {
    if (type !== "movie" && type !== "tv") {
      throw new Error(`Tipo inválido: ${type}. Use 'movie ou 'tv'`);
    }
    req.type = type;
    next();
  };
}
