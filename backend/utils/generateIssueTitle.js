/**
 * Generates a title for a civic issue or report based on category, location, description, and photo info.
 * @param {Object} params
 * @param {string} params.category - The type of civic issue (e.g., 'pothole').
 * @param {string} params.locationString - Human-readable location (from reverseGeocode).
 * @param {string} params.description - User-provided description.
 * @param {string|string[]} params.photo - URL(s) or info about the photo(s).
 * @returns {string} Generated title.
 */
export function generateIssueTitle({ category, locationString, description, photo }) {
  let photoText = '';
  if (Array.isArray(photo)) {
    photoText = photo.length > 0 ? 'photos are provided' : 'no photo provided';
  } else {
    photoText = photo ? 'photo is provided' : 'no photo provided';
  }
  return `There is a [${category}] in location [${locationString}] with the [description: ${description}] and [${photoText}] as taken from the [${locationString}].`;
}

/**
 * Express middleware to generate and attach a title to req.body before creating an issue or report.
 * Assumes req.body has category, locationString, description, and photo fields.
 */
export function attachGeneratedTitle(req, res, next) {
  const { category, locationString, description, photo } = req.body;
  req.body.title = generateIssueTitle({ category, locationString, description, photo });
  next();
}
