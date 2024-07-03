import dayjs from 'dayjs';

export const AIRPORT = 'Airport';
export const ARIA = 'Aria';
export const ARIA_AND_BELLAGIO = 'Aria & Bellagio';
export const BELLAGIO = 'Bellagio';
export const CASINO_ROYALE = 'Casino Royale';
export const CET = 'CET';
export const CIRCA_AND_D = 'Cira and D';
export const COSMO = 'Cosmopolitan';
export const EL_CORTEZ = 'El Cortez';
export const ENCORE = 'Encore';
export const EXCALIBUR = 'Excalibur';
export const FLAMINGO = 'Flamingo';
export const FONTAINEBLEAU = 'Fontainebleau';
export const LUXOR = 'Luxor';
export const MANDALAY_BAY = 'Mandalay Bay';
export const MGM = 'MGM';
export const MGM_GRAND = 'MGM Grand';
export const MIRAGE = 'Mirage';
export const PALAZZO = 'Palazzo';
export const PARK_MGM = 'Park MGM';
export const RESORTS_WORLD = 'Resorts World';
export const VENETIAN = 'Venetian';
export const VP = 'Venetian/Palazzo';
export const WYNN = 'Wynn';

export const getRewardsProgramAbbreviation = (location: string): string => {
  switch (location) {
    case ARIA:
    case ARIA_AND_BELLAGIO:
    case BELLAGIO:
    case EXCALIBUR:
    case LUXOR:
    case MANDALAY_BAY:
    case MGM:
    case MGM_GRAND:
    case PARK_MGM:
      return MGM;

    case VENETIAN:
    case PALAZZO:
    case VP:
      return 'Venetian Rewards';

    case COSMO:
      return 'Identity';

    case CIRCA_AND_D:
      return 'One';

    case RESORTS_WORLD:
      return 'Genting';

    case MIRAGE:
      return 'Unity';

    case ENCORE:
    case WYNN:
      return 'Wynn';

    case FLAMINGO:
      return 'CET';

    case FONTAINEBLEAU:
      return 'Fontainebleau Rewards';

    default:
      return location;
  }
};

export type DayTrip = [number, Array<number>, Array<string>];
export const dayTrips2023: Array<DayTrip> = [
  [dayjs('2023-01-11').valueOf(), [10095], [BELLAGIO]],
  [dayjs('2023-01-18').valueOf(), [585], [MANDALAY_BAY]],
  [dayjs('2023-01-25').valueOf(), [-9100], [PALAZZO]],

  [dayjs('2023-02-08').valueOf(), [9575, -1350], [MANDALAY_BAY, VP]],
  [dayjs('2023-02-14').valueOf(), [-11700], [ARIA]],
  [dayjs('2023-02-15').valueOf(), [0, -980, -1200], [CET, MGM, VP]],
  [dayjs('2023-02-21').valueOf(), [-13400], [PALAZZO]],

  [dayjs('2023-03-01').valueOf(), [-100, -1460], [PALAZZO, MGM]],
  [dayjs('2023-03-15').valueOf(), [5100], [ARIA]],
  [dayjs('2023-03-22').valueOf(), [-2900, -2000], [MGM, PALAZZO]],
  [dayjs('2023-03-29').valueOf(), [5100], [BELLAGIO]],

  [
    dayjs('2023-04-05').valueOf(),
    [-3000, 2075, -20],
    [CIRCA_AND_D, PALAZZO, MGM],
  ],
  [dayjs('2023-04-12').valueOf(), [-2000], [PALAZZO]],
  [dayjs('2023-04-13').valueOf(), [-15000, -10000], [PALAZZO, MGM]],

  [dayjs('2023-05-10').valueOf(), [6701.25], [BELLAGIO]],
  [dayjs('2023-05-17').valueOf(), [-14500], [ARIA]],
  [dayjs('2023-05-24').valueOf(), [-13700], [PALAZZO]],

  [dayjs('2023-06-01').valueOf(), [-4000, -2040, -1300], [PALAZZO, MGM, MGM]],
  [dayjs('2023-06-07').valueOf(), [3200], [ARIA]],
  [dayjs('2023-06-14').valueOf(), [1215], [BELLAGIO]],
  [dayjs('2023-06-21').valueOf(), [13010], [ARIA]],
  [dayjs('2023-06-27').valueOf(), [-10370, 5800], [PALAZZO, BELLAGIO]],

  [dayjs('2023-07-05').valueOf(), [-5900, 37600], [PALAZZO, MANDALAY_BAY]],
  [dayjs('2023-07-12').valueOf(), [3100, -10500], [COSMO, BELLAGIO]],
  [
    dayjs('2023-07-19').valueOf(),
    [-800, 3700, -2240],
    [COSMO, ARIA, RESORTS_WORLD],
  ],
  [
    dayjs('2023-07-26').valueOf(),
    [-450, -915, -7000],
    [MANDALAY_BAY, BELLAGIO, ARIA],
  ],
  [dayjs('2023-08-03').valueOf(), [7080, 1560], [PALAZZO, MIRAGE]],
  [dayjs('2023-08-09').valueOf(), [4100, 880], [VP, WYNN]],
  [dayjs('2023-08-23').valueOf(), [515, 8240], [BELLAGIO, COSMO]],
  [
    dayjs('2023-08-31').valueOf(),
    [-10000, -5500, -5000, -8000],
    [VP, BELLAGIO, ARIA, MANDALAY_BAY],
  ],
  [dayjs('2023-09-05').valueOf(), [7175, 1870], [BELLAGIO, PARK_MGM]],
  [
    dayjs('2023-09-13').valueOf(),
    [-7200, -3000, -3.75],
    [VP, FLAMINGO, CASINO_ROYALE],
  ],
  [dayjs('2023-09-20').valueOf(), [-4000, 4065], [MANDALAY_BAY, VP]],
  [dayjs('2023-09-22').valueOf(), [-5000], [VP]],
  [
    dayjs('2023-09-27').valueOf(),
    [4140, -4100, -9095],
    [ARIA, PARK_MGM, BELLAGIO],
  ],
  [dayjs('2023-10-04').valueOf(), [3685, 4425], [COSMO, BELLAGIO]],
  [
    dayjs('2023-10-11').valueOf(),
    [-5000, 3890, 70],
    [VP, MANDALAY_BAY, AIRPORT],
  ],
  [
    dayjs('2023-10-18').valueOf(),
    [-350, 2500, 5260, 13150],
    [PARK_MGM, ARIA, BELLAGIO, COSMO],
  ],
  [dayjs('2023-10-24').valueOf(), [1500, 1600], [WYNN, BELLAGIO]],
  [dayjs('2023-11-01').valueOf(), [-3600, 1150], [BELLAGIO, COSMO]],
  [
    dayjs('2023-11-08').valueOf(),
    [-4000, -4760, -3100, -2350],
    [BELLAGIO, ARIA, MANDALAY_BAY, COSMO],
  ],
  [dayjs('2023-11-13').valueOf(), [-2700], [VP]],
  [dayjs('2023-11-22').valueOf(), [-7300, -3699.5], [VP, BELLAGIO]],
  [
    dayjs('2023-11-29').valueOf(),
    [-7000, 850, -6000, -6000],
    [BELLAGIO, ARIA, PARK_MGM, MANDALAY_BAY],
  ],
  [dayjs('2023-12-06').valueOf(), [-8150, 150], [MGM, VENETIAN]],
  [dayjs('2023-12-13').valueOf(), [-5000], [BELLAGIO]],
  [dayjs('2023-12-20').valueOf(), [395, -50], [VENETIAN, AIRPORT]],
];

export const dayTrips2024: Array<DayTrip> = [
  [dayjs('2024-01-02').valueOf(), [-5320], [ARIA_AND_BELLAGIO]],
  [dayjs('2024-01-10').valueOf(), [6060, -20], [MANDALAY_BAY, AIRPORT]],
  [dayjs('2024-01-17').valueOf(), [1450], [VENETIAN]],
  [dayjs('2024-01-24').valueOf(), [-8850, -3230], [VENETIAN, WYNN]],
  [
    dayjs('2024-01-25').valueOf(),
    [925, -4600, -4600],
    [VENETIAN, WYNN, BELLAGIO],
  ],
  [dayjs('2024-01-30').valueOf(), [-3632], [MANDALAY_BAY]],
  [dayjs('2024-02-07').valueOf(), [-5400], [COSMO]],
  [
    dayjs('2024-02-13').valueOf(),
    [1395, -1400, 1750, -7890, 2880],
    [MANDALAY_BAY, LUXOR, EXCALIBUR, BELLAGIO, BELLAGIO],
  ],
  [
    dayjs('2024-02-19').valueOf(),
    [-7000, -980, 25, 3500],
    [BELLAGIO, ARIA, PARK_MGM, MANDALAY_BAY],
  ],
  [
    dayjs('2024-02-27').valueOf(),
    [-7000, -150, -300, -5000],
    [COSMO, ARIA, PARK_MGM, MANDALAY_BAY],
  ],
  [dayjs('2024-03-06').valueOf(), [-4900], [MANDALAY_BAY]],
  [
    dayjs('2024-03-20').valueOf(),
    [-4850, -650, 320],
    [MANDALAY_BAY, ARIA, BELLAGIO],
  ],
  [dayjs('2024-03-27').valueOf(), [-13700, -2200], [VP, BELLAGIO]],
  [
    dayjs('2024-04-10').valueOf(),
    [-3000, 130, 4875],
    [COSMO, BELLAGIO, MANDALAY_BAY],
  ],
  [dayjs('2024-04-17').valueOf(), [-7100, -7000], [VENETIAN, BELLAGIO]],
  [dayjs('2024-04-19').valueOf(), [5370], [MANDALAY_BAY]],
  [
    dayjs('2024-04-23').valueOf(),
    [-3200, -3000, 4150],
    [BELLAGIO, COSMO, MANDALAY_BAY],
  ],
  [dayjs('2024-04-25').valueOf(), [510], [MANDALAY_BAY]],
  [
    dayjs('2024-05-08').valueOf(),
    [-4000, -4000, -5700],
    [ARIA, BELLAGIO, MANDALAY_BAY],
  ],
  [
    dayjs('2024-05-15').valueOf(),
    [-11000, -3000, -9000],
    [VENETIAN, FONTAINEBLEAU, BELLAGIO],
  ],
  [dayjs('2024-05-23').valueOf(), [-5200, 3675], [MANDALAY_BAY, MGM_GRAND]],
  [dayjs('2024-05-29').valueOf(), [-5600, 4900, -50], [VP, BELLAGIO, AIRPORT]],
  [
    dayjs('2024-06-06').valueOf(),
    [-2425, -4550, 2650, -20],
    [ARIA, BELLAGIO, MANDALAY_BAY, AIRPORT],
  ],
  [dayjs('2024-06-07').valueOf(), [3375], [PALAZZO]],
  [dayjs('2024-06-10').valueOf(), [-5500, -1100], [BELLAGIO, COSMO]],
  [dayjs('2024-06-12').valueOf(), [-2500], [VENETIAN]],
  [dayjs('2024-06-13').valueOf(), [2800], [VENETIAN]],
  [
    dayjs('2024-06-19').valueOf(),
    [-5000, -3135],
    [FONTAINEBLEAU, MANDALAY_BAY],
  ],
  [
    dayjs('2024-06-20').valueOf(),
    [-6100, -2000, -80],
    [BELLAGIO, COSMO, AIRPORT],
  ],
  [dayjs('2024-06-27').valueOf(), [-205], [BELLAGIO]],
  [dayjs('2024-07-02').valueOf(), [-8200, -2950], [MANDALAY_BAY, PALAZZO]],
];
