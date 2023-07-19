import dayjs from 'dayjs'

const ARIA = 'Aria'
const BELLAGIO = 'Bellagio'
const EL_CORTEZ = 'El Cortez'
const FLAMINGO = 'Flamingo'
const MANDALAY_BAY = 'Mandalay Bay'
const PALAZZO = 'Palazzo'

export const dayTrips = [
  [dayjs('2023-01-11').valueOf(), 10095.0, BELLAGIO],
  [dayjs('2023-01-18').valueOf(), 585.0, MANDALAY_BAY],
  [dayjs('2023-01-25').valueOf(), -9100.0, PALAZZO],

  [dayjs('2023-02-08').valueOf(), 8225, MANDALAY_BAY],
  [dayjs('2023-02-14').valueOf(), -11700.0, ARIA],
  [dayjs('2023-02-15').valueOf(), -2180.0, FLAMINGO],
  [dayjs('2023-02-21').valueOf(), -13400.0, PALAZZO],

  [dayjs('2023-03-01').valueOf(), -1560.0, PALAZZO],
  [dayjs('2023-03-15').valueOf(), 5100.0, ARIA],
  [dayjs('2023-03-22').valueOf(), -4900.0, PALAZZO],
  [dayjs('2023-03-29').valueOf(), 5100.0, BELLAGIO],

  [dayjs('2023-04-05').valueOf(), -945.0, EL_CORTEZ],
  [dayjs('2023-04-12').valueOf(), -2000.0, PALAZZO],
  [dayjs('2023-04-13').valueOf(), -25000.0, PALAZZO],

  [dayjs('2023-05-10').valueOf(), 6701.0, BELLAGIO],
  [dayjs('2023-05-17').valueOf(), -14500.0, ARIA],
  [dayjs('2023-05-24').valueOf(), -13700.0, PALAZZO],

  [dayjs('2023-06-01').valueOf(), -7340.0, PALAZZO],
  [dayjs('2023-06-07').valueOf(), 3200.0, ARIA],
  [dayjs('2023-06-14').valueOf(), 1215.0, BELLAGIO],
  [dayjs('2023-06-21').valueOf(), 13010.0, ARIA],
  [dayjs('2023-06-27').valueOf(), -4570.0, PALAZZO],

  [dayjs('2023-07-05').valueOf(), 31700.0, PALAZZO],
  [dayjs('2023-07-12').valueOf(), -7400.0, ARIA],
]
