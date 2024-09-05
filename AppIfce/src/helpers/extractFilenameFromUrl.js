export function extractFilenameFromUrl(url) {
    const vectorUrl = url.split('/')
    const nameWithExtension = vectorUrl[vectorUrl.length - 1]
    const name = nameWithExtension.split('.')[0]

    return name
}