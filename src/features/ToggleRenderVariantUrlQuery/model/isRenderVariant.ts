import { Guards } from "../../../processes";
import { defRenderVariants, RenderVariant } from "./types";

const isRenderVariant = (value: unknown): value is string => {
    return (
        Guards.isString(value) && defRenderVariants.includes(value as RenderVariant)
    );
};

export { isRenderVariant }