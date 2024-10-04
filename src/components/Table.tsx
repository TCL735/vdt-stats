import React, { ComponentProps, FC, useContext } from "react";
import {
  TableRowDataType,
  HandleConsecutiveRepeatValueAs,
  POSITIVE_CURRENCY_TEXT_COLOR,
  NEGATIVE_CURRENCY_TEXT_COLOR,
} from "../types";
import {
  currencyFormatter,
  dateFormatter,
  getRewardsProgram,
  StatsContext,
} from "../utils";

interface TableColumnProps {
  className?: string;
  formatter?: (v: TableRowDataType) => string;
  handleConsecutiveRepeatValueAs: HandleConsecutiveRepeatValueAs;
  title: string;
  headerRows?: TableRowDataType[];
  headerRowColors?: string[];
  rowData: TableRowDataType[];
  rowDataColors: string[];
  footerRows?: TableRowDataType[];
  footerRowColors?: string[];
}

// data is received in ascending order
export const TableColumn: FC<TableColumnProps> = ({
  className = "",
  formatter = (v) => `${v}`,
  handleConsecutiveRepeatValueAs,
  title,
  headerRows = [],
  headerRowColors = [],
  rowData,
  rowDataColors: originalRowDataColors,
  footerRows = [],
  footerRowColors = [],
}) => {
  const valuesToPrint: TableRowDataType[] = [];
  const rowDataColors = [...originalRowDataColors];
  rowDataColors.reverse();

  let previousValue: TableRowDataType;
  if (
    handleConsecutiveRepeatValueAs === "first" ||
    handleConsecutiveRepeatValueAs === "always"
  ) {
    previousValue = rowData[0];
    valuesToPrint.push(previousValue);
    for (let i = 1; i < rowData.length; i += 1) {
      valuesToPrint.push(
        rowData[i] !== previousValue
          ? rowData[i]
          : handleConsecutiveRepeatValueAs === "always"
          ? rowData[i]
          : "",
      );
      previousValue = rowData[i];
    }
    valuesToPrint.reverse();
  } else if (handleConsecutiveRepeatValueAs === "last") {
    previousValue = rowData[rowData.length - 1];
    valuesToPrint.push(previousValue);
    for (let i = rowData.length - 2; i >= 0; i -= 1) {
      valuesToPrint.push(rowData[i] !== previousValue ? rowData[i] : "");
      previousValue = rowData[i];
    }
  }

  return (
    <div className="flex flex-col justify-start items-stretch text-center h-auto">
      <div
        className={`border-b border-solid border-gray100 h-4 pt-4 pb-8 leading-4 font-semibold text-ellipsis overflow-hidden text-black`}
      >
        {" "}
        {title}
      </div>
      {headerRows.map((value, index) => (
        <div
          key={`${title}-header-${index}`}
          className={`border-b border-solid border-gray100 h-4 pt-4 pb-8 leading-4 font-semibold text-ellipsis overflow-hidden ${headerRowColors[index]}`}
        >
          {formatter(value)}
        </div>
      ))}
      {valuesToPrint.map((value, index) => (
        <div
          key={`${title}-row-${index}`}
          className={`border-b border-solid border-gray100 h-4 pt-4 pb-14 leading-4 text-ellipsis overflow-hidden ${rowDataColors[index]}`}
        >
          {formatter(value)}
        </div>
      ))}
      {footerRows.map((value, index) => (
        <div
          key={`${title}-footer-${index}`}
          className={`border-b border-solid border-gray100 h-4 pt-4 pb-8 leading-4 text-ellipsis overflow-hidden ${footerRowColors[index]}`}
        >
          {formatter(value)}
        </div>
      ))}
    </div>
  );
};

export const TableContainer: FC<ComponentProps<"div">> = ({ children }) => {
  return <div className="table-container">{children}</div>;
};

export const StatsTableLarge: FC = () => {
  const stats = useContext(StatsContext);

  const {
    wholeTripColors,
    locationColors,
    tripNumbers,
    tripDates,
    tripLocations,
    tripPrograms,
    tripResults,
    totalWinLoss,
  } = stats;

  return (
    <div className="grid grid-cols-[minmax(0,_1fr)_minmax(0,_2fr)_minmax(0,_2fr)_minmax(0,_3fr)_minmax(0,_2fr)]">
      <TableColumn
        handleConsecutiveRepeatValueAs="last"
        title="Trip"
        headerRows={[""]}
        headerRowColors={[""]}
        rowData={tripNumbers}
        rowDataColors={wholeTripColors}
      />
      <TableColumn
        formatter={dateFormatter}
        handleConsecutiveRepeatValueAs="last"
        title="Date"
        headerRows={[""]}
        headerRowColors={[""]}
        rowData={tripDates}
        rowDataColors={wholeTripColors}
      />
      <TableColumn
        handleConsecutiveRepeatValueAs="always"
        title="Location"
        headerRows={[""]}
        headerRowColors={[""]}
        rowData={tripLocations}
        rowDataColors={locationColors}
      />
      <TableColumn
        handleConsecutiveRepeatValueAs="always"
        title="Program"
        headerRows={["Total"]}
        headerRowColors={["black"]}
        rowData={tripPrograms}
        rowDataColors={locationColors}
      />
      <TableColumn
        formatter={currencyFormatter}
        handleConsecutiveRepeatValueAs="always"
        rowDataColors={locationColors}
        title="Win/Loss"
        headerRows={[totalWinLoss]}
        headerRowColors={[
          totalWinLoss >= 0
            ? POSITIVE_CURRENCY_TEXT_COLOR
            : NEGATIVE_CURRENCY_TEXT_COLOR,
        ]}
        rowData={tripResults}
      />
    </div>
  );
};

const getSessionClassName = (sessions: number): string => {
  switch (sessions) {
    case 1:
      return "w-[100%]";
    case 2:
      return "w-[50%]";
    case 3:
      return "w-[30%]";
    case 4:
      return "w-[25%]";
    default:
      return "w-[20%]";
  }
};
export const StatsTableCompact: FC = () => {
  const state = useContext(StatsContext);
  const { dayTrips, totalWinLoss } = state;

  const sessionColors = dayTrips.map((dayTrip) => {
    return dayTrip[1].map((session, index) =>
      session >= 0
        ? POSITIVE_CURRENCY_TEXT_COLOR
        : NEGATIVE_CURRENCY_TEXT_COLOR,
    );
  });

  const tripColors = dayTrips.map((dayTrip) => {
    const total = dayTrip[1].reduce(
      (total, sessionResult, index) => (total += sessionResult),
      0,
    );

    return total >= 0
      ? POSITIVE_CURRENCY_TEXT_COLOR
      : NEGATIVE_CURRENCY_TEXT_COLOR;
  });

  const compactTableDetailRowClassName =
    "flex flex-row justify-start h-auto text-left";
  const compactTableDetailFieldClassName = `w-[35%] font-bold text-black`;
  const compactTableDetailDataPointsClassName =
    "flex flex-row justify-start gap-x-3 w-[65%]";

  return (
    <div
      className={`flex flex-col-reverse border-b border-solid border-gray100`}
    >
      {dayTrips.map((dayTrip, tripNumber) => (
        <div
          key={dayTrip[0]}
          className={`flex flex-col border-t border-solid border-gray100`}
        >
          <div className={compactTableDetailRowClassName}>
            <span className={compactTableDetailFieldClassName}>Trip</span>
            <span
              className={`${compactTableDetailDataPointsClassName} ${tripColors[tripNumber]}`}
            >
              {`#${tripNumber + 1}`}
            </span>
          </div>
          <div className={compactTableDetailRowClassName}>
            <span className={compactTableDetailFieldClassName}>Date</span>
            <span
              className={`${compactTableDetailDataPointsClassName} ${tripColors[tripNumber]}`}
            >
              {dateFormatter(dayTrip[0])}
            </span>
          </div>
          <div className={compactTableDetailRowClassName}>
            <span className={compactTableDetailFieldClassName}>Program</span>
            <span className={compactTableDetailDataPointsClassName}>
              {dayTrip[2].map((location, index) => (
                <span
                  key={`program-${index}`}
                  className={`${getSessionClassName(
                    dayTrip[1].length,
                  )} text-black`}
                >
                  {getRewardsProgram(location)}
                </span>
              ))}
            </span>
          </div>
          <div className={compactTableDetailRowClassName}>
            <span className={compactTableDetailFieldClassName}>Location</span>
            <span className={compactTableDetailDataPointsClassName}>
              {dayTrip[2].map((location, index) => (
                <span
                  key={`location-${index}`}
                  className={`${getSessionClassName(dayTrip[1].length)} ${
                    sessionColors[tripNumber][index]
                  }`}
                >
                  {location}
                </span>
              ))}
            </span>
          </div>
          <div className={compactTableDetailRowClassName}>
            <span className={compactTableDetailFieldClassName}>Win/Loss</span>
            <span className={compactTableDetailDataPointsClassName}>
              {dayTrip[1].map((tripResult, index) => (
                <span
                  key={`winLoss-${index}`}
                  className={`${getSessionClassName(dayTrip[1].length)} ${
                    sessionColors[tripNumber][index]
                  }`}
                >
                  {currencyFormatter(tripResult)}
                </span>
              ))}
            </span>
          </div>
        </div>
      ))}
      <div className={`flex flex-col border-t border-solid border-gray100`}>
        <div className={compactTableDetailRowClassName}>
          <span className={compactTableDetailFieldClassName}>
            Total Win/Loss
          </span>
          <span className={compactTableDetailDataPointsClassName}>
            <span
              key={`winLoss-total`}
              className={`${getSessionClassName(1)} ${
                totalWinLoss >= 0
                  ? POSITIVE_CURRENCY_TEXT_COLOR
                  : NEGATIVE_CURRENCY_TEXT_COLOR
              }`}
            >
              {currencyFormatter(totalWinLoss)}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
