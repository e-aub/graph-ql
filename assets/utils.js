export function formatBytes(bytes) {
    if (bytes < 1000) return `${bytes} B`;
    if (bytes < 1000 * 1000) return `${(Math.round(bytes / 1000).toFixed(2))} KB`;
    if (bytes < 1000 * 1000 * 1000) return `${(Math.round(bytes / (1000 * 1000)).toFixed(2))} MB`;
    return `${(Math.round(bytes / (1000 * 1000 * 1000)).toFixed(2))} GB`;
}