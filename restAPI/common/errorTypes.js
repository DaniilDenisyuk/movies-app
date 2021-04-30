export const errorTypes = {
  Forbidden: "ForbiddenError",
  NotFound: "NotFoundError",
  Validation: "ValidationError",
  Unathorized: "UnauthorizedError",
};

export const ForbiddenError = (message = "") => ({
  name: errorTypes.Forbidden,
  message,
});

export const NotFoundError = (message = "") => ({
  name: errorTypes.NotFound,
  message,
});

export const ValidationError = (message = "") => ({
  name: errorTypes.Validation,
  message,
});

export const UnathorizedError = (message = "") => ({
  name: errorTypes.Unathorized,
  message,
});
