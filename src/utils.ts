import { createContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  ARIA,
  ARIA_AND_BELLAGIO,
  BELLAGIO,
  CAESARS_PALACE,
  CET,
  CIRCA_AND_D,
  COSMO,
  DURANGO,
  DayTrip,
  ENCORE,
  EXCALIBUR,
  FLAMINGO,
  FONTAINEBLEAU,
  LUXOR,
  MANDALAY_BAY,
  MGM,
  MGM_GRAND,
  MIRAGE,
  NEGATIVE_CURRENCY_TEXT_COLOR,
  PALAZZO,
  PARIS,
  PARK_MGM,
  POSITIVE_CURRENCY_TEXT_COLOR,
  RESORTS_WORLD,
  TableRowDataType,
  VENETIAN,
  VP,
  WYNN,
  WindowDimensions,
} from "./types";
import { dayTrips2023, dayTrips2024, dayTripsAllTime } from "./data";

export const getRewardsProgram = (location: string): string => {
  switch (location) {
    case ARIA:
    case ARIA_AND_BELLAGIO:
    case BELLAGIO:
    case COSMO:
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
      return "Venetian Rewards";

    case CIRCA_AND_D:
      return "One";

    case RESORTS_WORLD:
      return "Genting";

    case MIRAGE:
      return "Unity";

    case ENCORE:
    case WYNN:
      return "Wynn";

    case PARIS:
    case CAESARS_PALACE:
    case FLAMINGO:
      return CET;

    case FONTAINEBLEAU:
      return "Fontainebleau Rewards";

    case DURANGO:
      return "Stations";

    default:
      return location;
  }
};

export interface TableRowsData {
  dayTrips: DayTrip[];
  wholeTripColors: string[];
  locationColors: string[];
  tripNumbers: number[];
  tripDates: number[];
  tripLocations: string[];
  tripPrograms: string[];
  tripResults: number[];
  totalWinLoss: number;
}

export const createRowData = (
  dayTrips: DayTrip[],
  positiveColor = "black",
  negativeColor = "red",
): TableRowsData => {
  const wholeTripColors: string[] = [];
  const locationColors: string[] = [];
  const tripNumbers: number[] = [];
  const tripDates: number[] = [];
  const tripLocations: string[] = [];
  const tripPrograms: string[] = [];
  const tripResults: number[] = [];

  dayTrips.forEach((daytrip, index) => {
    const [dateValue, results, locations] = daytrip;

    const resultsTotal = results.reduce((total: number, result: number) => {
      return (total += result);
    }, 0);

    for (let i = locations.length - 1; i >= 0; i -= 1) {
      wholeTripColors.push(resultsTotal >= 0 ? positiveColor : negativeColor);
      locationColors.push(results[i] >= 0 ? positiveColor : negativeColor);
      tripNumbers.push(index + 1);
      tripDates.push(dateValue);
      tripLocations.push(locations[i]);
      tripPrograms.push(getRewardsProgram(locations[i]));
      tripResults.push(results[i]);
    }
  });

  const totalWinLoss = tripResults.reduce(
    (total, amount) => (total += amount),
    0,
  );

  return {
    dayTrips,
    wholeTripColors,
    locationColors,
    tripNumbers,
    tripDates,
    tripLocations,
    tripPrograms,
    tripResults,
    totalWinLoss,
  };
};

export const dateFormatter = (d: TableRowDataType) => {
  const result = dayjs(d).format("M/DD/YYYY");
  if (result === "Invalid Date") {
    return "";
  }
  return result;
};

export const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const currencyFormatter = (v: TableRowDataType): string => {
  const f = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  return f.format(v as number);
};

export const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    height,
    width,
  };
};

export const useWindowDimensions = (): WindowDimensions & {
  heightClass: string;
} => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>(
    getWindowDimensions(),
  );
  const [heightClass, setHeightClass] = useState<string>(
    getHeightClass(windowDimensions.height),
  );

  useEffect(() => {
    function handleResize() {
      const newDimensions = getWindowDimensions();
      if (
        newDimensions.height !== windowDimensions.height ||
        newDimensions.width !== windowDimensions.width
      ) {
        setWindowDimensions(newDimensions);
        setHeightClass(getHeightClass(newDimensions.height));
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    height: windowDimensions.height,
    width: windowDimensions.width,
    heightClass,
  };
};

export const getHeightClass = (height: number): string => {
  if (height >= 800) {
    return "h-[710px]";
  }
  if (height >= 760) {
    return "h-[670px]";
  }
  if (height >= 720) {
    return "h-[630px]";
  }
  if (height >= 680) {
    return "h-[590px]";
  }
  if (height >= 640) {
    return "h-[550px]";
  }
  if (height >= 600) {
    return "h-[510px]";
  }
  return "h-[470px]";
};

export const rowData2023 = createRowData(
  dayTrips2023,
  POSITIVE_CURRENCY_TEXT_COLOR,
  NEGATIVE_CURRENCY_TEXT_COLOR,
);
export const rowData2024 = createRowData(
  dayTrips2024,
  POSITIVE_CURRENCY_TEXT_COLOR,
  NEGATIVE_CURRENCY_TEXT_COLOR,
);
export const rowDataAllTime = createRowData(
  dayTripsAllTime,
  POSITIVE_CURRENCY_TEXT_COLOR,
  NEGATIVE_CURRENCY_TEXT_COLOR,
);

export const StatsContext = createContext(rowData2023);