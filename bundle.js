;(function (React, bodyScrollLock) {
    'use strict'

    function _interopDefaultLegacy(e) {
        return e && typeof e === 'object' && 'default' in e ? e : { default: e }
    }

    var React__default = /*#__PURE__*/ _interopDefaultLegacy(React)

    class CropperConfig {
        constructor() {
            this.theme = {
                size: { small: '8px', medium: '16px', large: '32px' },
                space: { small: '8px', medium: '16px', large: '32px' },
                color: { white: '#fff', grayDark: '#232323' }
            }
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
    const config = new CropperConfig()

    function deepEqual(x, y) {
        // note that this function is naive in the sense that it expects that no key-pair value
        // should have an 'object' value
        const sameKeys = Object.keys(x).length === Object.keys(y).length
        return Object.keys(x).every((key) => x[key] === y[key]) && sameKeys
    }
    function adjustPosition(scaleSpec) {
        const [height, containerHeight] = scaleSpec.height
        const [width, containerWidth] = scaleSpec.width
        const hDelta = containerHeight - height
        const wDelta = containerWidth - width
        const top = hDelta / 2
        const left = wDelta / 2
        return { height, width, top, left }
    }
    function getHandleStyle(edge, styleConfig) {
        switch (edge) {
            case 'bottom':
                return styleConfig.bottom
            case 'top':
                return styleConfig.top
            case 'left':
                return styleConfig.left
            case 'right':
                return styleConfig.right
        }
    }

    /**
     *
     * Takes a ref and returns the dimensions of the referenced element
     *
     */
    function useElementDimensions(ref, deps = []) {
        const [elementDimensions, setElementDimensions] = React.useState(null)
        const effectAction = () => {
            if (ref && ref.current) {
                const newElementDimensions = {
                    width: Math.floor(
                        ref.current.getBoundingClientRect().width
                    ),
                    height: Math.floor(
                        ref.current.getBoundingClientRect().height
                    ),
                    top: Math.floor(ref.current.getBoundingClientRect().top),
                    left: Math.floor(ref.current.getBoundingClientRect().left)
                }
                if (!deepEqual(elementDimensions, newElementDimensions)) {
                    setElementDimensions(newElementDimensions)
                }
            }
        }
        deps.length
            ? React.useEffect(effectAction, [...deps, ref])
            : React.useEffect(effectAction)
        return elementDimensions
    }

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value)
                  })
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value))
                } catch (e) {
                    reject(e)
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value))
                } catch (e) {
                    reject(e)
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected)
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
            )
        })
    }

    function setTop(limitFirstVal, limitSecondVal, clientY, newCropHeightVal) {
        const limit = [limitFirstVal, limitSecondVal]
        const newCropTopVal =
            clientY < limit[0] ? limit[0] : Math.min(clientY, limit[1])
        const newCropTop = newCropTopVal
        const newCropHeight = newCropHeightVal - newCropTop
        return [newCropTop, newCropHeight]
    }
    function setRight(limitFirstVal, limitSecondVal, clientX, crop) {
        const limit = [limitFirstVal, limitSecondVal]
        const newCropWidthVal =
            (clientX < limit[0] ? limit[0] : Math.min(limit[1], clientX)) -
            crop.left
        return newCropWidthVal
    }
    function setBottom(limitFirstVal, limitSecondVal, clientY, crop) {
        const limit = [limitFirstVal, limitSecondVal]
        const newCropHeightVal =
            (clientY < limit[0] ? limit[0] : Math.min(clientY, limit[1])) -
            crop.top
        return newCropHeightVal
    }
    function setLeft(limitFirstVal, limitSecondVal, clientX, crop) {
        const limit = [limitFirstVal, limitSecondVal]
        const newCropLeftVal =
            clientX < limit[0] ? limit[0] : Math.min(clientX, limit[1])
        const newCropWidth = crop.width + crop.left - newCropLeftVal
        return [newCropLeftVal, newCropWidth]
    }
    function setCropByCase(
        activeCropEdge,
        imageDetails,
        halfHandle,
        crop,
        tripleHandle,
        clientX,
        clientY,
        setCrop
    ) {
        switch (activeCropEdge) {
            case 'top':
                const [newCropTop, newCropHeightTop] = setTop(
                    imageDetails.top + halfHandle,
                    crop.top + crop.height - tripleHandle,
                    clientY,
                    crop.height + crop.top
                )
                setCrop((oldCrop) =>
                    Object.assign(Object.assign({}, oldCrop), {
                        top: newCropTop,
                        height: newCropHeightTop
                    })
                )
                break
            case 'right':
                const newCropWidthRight = setRight(
                    crop.left + tripleHandle,
                    imageDetails.left + imageDetails.width - halfHandle,
                    clientX,
                    crop
                )
                setCrop((oldCrop) =>
                    Object.assign(Object.assign({}, oldCrop), {
                        width: newCropWidthRight
                    })
                )
                break
            case 'bottom':
                const newCropHeightBottom = setBottom(
                    crop.top + tripleHandle,
                    imageDetails.top + imageDetails.height - halfHandle,
                    clientY,
                    crop
                )
                setCrop((oldCrop) =>
                    Object.assign(Object.assign({}, oldCrop), {
                        height: newCropHeightBottom
                    })
                )
                break
            case 'left':
                const [newCropLeft, newCropWidth] = setLeft(
                    imageDetails.left + halfHandle,
                    crop.left + crop.width - tripleHandle,
                    clientX,
                    crop
                )
                setCrop((oldCrop) =>
                    Object.assign(Object.assign({}, oldCrop), {
                        left: newCropLeft,
                        width: newCropWidth
                    })
                )
                break
        }
    }
    function setBoundingBox(imageData, crop, imageDetails) {
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

    function createImage(url, setCors = true) {
        return new Promise((resolve, reject) => {
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
    function crop(imageURL, pixelCrop, imageSpec) {
        return __awaiter(this, void 0, void 0, function* () {
            const image = yield createImage(imageURL)
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
                return canvasToBlob(canvas)
            } catch (error) {
                console.log(error)
            }
        })
    }
    function finishCropping(imageUrl, cropSpec, imageSpec, onCropComplete) {
        return __awaiter(this, void 0, void 0, function* () {
            const imageData = { imageUrl }
            setBoundingBox(imageData, cropSpec, imageSpec)
            const cropped = yield crop(imageUrl, cropSpec, imageSpec)
            onCropComplete(cropped)
        })
    }
    function resizeImage(scaleSpec) {
        const [imgHeight, containerHeight] = scaleSpec.height
        const [imgWidth, containerWidth] = scaleSpec.width
        let isFullHeight = false,
            isFullWidth = false
        let height = 0,
            width = 0,
            widthExcess = 0,
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
        return Object.assign(
            Object.assign(
                {},
                adjustPosition({
                    height: [height, containerHeight],
                    width: [width, containerWidth]
                })
            ),
            { isFullHeight, isFullWidth }
        )
    }
    function canvasToBlob(canvas) {
        return new Promise(function (resolve) {
            canvas.toBlob(resolve)
        })
    }

    function useScaledImage(params) {
        const { boxRef, imageRef, deps } = params
        const [imageSpec, setImageSpec] = React.useState(
            useElementDimensions(imageRef)
        )
        const boxDimensions = useElementDimensions(boxRef)
        React.useEffect(() => {
            if (!boxDimensions) {
                return
            }
            if (!(imageRef && imageRef.current)) {
                return
            }
            const image = imageRef.current
            const scaleSpec = {
                height: [image.naturalHeight, boxDimensions.height],
                width: [image.naturalWidth, boxDimensions.width]
            }
            setImageSpec(resizeImage(scaleSpec))
            // disable scrolls from weird iOS scroll behaviour
            bodyScrollLock.disableBodyScroll(imageRef.current)
            // re-enable scroll after unmount
            return () => bodyScrollLock.clearAllBodyScrollLocks()
        }, [...deps])
        return imageSpec
    }

    function getClientPosition(evt) {
        let clientX = 0
        let clientY = 0
        if (evt.clientX) {
            const mouseEvt = evt
            clientX = mouseEvt.clientX
            clientY = mouseEvt.clientY
        }
        if (evt.touches) {
            const touchEvt = evt
            clientX = touchEvt.touches[0].clientX
            clientY = touchEvt.touches[0].clientY
        }
        return [clientX, clientY]
    }

    function drag(
        evt,
        cropperDimensions,
        activeCropEdge,
        imageSpec,
        halfHandle,
        crop,
        tripleHandle,
        setCrop
    ) {
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
    function dragFrom(edge, setActiveCropEdge) {
        return (evt) => {
            evt.preventDefault()
            evt.stopPropagation()
            setActiveCropEdge(edge)
        }
    }

    const CropHandles = (props) => {
        const { edges, styles, onEdgeGrab, onDrop, onDrag } = props
        return React__default['default'].createElement(
            React__default['default'].Fragment,
            null,
            edges.map((edge) => {
                const { inner, outer } = getHandleStyle(edge, styles)
                return React__default['default'].createElement(
                    'div',
                    {
                        key: edge,
                        className: `cropHandleContainer cropHandleContainer-${edge}`,
                        style: Object.assign(
                            Object.assign({}, styles.common.outer),
                            outer
                        ),
                        onTouchEnd: onDrop,
                        onTouchStart: onEdgeGrab(edge),
                        onTouchMove: onDrag,
                        onMouseMove: onDrag,
                        onMouseDown: onEdgeGrab(edge),
                        onMouseUp: onDrop
                    },
                    React__default['default'].createElement('div', {
                        style: Object.assign(
                            Object.assign({}, styles.common.inner),
                            inner
                        )
                    })
                )
            })
        )
    }

    function Cropper(props) {
        const {
            imageUrl,
            // initialBorderSize = 0,
            onCropComplete,
            readyToUse
        } = props
        const halfHandleWidth = config.handleConfig.width / 2
        // const adjustedInitialBorderSize = Math.max(
        //     initialBorderSize,
        //     halfHandleWidth
        // )
        const cropperRef = React.useRef(null)
        const imageRef = React.useRef(null)
        const [activeCropEdge, setActiveCropEdge] = React.useState('')
        const [imageLoaded, setImageLoaded] = React.useState(false)
        const cropperDimensions = useElementDimensions(cropperRef)
        const scaledImageSpec =
            useScaledImage({
                boxRef: cropperRef,
                imageRef,
                deps: [imageLoaded, imageRef]
            }) || config.imageSpec
        const [crop, setCrop] = React.useState(config.cropSpec)
        // setCrop({
        //     top: imd.top + adjustedInitialBorderSize,
        //     left: imd.left + adjustedInitialBorderSize,
        //     height: imd.height - adjustedInitialBorderSize * 2,
        //     width: imd.width - adjustedInitialBorderSize * 2
        // })
        React.useEffect(() => {
            if (readyToUse) {
                onFinish()
            }
        }, [readyToUse])
        const onDrop = () => {
            setActiveCropEdge('')
        }
        const onDrag = (evt) => {
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
        const onEdgeGrab = (edge) => {
            return dragFrom(edge, setActiveCropEdge)
        }
        const onFinish = () => {
            finishCropping(imageUrl, crop, scaledImageSpec, onCropComplete)
        }
        // seems not to be triggered only with document.onmouseup
        document.onmouseup = onDrop
        const handles = React__default['default'].createElement(
            CropHandles,
            Object.assign(
                {},
                {
                    onDrag,
                    onDrop,
                    onEdgeGrab,
                    edges: config.handleConfig.edges,
                    styles: config.styles.handles
                }
            )
        )
        return React__default['default'].createElement(
            'div',
            null,
            React__default['default'].createElement('div', null, config.hint),
            React__default['default'].createElement(
                'div',
                { ref: cropperRef },
                React__default['default'].createElement('img', {
                    style: config.styles.image,
                    src: imageUrl,
                    ref: imageRef,
                    onLoad: () => setImageLoaded(true),
                    alt: config.imageAlt
                }),
                React__default['default'].createElement(
                    'div',
                    { style: config.styles.cropPolygon },
                    handles
                )
            )
        )
    }

    return Cropper
})(React, bodyScrollLock)

console.log(Cropper)
