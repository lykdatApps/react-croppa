import { useEffect, useState } from 'react'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import { resizeImage } from '../helpers/image'
import { useElementDimensions } from './useElementDimensions'

interface Params {
    boxRef: React.MutableRefObject<HTMLDivElement | null>
    imageRef: React.MutableRefObject<HTMLImageElement | null>
    deps: any[]
}

export function useScaledImage(params: Params): Dimensions | null {
    const { boxRef, imageRef, deps } = params
    const [imageSpec, setImageSpec] = useState(useElementDimensions(imageRef))
    const boxDimensions = useElementDimensions(boxRef)

    useEffect(() => {
        if (!boxDimensions) {
            return
        }
        if (!(imageRef && imageRef.current)) {
            return
        }
        const image = imageRef.current
        const scaleSpec: ScaleSpec = {
            height: [image.naturalHeight, boxDimensions.height],
            width: [image.naturalWidth, boxDimensions.width]
        }

        setImageSpec(resizeImage(scaleSpec))
        // disable scrolls from weird iOS scroll behaviour
        disableBodyScroll(imageRef.current)
        // re-enable scroll after unmount
        return () => clearAllBodyScrollLocks()
    }, [...deps])
    return imageSpec
}
