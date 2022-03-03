class CropperConfig implements ICropperConfig {
    handleConfig: ICropperConfig['handleConfig']
    styles: CropperStyles
    imageAlt: string
    cropSpec: Dimensions
    imageSpec: Dimensions
    hint: string
    theme = {
        size: { small: '8px', medium: '16px', large: '32px' },
        space: { small: '8px', medium: '16px', large: '32px' },
        color: { white: '#fff', grayDark: '#232323' }
    }
    constructor() {
        this.handleConfig = {
            edges: ['top', 'right', 'left', 'bottom'],
            height: 20,
            width: 20
        }
        this.imageAlt = 'Image to crop'
        this.cropSpec = {
            top: 0,
            left: 0,
            height: 0,
            width: 0
        }
        this.styles = {
            handles: {
                common: {
                    inner: {
                        touchAction: 'none',
                        background: this.theme.color.white,
                        border: `3px solid ${this.theme.color.grayDark}`,
                        borderRadius: '50%',
                        cursor: 'grab'
                    },
                    outer: {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute'
                    }
                },
                top: {
                    inner: {
                        top: '-100%',
                        left: '50%',
                        transform: 'translateX(-50%)'
                    },
                    outer: {
                        top: `-${parseInt(this.theme.size.large) / 2}px`,
                        left: 0,
                        right: 0,
                        height: this.theme.size.large
                    }
                },
                left: {
                    inner: {
                        left: '-100%',
                        top: '50%',
                        transform: 'translateY(-50%)'
                    },
                    outer: {
                        left: `-${parseInt(this.theme.size.large) / 2}px`,
                        top: 0,
                        bottom: 0,
                        width: this.theme.size.large
                    }
                },
                bottom: {
                    inner: {
                        bottom: '-100%',
                        left: '50%',
                        transform: 'translateX(-50%)'
                    },
                    outer: {
                        bottom: `-${parseInt(this.theme.size.large) / 2}px`,
                        left: 0,
                        right: 0,
                        height: this.theme.size.large
                    }
                },
                right: {
                    inner: {
                        left: '100%',
                        top: '50%',
                        transform: 'translateY(-50%)'
                    },
                    outer: {
                        bottom: 0,
                        top: 0,
                        left: `calc(100% - ${
                            parseInt(this.theme.size.large) / 2
                        }px)`,
                        width: this.theme.size.large
                    }
                }
            },
            image: {
                height: '100%',
                width: '100%',
                objectFit: 'contain',
                objectPosition: 'center'
            },
            cropPolygon: {
                position: 'absolute',
                top: '50%',
                left: '50%',
                background: 'transparent',
                height: '80px',
                width: '90px',
                boxShadow: `10px 10px 200vw 200vh rgba(255,255,255,0.6)`
            },
            container: {
                height: '30vh',
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
                touchAction: 'none',
                marginBottom: this.theme.space.medium
            }
        }
        this.imageSpec = this.cropSpec
        this.hint = 'Drag to crop'
    }
}

export const config = new CropperConfig()
