
import express from "express";

import { authenticate } from "../middleware/authenticate.js";
import { authorizeModification } from "../middleware/authorize.js";

import {
  getWatchlist,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../utils/db.js";

const router = express.Router();

// Require authentication for every watchlist route
router.use(authenticate);

// GET /api/watchlist/:userId
router.get("/:userId", (req, res) => {
  const userId = Number(req.params.userId);

  const watchlist = getWatchlist(userId);

  if (watchlist === null) {
    return res.status(404).json({
      error: "User not found.",
    });
  }

  return res.status(200).json({
    watchlist,
  });
});

// POST /api/watchlist/:userId/movies
router.post(
  "/:userId/movies",
  authorizeModification,
  (req, res) => {
    const userId = Number(req.params.userId);
    const { title, genre } = req.body || {};

    if (!title || !genre) {
      return res.status(400).json({
        error: "Title and genre are required.",
      });
    }

    const movie = addMovie(userId, {
      title,
      genre,
    });

    if (movie === null) {
      return res.status(404).json({
        error: "User not found.",
      });
    }

    return res.status(201).json({
      movie,
    });
  }
);

// PUT /api/watchlist/:userId/movies/:movieId
router.put(
  "/:userId/movies/:movieId",
  authorizeModification,
  (req, res) => {
    const userId = Number(req.params.userId);
    const movieId = Number(req.params.movieId);

    const updates = {};

    if (req.body?.title !== undefined) {
      updates.title = req.body.title;
    }

    if (req.body?.genre !== undefined) {
      updates.genre = req.body.genre;
    }

    if (req.body?.watched !== undefined) {
      updates.watched = req.body.watched;
    }

    const movie = updateMovie(
      userId,
      movieId,
      updates
    );

    if (movie === null) {
      return res.status(404).json({
        error: "Movie or user not found.",
      });
    }

    return res.status(200).json({
      movie,
    });
  }
);

// DELETE /api/watchlist/:userId/movies/:movieId
router.delete(
  "/:userId/movies/:movieId",
  authorizeModification,
  (req, res) => {
    const userId = Number(req.params.userId);
    const movieId = Number(req.params.movieId);

    const deleted = deleteMovie(
      userId,
      movieId
    );

    if (deleted === null) {
      return res.status(404).json({
        error: "Movie or user not found.",
      });
    }

    return res.status(200).json({
      message: "Movie deleted successfully.",
    });
  }
);

export default router;
