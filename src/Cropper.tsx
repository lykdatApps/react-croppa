import React, { useEffect, useRef, useState } from 'react'
import { config } from './config'
import { useElementDimensions, useScaledImage } from './hooks'
import { drag, dragFrom } from './helpers/actions'
import { finishCropping } from './helpers/image'
import { CropHandles } from './CropHandleGroup'

export interface Props {
    className?: string
    imageUrl: string
    minHeight?: number
    handleSize?: number
    initialBorderSize?: number
    onCropComplete: (cropped: CropperOutput) => any
    readyToUse: boolean
}

const Cropper: React.FC<Props> = (props) => {
    const {
        imageUrl,
        initialBorderSize = 0,
        onCropComplete,
        readyToUse
    } = props
    const halfHandleWidth = config.handleConfig.width / 2
    // const adjustedInitialBorderSize = Math.max(
    //     initialBorderSize,
    //     halfHandleWidth
    // )
    const cropperRef = useRef<HTMLDivElement | null>(null)
    const imageRef = useRef<HTMLImageElement | null>(null)
    const [activeCropEdge, setActiveCropEdge] = useState('')
    const [imageLoaded, setImageLoaded] = useState(false)
    const cropperDimensions = useElementDimensions(cropperRef)
    const scaledImageSpec =
        useScaledImage({
            boxRef: cropperRef,
            imageRef,
            deps: [imageLoaded, imageRef]
        }) || config.imageSpec
    const [crop, setCrop] = useState(config.cropSpec)
    // setCrop({
    //     top: imd.top + adjustedInitialBorderSize,
    //     left: imd.left + adjustedInitialBorderSize,
    //     height: imd.height - adjustedInitialBorderSize * 2,
    //     width: imd.width - adjustedInitialBorderSize * 2
    // })

    useEffect(() => {
        if (readyToUse) {
            onFinish()
        }
    }, [readyToUse])

    const onDrop = () => {
        setActiveCropEdge('')
    }

    const onDrag = (evt: React.MouseEvent | React.TouchEvent) => {
        drag(
            evt,
            cropperDimensions,
            activeCropEdge,
            scaledImageSpec,
            halfHandleWidth,
            crop,
            30,
            setCrop
        )
    }

    const onEdgeGrab = (edge: string) => {
        return dragFrom(edge, setActiveCropEdge)
    }

    const onFinish = () => {
        finishCropping(imageUrl, crop, scaledImageSpec, onCropComplete)
    }

    // seems not to be triggered only with document.onmouseup
    document.onmouseup = onDrop

    const handles = (
        <CropHandles
            {...{
                onDrag,
                onDrop,
                onEdgeGrab,
                edges: config.handleConfig.edges,
                styles: config.styles.handles
            }}
        />
    )

    return (
        <div>
            <div>{config.hint}</div>
            <div ref={cropperRef}>
                <img
                    style={config.styles.image}
                    src={imageUrl}
                    ref={imageRef}
                    onLoad={() => setImageLoaded(true)}
                    alt={config.imageAlt}
                />
                <div style={config.styles.cropPolygon}>{handles}</div>
            </div>
        </div>
    )
}

export default Cropper
