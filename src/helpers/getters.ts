import React from 'react'

export function getLimit(limitFirstVal: number, limitSecondVal: number) {
    let limit: number[] = []
    return (limit = [limitFirstVal, limitSecondVal])
}

export function getNewCropTop(newCropTopVal: number): number {
    let newCropTop: number
    return (newCropTop = newCropTopVal)
}

export function getNewCropHeight(newCropHeightVal: number): number {
    let newCropHeight: number
    return (newCropHeight = newCropHeightVal)
}

export function getNewCropWidth(newCropWidthVal: number): number {
    let newCropWidth: number
    return (newCropWidth = newCropWidthVal)
}

export function getNewCropLeft(newCropLeftVal: number): number {
    let newCropLeft: number
    return (newCropLeft = newCropLeftVal)
}

export function getClientPosition(
    evt: React.MouseEvent | React.TouchEvent
): [number, number] {
    let clientX = 0
    let clientY = 0
    if ((evt as React.MouseEvent).clientX) {
        const mouseEvt = evt as React.MouseEvent
        clientX = mouseEvt.clientX
        clientY = mouseEvt.clientY
    }
    if ((evt as React.TouchEvent).touches) {
        const touchEvt = evt as React.TouchEvent
        clientX = touchEvt.touches[0].clientX
        clientY = touchEvt.touches[0].clientY
    }
    return [clientX, clientY]
}
