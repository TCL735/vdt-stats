import dayjs from 'dayjs';
import {
  ARIA,
  ARIA_AND_BELLAGIO,
  BELLAGIO,
  CIRCA_AND_D,
  COSMO,
  ENCORE,
  EXCALIBUR,
  FLAMINGO,
  FONTAINEBLEAU,
  LUXOR,
  MANDALAY_BAY,
  MGM,
  MGM_GRAND,
  MIRAGE,
  PALAZZO,
  PARK_MGM,
  RESORTS_WORLD,
  VENETIAN,
  VP,
  WYNN,
  DayTrip,
  TableRowDataType,
} from './types';

export const getRewardsProgram = (location: string): string => {
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

export interface TableRowsData {
  wholeTripColors: string[];
  locationColors: string[];
  tripNumbers: number[];
  tripDates: number[];
  tripLocations: string[];
  tripPrograms: string[];
  tripResults: number[];
}

export const createRowData = (daytrips: DayTrip[]): TableRowsData => {
  const wholeTripColors: string[] = [];
  const locationColors: string[] = [];
  const tripNumbers: number[] = [];
  const tripDates: number[] = [];
  const tripLocations: string[] = [];
  const tripPrograms: string[] = [];
  const tripResults: number[] = [];

  daytrips.forEach((daytrip, index) => {
    const [dateValue, results, locations] = daytrip;

    const resultsTotal = results.reduce((total: number, result: number) => {
      return (total += result);
    }, 0);

    for (let i = locations.length - 1; i >= 0; i -= 1) {
      wholeTripColors.push(resultsTotal >= 0 ? 'black' : 'red');
      locationColors.push(results[i] >= 0 ? 'black' : 'red');
      tripNumbers.push(index + 1);
      tripDates.push(dateValue);
      tripLocations.push(locations[i]);
      tripPrograms.push(getRewardsProgram(locations[i]));
      tripResults.push(results[i]);
    }
  });

  return {
    wholeTripColors,
    locationColors,
    tripNumbers,
    tripDates,
    tripLocations,
    tripPrograms,
    tripResults,
  };
};

export const dateFormatter = (d: TableRowDataType) => {
  const result = dayjs(d).format('M/DD/YYYY');
  if (result === 'Invalid Date') {
    return '';
  }
  return result;
};

export const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const currencyFormatter = (v: TableRowDataType): string => {
  const f = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
  return f.format(v as number);
};
