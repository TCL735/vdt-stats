export type DayTrip = [number, Array<number>, Array<string>];
export type HandleConsecutiveRepeatValueAs = "first" | "last" | "always";
export type TableRowDataType = string | number;
export type WindowDimensions = {
  height: number;
  width: number;
};

export const AIRPORT = "Airport";
export const ALIANTE = "Aliante";
export const ARIA = "Aria";
export const ARIA_AND_BELLAGIO = "Aria & Bellagio";
export const BELLAGIO = "Bellagio";
export const CAESARS_PALACE = "Caesars Palace";
export const CASINO_ROYALE = "Casino Royale";
export const CET = "CET";
export const CIRCA_AND_D = "Cira and D";
export const COSMO = "Cosmopolitan";
export const DURANGO = "Durango";
export const EL_CORTEZ = "El Cortez";
export const ENCORE = "Encore";
export const EXCALIBUR = "Excalibur";
export const FLAMINGO = "Flamingo";
export const FONTAINEBLEAU = "Fontainebleau";
export const GREEN_VALLEY_RANCH = "Green Valley Ranch";
export const LUXOR = "Luxor";
export const MANDALAY_BAY = "Mandalay Bay";
export const MGM = "MGM";
export const MGM_GRAND = "MGM Grand";
export const MIRAGE = "Mirage";
export const PALAZZO = "Palazzo";
export const PALMS = " Palms";
export const PARIS = "Paris";
export const PARK_MGM = "Park MGM";
export const PLAZA = "Plaza";
export const RESORTS_WORLD = "Resorts World";
export const RIO = "Rio";
export const STRAT = "The Strat";
export const VENETIAN = "Venetian";
export const VP = "Venetian / Palazzo";
export const WYNN = "Wynn";

export const NEGATIVE_CURRENCY_TEXT_COLOR = "text-red-500";
export const POSITIVE_CURRENCY_TEXT_COLOR = "text-black";
export const SELECTED_BORDER_STYLE = "border-b-[0.2rem] border-black/100";

export const enum TABS {
  _2025 = "2025",
  _2024 = "2024",
  _2023 = "2023",
  ALL_TIME = "ALL TIME",
}

export const enum ROUTES {
  STATS_2025 = "/stats/2025",
  STATS_2024 = "/stats/2024",
  STATS_2023 = "/stats/2023",
  STATS_ALL_TIME = "/stats/all-time",
}
