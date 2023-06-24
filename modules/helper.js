export async function processArrayInChunks({ array, batchSize = array.length, delay = 0, asyncOperation }) {
    let index = 0;
    const results = []

    async function processChunk() {
        const endIndex = Math.min(index + batchSize, array.length);
        const chunk = array.slice(index, endIndex);

        // Process the chunk asynchronously
        results.push(await asyncOperation(chunk))

        index += batchSize;

        if (index < array.length) {
            if (delay) await new Promise((resolve) => {
                setTimeout(async () => {
                    resolve(await processChunk())
                }, delay);
            })
            else await processChunk()
        }
    }

    await processChunk();

    const isAllArray = !results.find(r => !Array.isArray(r))
    if (isAllArray) return [].concat(...results)
    return results
}