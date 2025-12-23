import tinycolor from "tinycolor2";

export function getSeasonStyle(bg: string) {
    return {
        backgroundColor: bg,
        color: tinycolor(bg).isLight() ? 'black' : 'white'
    };
}
