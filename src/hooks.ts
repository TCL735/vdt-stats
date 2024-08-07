import {createStyles} from '@mantine/core';

export const useStyles = createStyles(() => ({
  datapointTooltip: {
    color: 'black',
    margin: '-1rem',
    maxWidth: '30rem',
    padding: '0.75rem',
    textAlign: 'left',
    textShadow: '1px 1px rgba(0,0,0,0.15)',
    userSelect: 'none',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all',
  },
  negativeCurrency: {
    color: 'red',
  },
  positiveCurrency: {
    color: 'black',
  },
}));

export const useTenTonStyles = createStyles(() => ({
  datapointTooltip: {
    color: 'black',
    margin: '-1rem',
    maxWidth: '30rem',
    padding: '0.75rem',
    textAlign: 'left',
    textShadow: '1px 1px rgba(0,0,0,0.15)',
    userSelect: 'none',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all',
    backgroundColor: '#C48125',
  },
  negativeCurrency: {
    color: 'pink',
  },
  positiveCurrency: {
    color: '#39ff14',
  },
}));
