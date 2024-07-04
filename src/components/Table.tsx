import React, {ComponentProps, FC} from 'react';
import {Box, Stack} from '@mantine/core';
import {TableRowDataType, HandleConsecutiveRepeatValueAs} from '../types';

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
  className = '',
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
    handleConsecutiveRepeatValueAs === 'first' ||
    handleConsecutiveRepeatValueAs === 'always'
  ) {
    previousValue = rowData[0];
    valuesToPrint.push(previousValue);
    for (let i = 1; i < rowData.length; i += 1) {
      valuesToPrint.push(
        rowData[i] !== previousValue
          ? rowData[i]
          : handleConsecutiveRepeatValueAs === 'always'
          ? rowData[i]
          : ''
      );
      previousValue = rowData[i];
    }
    valuesToPrint.reverse();
  } else if (handleConsecutiveRepeatValueAs === 'last') {
    previousValue = rowData[rowData.length - 1];
    valuesToPrint.push(previousValue);
    for (let i = rowData.length - 2; i >= 0; i -= 1) {
      valuesToPrint.push(rowData[i] !== previousValue ? rowData[i] : '');
      previousValue = rowData[i];
    }
  }

  return (
    <Box className={className}>
      <Stack className="table-column-stack">
        <div className="table-title-row"> {title}</div>
        {headerRows.map((value, index) => (
          <div
            key={`${title}-header-${index}`}
            className={`table-row table-header-row text-${headerRowColors[index]}`}
          >
            {formatter(value)}
          </div>
        ))}
        {valuesToPrint.map((value, index) => (
          <div
            key={`${title}-row-${index}`}
            className={`table-row table-data-row text-${rowDataColors[index]}`}
          >
            {formatter(value)}
          </div>
        ))}
        {footerRows.map((value, index) => (
          <div
            key={`${title}-footer-${index}`}
            className={`table-row table-footer-row text-${footerRowColors[index]}`}
          >
            {formatter(value)}
          </div>
        ))}
      </Stack>
    </Box>
  );
};

export const TableContainer: FC<ComponentProps<'div'>> = ({children}) => {
  return <div className="table-container">{children}</div>;
};
