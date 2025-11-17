import {
  getAllFavorites,
  toggleFavorite,
  updateOrAddRate,
  updateOrAddReview,
  getMediaFromTmdb,
  trendingFromTmdb,
  findOrCreateMedia,
  getAllRates,
  getAllReviews,
} from "../services/mediasServices.js";
import { ApiError } from "../utils/ApiError.js";

import { validateMedia, validateRating } from "../utils/validators.js";

// ------ GETS -------
export async function getTrending(req, res) {
  const { mediaType } = req;
  try {
    const medias = await trendingFromTmdb(mediaType);
    res.json(medias);
  } catch (err) {
    next(err);
  }
}

export async function searchingMedia(req, res) {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: "Parâmetro 'q' é obrigatório" });
  }

  try {
    const movies = await getMediaFromTmdb(q);
    res.status(200).json(movies);
  } catch (err) {
    next(err);
  }
}

export async function findMediaById(req, res, next) {
  const { id } = req.params;
  const { mediaType } = req;
  try {
    const media = await findOrCreateMedia(id, mediaType);
    validateMedia(media);
    res.status(200).json(media);
  } catch (err) {
    next(err);
  }
}

export async function showFavorites(req, res, next) {
  const { id } = req.user;
  try {
    const result = await getAllFavorites(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function showRates(req, res, next) {
  const { id } = req.user;

  try {
    const result = await getAllRates(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function showReviews(req, res, next) {
  const { id } = req.user;

  try {
    const result = await getAllReviews(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

// ------- PUT's -------
export async function toggleFavoriteController(req, res, next) {
  const { id: mediaId } = req.params;
  const { id: userId } = req.user;
  const { mediaType } = req;

  if (!mediaId || !mediaType) {
    throw new ApiError(400, "ID ou tipo não informados.");
  }

  try {
    const result = await toggleFavorite(userId, mediaId, mediaType);
    return res.status(result.favorited ? 201 : 200).json({
      message: result.favorited
        ? "Filme/Serie favoritado com sucesso!"
        : "Filme/Serie removido dos favoritos",
      ...result,
    });
  } catch (err) {
    next(err);
  }
}

export async function putRate(req, res, next) {
  const { id: mediaId } = req.params;
  const { id: userId } = req.user;
  const { rating } = req.body;
  const { mediaType } = req;

  if (!rating) {
    return res.send("Nota não fornecida.");
  }

  try {
    const result = await updateOrAddRate(userId, mediaId, mediaType, rating);

    return res.json({ message: "Nota adicionada com sucesso." });
  } catch (err) {
    next(err);
  }
}

export async function putReview(req, res, next) {
  const { id: mediaId } = req.params;
  const { id: userId } = req.user;
  const { content } = req.body;
  const { mediaType } = req;

  if (!content) {
    return res.status(204).send("Review não fornecida. Verifique o formato.");
  }

  try {
    const { message, data } = await updateOrAddReview(
      userId,
      mediaId,
      mediaType,
      content
    );

    return res.json({ message, data });
  } catch (err) {
    next(err);
  }
}
