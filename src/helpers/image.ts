import { setBoundingBox } from './setters'
import { adjustPosition } from './utils'

export function createImage(url: string, setCors: boolean = true) {
    return new Promise((resolve: (value: HTMLImageElement) => void, reject) => {
        const image = new Image()
        image.addEventListener('load', () => resolve(image))
        image.addEventListener('error', (error) => reject(error))
        image.addEventListener('abort', (error) => reject(error))
        if (setCors) {
            // needed to avoid cross-origin issues on CodeSandbox
            image.setAttribute('crossOrigin', 'anonymous')
        }
        image.src = url
    })
}

export async function crop(
    imageURL: string,
    pixelCrop: Dimensions,
    imageSpec: Dimensions
) {
    const image = await createImage(imageURL)
    const canvas = document.createElement('canvas')
    const { width, height, left, top } = imageSpec
    const { naturalWidth, naturalHeight } = image
    const x1 = pixelCrop.left - left === 10 ? 0 : pixelCrop.left - left
    const y1 = pixelCrop.top - top === 10 ? 0 : pixelCrop.top - top
    const x1Ratio = x1 / width
    const y1Ratio = y1 / height
    const cropWidth =
        width - pixelCrop.width + pixelCrop.left === 10
            ? width
            : pixelCrop.width + 10
    const cropHeight =
        height - pixelCrop.height + pixelCrop.top === 10
            ? height
            : pixelCrop.height + 10

    const xDeltaRatio = cropWidth / width
    const yDeltaRatio = cropHeight / height
    const sourceX = x1Ratio * naturalWidth
    const sourceY = y1Ratio * naturalHeight
    const sourceW = xDeltaRatio * naturalWidth
    const sourceH = yDeltaRatio * naturalHeight
    canvas.width = sourceW
    canvas.height = sourceH
    const ctx = canvas.getContext('2d')
    if (!ctx) {
        throw 'Canvas 2d context is required for creating cropped image'
    }
    try {
        ctx.drawImage(
            image,
            sourceX,
            sourceY,
            sourceW,
            sourceH,
            0,
            0,
            sourceW,
            sourceH
        )

        // As a blob
        return await new Promise((resolve) =>
            canvas.toBlob(resolve, 'image/jpeg')
        )
    } catch (error) {
        console.log(error)
    }
}

export async function finishCropping(
    imageUrl: string,
    cropSpec: Dimensions,
    imageSpec: Dimensions,
    onCropComplete: (cropped: any) => any
): Promise<void> {
    const imageData: CropperOutput = { imageUrl }
    setBoundingBox(imageData, cropSpec, imageSpec)
    const cropped = await crop(imageUrl, cropSpec, imageSpec)
    onCropComplete(cropped)
}

export function resizeImage(scaleSpec: ScaleSpec): Dimensions {
    const [imgHeight, containerHeight] = scaleSpec.height
    const [imgWidth, containerWidth] = scaleSpec.width
    let isFullHeight,
        isFullWidth = false
    let height,
        width,
        widthExcess,
        heightExcess = 0
    if (!(imgHeight && imgWidth)) {
        height = containerWidth
        width = containerWidth
    } else {
        width = imgWidth
        height = imgHeight
    }
    const ratio = imgWidth / imgHeight
    if (!containerHeight) {
        height = containerWidth / ratio
        width = containerWidth
        isFullWidth = true
    }
    if (!containerWidth) {
        height = containerHeight
        width = containerHeight * ratio
        isFullHeight = true
    }

    widthExcess = imgWidth / containerWidth - 1.0
    heightExcess = imgHeight / containerHeight - 1.0
    if (widthExcess > heightExcess) {
        width = containerWidth
        height = Math.ceil(containerWidth / ratio)
        isFullWidth = true
    } else if (widthExcess < heightExcess) {
        height = containerHeight
        width = Math.floor(containerHeight * ratio)
        isFullHeight = true
    } else {
        height = containerHeight
        width = containerWidth
        isFullHeight = true
        isFullWidth = true
    }

    return {
        ...adjustPosition({
            height: [height, containerHeight],
            width: [width, containerWidth]
        }),
        isFullHeight,
        isFullWidth
    }
}
