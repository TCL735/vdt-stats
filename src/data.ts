import dayjs from 'dayjs'

export const ARIA = 'Aria'
export const BELLAGIO = 'Bellagio'
export const CIRCA_AND_D = 'Cira and D'
export const COSMO = 'Cosmopolitan'
export const EL_CORTEZ = 'El Cortez'
export const FLAMINGO = 'Flamingo'
export const MANDALAY_BAY = 'Mandalay Bay'
export const MGM = 'MGM'
export const PALAZZO = 'Palazzo'
export const RESORTS_WORLD = 'Resorts World'
export const VENETIAN = 'Venetian'
export const VP = 'V/P'

export type DayTrip = [number, Array<number>, Array<string>]
export const dayTrips: Array<DayTrip> = [
  [dayjs('2023-01-11').valueOf(), [10095], [BELLAGIO]],
  [dayjs('2023-01-18').valueOf(), [585], [MANDALAY_BAY]],
  [dayjs('2023-01-25').valueOf(), [-9100], [PALAZZO]],

  [dayjs('2023-02-08').valueOf(), [9575, -1350], [MANDALAY_BAY, VP]],
  [dayjs('2023-02-14').valueOf(), [-11700], [ARIA]],
  [dayjs('2023-02-15').valueOf(), [-980, -1200], [MGM, VP]],
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

  [dayjs('2023-06-01').valueOf(), [-7340], [PALAZZO]],
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
]