import React, {useState} from 'react';
import './App.css';
import {Tabs} from '@mantine/core';
import {dayTrips2023, dayTrips2024} from './data';
import {YearlyStats} from './components/YearlyStats';

export const App = () => {
  const [activeTab, setActiveTab] = useState<string | null>('2024');
  return (
    <div className="App">
      <Tabs value={activeTab} onTabChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="2024">2024</Tabs.Tab>
          <Tabs.Tab value="2023">2023</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="2024">
          <YearlyStats
            dayTrips={dayTrips2024}
            label="Vegas Daytripper's 2024 Win/Loss"
            lineColor="orange"
            year={activeTab}
          />
        </Tabs.Panel>
        <Tabs.Panel value="2023">
          <YearlyStats
            dayTrips={dayTrips2023}
            label="Vegas Daytripper's 2023 Win/Loss"
            lineColor="red"
            year={activeTab}
          />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};
