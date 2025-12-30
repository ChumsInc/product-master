import {type ColorInput, mostReadable, TinyColor} from "@ctrl/tinycolor";

export function getSeasonStyle(color: ColorInput) {
    return {
        backgroundColor: new TinyColor(color).toHexString(),
        color: mostReadable(color, ['#FFF', '#000'], {
            includeFallbackColors: true,
            size: "small",
            level: 'AA'
        })?.toHexString() ?? '#F00',
        border: 'none',
    };
}
