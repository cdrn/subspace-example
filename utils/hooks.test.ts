import BigNumber from "bignumber.js";
import { isExportDeclaration } from "typescript";
import { useSsc } from "./hooks";

describe("useBigNumber hook", () => {
    test("It should be able to take the described params and produce the correct BigNumber", () => {
        const stringInput = '1234512452351.23'
        const [num, setNum] = useSsc(stringInput);
        expect(num).toEqual(new BigNumber(stringInput))
    })
})