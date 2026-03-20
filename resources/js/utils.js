/**
 * Returns the correct image URL - handles both external URLs and local storage paths.
 * For dead external URLs (dryfruithouse.com), returns a placeholder.
 */
export function imageUrl(path) {
    if (!path) return null;
    // Dead external domain - return null so fallback UI shows
    if (path.includes('dryfruithouse.com')) {
        return null;
    }
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }
    return `/storage/${path}`;
}
