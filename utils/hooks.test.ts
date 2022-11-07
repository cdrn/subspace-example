
// __tests__/hidden-message.js
// these imports are something you'd normally configure Jest to import for you
// automatically. Learn more in the setup docs: https://testing-library.com/docs/react-testing-library/setup#cleanup
import '@testing-library/jest-dom'
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import * as React from 'react';
import {renderHook, act} from '@testing-library/react';
import BigNumber from "bignumber.js";
import { useSsc } from "./hooks";

describe("useBigNumber hook", () => {
    test("It should be able to take the described params and produce the correct BigNumbers", () => {
        const stringInput = '1234512452351'
        const { result } = renderHook(() => useSsc(stringInput));
        const [planckVal, setPlanckVal, sscVal] = result.current
        expect(planckVal?.toString()).toEqual(new BigNumber(stringInput).toString());
        expect(sscVal?.toString()).toEqual(new BigNumber(stringInput).dividedBy(10**10).toString())
    })

    test("It handles numbers correctly", () => {
        const numberInput = 12412324
        const { result } = renderHook(() => useSsc(numberInput));
        const [planckVal, setPlanckVal, sscVal] = result.current
        expect(planckVal?.toString()).toEqual(new BigNumber(String(numberInput)).toString());
        expect(sscVal?.toString()).toEqual(new BigNumber(String(numberInput)).dividedBy(10**10).toString())
    })

    test("It handles BIG numbers", () => {
        const numberInput = "1241232123145891359819832984139850102934904103481208444"
        const { result } = renderHook(() => useSsc(numberInput));
        const [planckVal, setPlanckVal, sscVal] = result.current
        expect(planckVal?.toString()).toEqual(new BigNumber(String(numberInput)).toString());
        expect(sscVal?.toString()).toEqual(new BigNumber(String(numberInput)).dividedBy(10**10).toString())
    })
})