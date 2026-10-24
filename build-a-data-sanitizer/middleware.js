
export const inputCleaner = (req, res, next) => {
  if (req.body.username) {
    req.body.username = req.body.username.toLowerCase();
  }

  if (req.body.comment) {
    req.body.comment = req.body.comment.replace(/<[^>]*>/g, "");
  }

  next();
};

export const inputValidator = (req, res, next) => {
  if (
    typeof req.body.username === "string" &&
    req.body.username.length >= 3
  ) {
    return next();
  }

  return res.redirect(
    "/form?error=Username must be at least 3 characters."
  );
};
