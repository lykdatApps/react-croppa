import { getClientPosition } from './getters'
import { setCropByCase } from './setters'

export function drag(
    evt: React.MouseEvent | React.TouchEvent,
    cropperDimensions: Dimensions | null,
    activeCropEdge: string,
    imageSpec: Dimensions,
    halfHandle: number,
    crop: Dimensions,
    tripleHandle: number,
    setCrop: React.Dispatch<React.SetStateAction<Dimensions>>
): void {
    if (!cropperDimensions) {
        return
    }
    // What needs to be done is to listen for mouse move event on the document
    // if the mouse moves outside the bounds, then just update the cropper edge to
    // be at the boundary
    evt.preventDefault()
    evt.stopPropagation()
    if (!activeCropEdge) {
        return
    }
    let [clientX, clientY] = getClientPosition(evt)
    clientX -= cropperDimensions.left
    clientY -= cropperDimensions.top
    setCropByCase(
        activeCropEdge,
        imageSpec,
        halfHandle,
        crop,
        tripleHandle,
        clientX,
        clientY,
        setCrop
    )
}

export function dragFrom(
    edge: string,
    setActiveCropEdge: React.Dispatch<React.SetStateAction<string>>
): (evt: React.MouseEvent | React.TouchEvent) => void {
    return (evt: React.MouseEvent | React.TouchEvent) => {
        evt.preventDefault()
        evt.stopPropagation()
        setActiveCropEdge(edge)
    }
}
