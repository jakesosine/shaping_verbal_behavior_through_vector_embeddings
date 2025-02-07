export function cosineSimilarity(vectorA: number[], vectorB: number[]): number {
    if (vectorA.length !== vectorB.length) {
        throw new Error("Vectors must be of the same length.");
    }

    // Calculate the dot product and the norms of each vector.
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vectorA.length; i++) {
        dotProduct += vectorA[i] * vectorB[i];
        normA += vectorA[i] ** 2;
        normB += vectorB[i] ** 2;
    }

    normA = Math.sqrt(normA);
    normB = Math.sqrt(normB);

    // Ensure neither vector is a zero vector.
    if (normA === 0 || normB === 0) {
        throw new Error("Cannot compute cosine similarity for a zero vector.");
    }

    return dotProduct / (normA * normB);
}

