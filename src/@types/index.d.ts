type Edge = 'left' | 'right' | 'top' | 'bottom'

type ElementLayer = 'inner' | 'outer'

type HandleStyle = Record<ElementLayer, CSSProperties>

interface CropperStyles {
    handles: {
        common: HandleStyle
        left: HandleStyle
        right: HandleStyle
        bottom: HandleStyle
        top: HandleStyle
    }
    image: CSSProperties
    cropPolygon: CSSProperties
    container: CSSProperties
}

interface ICropperConfig {
    minCrop: number
    handleConfig: {
        edges: Array<Edge>
        height: number
        width: number
    }
    styles: CropperStyles
    imageAlt: string
    zeroDimensions: Dimensions
    hint: string
}

interface ScaleDimensions {
    height: number
    width: number
    isFullHeight?: boolean
    isFullWidth?: boolean
}

type SourceMeasurement = number
type DestMeasurement = number

type ScaleSpec = Record<
    'height' | 'width',
    [SourceMeasurement, DestMeasurement]
>

interface Dimensions extends ScaleDimensions {
    top: number
    left: number
}

interface BoundingBox {
    top: number
    bottom: number
    left: number
    right: number
}
interface CropperOutput {
    boundingBox?: BoundingBox
    imageUrl: string
}
