import {
    getLimit,
    getNewCropTop,
    getNewCropHeight,
    getNewCropLeft,
    getNewCropWidth
} from './getters'

export function setTop(
    limitFirstVal: number,
    limitSecondVal: number,
    clientY: number,
    newCropHeightVal: number
): [number, number] {
    const limit = getLimit(limitFirstVal, limitSecondVal)
    const newCropTopVal =
        clientY < limit[0] ? limit[0] : Math.min(clientY, limit[1])
    const newCropTop = getNewCropTop(newCropTopVal)
    const newCropHeight = getNewCropHeight(newCropHeightVal - newCropTop)
    return [newCropTop, newCropHeight]
}

export function setRight(
    limitFirstVal: number,
    limitSecondVal: number,
    clientX: number,
    crop: Dimensions
): number {
    const limit = getLimit(limitFirstVal, limitSecondVal)
    const newCropWidthVal =
        (clientX < limit[0] ? limit[0] : Math.min(limit[1], clientX)) -
        crop.left
    return getNewCropWidth(newCropWidthVal)
}

export function setBottom(
    limitFirstVal: number,
    limitSecondVal: number,
    clientY: number,
    crop: Dimensions
): number {
    const limit = getLimit(limitFirstVal, limitSecondVal)
    const newCropHeightVal =
        (clientY < limit[0] ? limit[0] : Math.min(clientY, limit[1])) - crop.top
    return getNewCropHeight(newCropHeightVal)
}

export function setLeft(
    limitFirstVal: number,
    limitSecondVal: number,
    clientX: number,
    crop: Dimensions
): [number, number] {
    const limit = getLimit(limitFirstVal, limitSecondVal)
    const newCropLeftVal =
        clientX < limit[0] ? limit[0] : Math.min(clientX, limit[1])
    const newCropLeft = getNewCropLeft(newCropLeftVal)
    const newCropWidth = crop.width + crop.left - newCropLeft
    return [newCropLeft, newCropWidth]
}

export function setCropByCase(
    activeCropEdge: string,
    imageDetails: Dimensions,
    halfHandle: number,
    crop: Dimensions,
    tripleHandle: number,
    clientX: number,
    clientY: number,
    setCrop: React.Dispatch<React.SetStateAction<Dimensions>>
): void {
    switch (activeCropEdge) {
        case 'top':
            const [newCropTop, newCropHeightTop] = setTop(
                imageDetails.top + halfHandle,
                crop.top + crop.height - tripleHandle,
                clientY,
                crop.height + crop.top
            )
            setCrop((oldCrop) => ({
                ...oldCrop,
                top: newCropTop,
                height: newCropHeightTop
            }))
            break
        case 'right':
            const newCropWidthRight = setRight(
                crop.left + tripleHandle,
                imageDetails.left + imageDetails.width - halfHandle,
                clientX,
                crop
            )
            setCrop((oldCrop) => ({
                ...oldCrop,
                width: newCropWidthRight
            }))
            break
        case 'bottom':
            const newCropHeightBottom = setBottom(
                crop.top + tripleHandle,
                imageDetails.top + imageDetails.height - halfHandle,
                clientY,
                crop
            )
            setCrop((oldCrop) => ({
                ...oldCrop,
                height: newCropHeightBottom
            }))
            break
        case 'left':
            const [newCropLeft, newCropWidth] = setLeft(
                imageDetails.left + halfHandle,
                crop.left + crop.width - tripleHandle,
                clientX,
                crop
            )
            setCrop((oldCrop) => ({
                ...oldCrop,
                left: newCropLeft,
                width: newCropWidth
            }))
            break
        default:
            break
    }
}

export function setBoundingBox(
    imageData: CropperOutput,
    crop: Dimensions,
    imageDetails: Dimensions
): void {
    if (crop.left || crop.top || crop.width || crop.height) {
        imageData.boundingBox = {
            top: (crop.top - imageDetails.top) / imageDetails.height,
            left: (crop.left - imageDetails.left) / imageDetails.width,
            right:
                (crop.left - imageDetails.left) / imageDetails.width +
                crop.width / imageDetails.width,
            bottom:
                (crop.top - imageDetails.top) / imageDetails.height +
                crop.height / imageDetails.height
        }
    }
}
