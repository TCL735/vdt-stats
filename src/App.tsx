import React, { useState } from "react";
import { Tabs } from "@mantine/core";
import { YearlyStats } from "./components/YearlyStats";
import {
  rowData2023,
  rowData2024,
  rowDataAllTime,
  StatsContext,
} from "./utils";
import { SELECTED_BORDER_STYLE, TABS } from "./types";

export const App = () => {
  const [activeTab, setActiveTab] = useState<string | null>(TABS._2024);
  return (
    <div>
      <Tabs value={activeTab} onChange={setActiveTab} keepMounted={false}>
        <Tabs.List className="flex flex-row flex-wrap justify-start border-b-0">
          <Tabs.Tab
            value={TABS.ALL_TIME}
            className={`px-4 py-3 hover:text-blue-500 ${
              activeTab === TABS.ALL_TIME
                ? SELECTED_BORDER_STYLE
                : "border-black/100"
            } text-black`}
          >
            {TABS.ALL_TIME}
          </Tabs.Tab>
          <Tabs.Tab
            value={TABS._2024}
            className={`px-4 py-3 hover:text-blue-500 ${
              activeTab === TABS._2024
                ? SELECTED_BORDER_STYLE
                : "border-black/100"
            } text-black`}
          >
            {TABS._2024}
          </Tabs.Tab>
          <Tabs.Tab
            value={TABS._2023}
            className={`px-4 py-3 hover:text-blue-500 ${
              activeTab === TABS._2023
                ? SELECTED_BORDER_STYLE
                : "border-black/100"
            } text-black`}
          >
            {TABS._2023}
          </Tabs.Tab>
        </Tabs.List>

        {activeTab === TABS.ALL_TIME && (
          <Tabs.Panel value={activeTab}>
            <StatsContext.Provider value={rowDataAllTime}>
              <YearlyStats label="Vegas Daytripper's All Time Win/Loss" />
            </StatsContext.Provider>
          </Tabs.Panel>
        )}

        {activeTab === TABS._2024 && (
          <Tabs.Panel value={activeTab}>
            <StatsContext.Provider value={rowData2024}>
              <YearlyStats label="Vegas Daytripper's 2024 Win/Loss" />
            </StatsContext.Provider>
          </Tabs.Panel>
        )}
        {activeTab === TABS._2023 && (
          <Tabs.Panel value={activeTab}>
            <StatsContext.Provider value={rowData2023}>
              <YearlyStats label="Vegas Daytripper's 2023 Win/Loss" />
            </StatsContext.Provider>
          </Tabs.Panel>
        )}
      </Tabs>
    </div>
  );
};
