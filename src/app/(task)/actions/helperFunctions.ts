export const cosineSim = (A: (number)[], B: (number)[]) => {
    let dotproduct = 0;
    let mA = 0;
    let mB = 0;

    for (let i = 0; i < A.length; i++) {
        if (A[i] !== undefined && B[i] !== undefined) {
            dotproduct += A[i] * B[i];
            mA += A[i] * A[i];
            mB += B[i] * B[i];
        }
    }

    mA = Math.sqrt(mA);
    mB = Math.sqrt(mB);

    // Prevent division by zero
    if (mA === 0 || mB === 0) {
        return { similarity: 0, dotproduct: 0 };
    }

    const similarity = dotproduct / (mA * mB);

    return { similarity, dotproduct };
}