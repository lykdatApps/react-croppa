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
