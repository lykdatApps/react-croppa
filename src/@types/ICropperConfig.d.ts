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
    handleConfig: {
        edges: Array<Edge>
        height: number
        width: number
    }
    styles: CropperStyles
    imageAlt: string
    cropSpec: Dimensions
    imageSpec: Dimensions
    hint: string
}
