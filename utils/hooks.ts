// Re-usable hooks for our application

import { useState } from 'react'
import BigNumber from 'bignumber.js'

export type usePlanckInput = BigNumber | string | number | undefined
export type UsePlanckReturn = [BigNumber | undefined, (value: useBigNumberInput) => void, BigNumber | undefined]

// Allows us to store SSC vals as base units -- in this case, i am assuming plancks.
// This can be extended to allow for omnidirectional setting/retrieval, such that we:
// 1) Preserve floating point integrity with values greater than 2^53
// 2) Are able to retrieve and set values in both units with a clear interface for a single variable.
export function useSsc(defaultValue: usePlanckInput): UsePlanckReturn {
    const [planckVal, setPlanckVal] = useState<BigNumber | undefined>()
    const [sscVal, setSscVal] = useState<BigNumber | undefined>()


    // Coerce our input value to a big number, and then set it in the local useState
    const setPlanckValExternal = (value: useBigNumberInput) => {
        if (value === undefined) return; // Escape hatch as BigNumber can't handle undefined

        let coercedVal = value;
        if (typeof value === "number") {
            coercedVal = value.toString()
        }

        coercedVal as BigNumber | string
        const bignumberifiedVal = new BigNumber(coercedVal);
        setPlanckVal(bignumberifiedVal)
        setSscVal(bignumberifiedVal.dividedBy(10**10))
    }

    return [planckVal, setPlanckValExternal, sscVal]
}