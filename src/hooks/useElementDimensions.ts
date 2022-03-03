import { useEffect, useState } from 'react'
import { deepEqual } from '../helpers/utils'

/**
 *
 * Takes a ref and returns the dimensions of the referenced element
 *
 */

export function useElementDimensions(
    ref: React.RefObject<HTMLElement>,
    deps: any[] = []
): Dimensions | null {
    const [elementDimensions, setElementDimensions] =
        useState<Dimensions | null>(null)

    const effectAction = () => {
        if (ref && ref.current) {
            const newElementDimensions: Dimensions = {
                width: Math.floor(ref.current.getBoundingClientRect().width),
                height: Math.floor(ref.current.getBoundingClientRect().height),
                top: Math.floor(ref.current.getBoundingClientRect().top),
                left: Math.floor(ref.current.getBoundingClientRect().left)
            }

            if (
                !deepEqual(
                    elementDimensions as any,
                    newElementDimensions as any
                )
            ) {
                setElementDimensions(newElementDimensions)
            }
        }
    }

    deps.length
        ? useEffect(effectAction, [...deps, ref])
        : useEffect(effectAction)

    return elementDimensions
}
