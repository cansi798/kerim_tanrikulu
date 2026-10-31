import { de } from "./de";
import { tr } from "./tr";
import type { Lang } from "../i18n";

export const T = { de, tr };
export const t = (lang: Lang) => T[lang];
export type { Texte } from "./de";
