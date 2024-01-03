import React from 'react';
import './App.css';
import {Tabs} from '@mantine/core';
import {dayTrips2023, dayTrips2024} from './data';
import {YearlyStats} from './components/YearlyStats';

export const App = () => {
  return (
    <div className="App">
      <Tabs defaultValue="2024">
        <Tabs.List>
          <Tabs.Tab value="2024">2024</Tabs.Tab>
          <Tabs.Tab value="2023">2023</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="2024">
          <YearlyStats
            dayTrips={dayTrips2024}
            label="Vegas Daytripper's 2024 Win/Loss"
            lineColor="blue"
            yearStart="2024-01-01"
          />
        </Tabs.Panel>
        <Tabs.Panel value="2023">
          <YearlyStats
            dayTrips={dayTrips2023}
            label="Vegas Daytripper's 2023 Win/Loss"
            lineColor="red"
            yearStart="2023-01-01"
          />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};
