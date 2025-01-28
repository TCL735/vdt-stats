import React, { useState } from "react";
import {
  HashRouter,
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Tabs } from "@mantine/core";
import { YearlyStats } from "./components/YearlyStats";
import {
  getTabFromLocation,
  rowData2023,
  rowData2024,
  rowData2025,
  rowDataAllTime,
  StatsContext,
} from "./utils";
import { ROUTES, SELECTED_BORDER_STYLE, TABS } from "./types";

export const Navigation = () => {
  const { pathname } = useLocation();
  const [activeTab, setActiveTab] = useState<string | null>(
    getTabFromLocation(pathname),
  );

  return (
    <div>
      <Tabs value={activeTab} onChange={setActiveTab} keepMounted={false}>
        <Tabs.List className="flex flex-row flex-wrap justify-start border-b-0">
          <Link to={ROUTES.STATS_ALL_TIME}>
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
          </Link>
          <Link to={ROUTES.STATS_2025}>
            <Tabs.Tab
              value={TABS._2025}
              className={`px-4 py-3 hover:text-blue-500 ${
                activeTab === TABS._2025
                  ? SELECTED_BORDER_STYLE
                  : "border-black/100"
              } text-black`}
            >
              {TABS._2025}
            </Tabs.Tab>
          </Link>
          <Link to={ROUTES.STATS_2024}>
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
          </Link>
          <Link to={ROUTES.STATS_2023}>
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
          </Link>
        </Tabs.List>
        <Tabs.Panel value={activeTab!}>
          <Outlet />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route
            path="/"
            index
            element={
              <StatsContext.Provider value={rowData2025}>
                <YearlyStats
                  label="Vegas Daytripper's 2025 Win/Loss"
                  endLabelOffset={[-65, -15]}
                />
              </StatsContext.Provider>
            }
          />
          <Route
            path={ROUTES.STATS_2025}
            element={
              <StatsContext.Provider value={rowData2025}>
                <YearlyStats
                  label="Vegas Daytripper's 2025 Win/Loss"
                  endLabelOffset={[-80, -20]}
                />
              </StatsContext.Provider>
            }
          />
          <Route
            path={ROUTES.STATS_2024}
            element={
              <StatsContext.Provider value={rowData2024}>
                <YearlyStats
                  label="Vegas Daytripper's 2024 Win/Loss"
                  endLabelOffset={[-80, 20]}
                />
              </StatsContext.Provider>
            }
          />
          <Route
            path={ROUTES.STATS_2023}
            element={
              <StatsContext.Provider value={rowData2023}>
                <YearlyStats
                  label="Vegas Daytripper's 2023 Win/Loss"
                  endLabelOffset={[-70, 20]}
                />
              </StatsContext.Provider>
            }
          />
          <Route
            path={ROUTES.STATS_ALL_TIME}
            element={
              <StatsContext.Provider value={rowDataAllTime}>
                <YearlyStats
                  label="Vegas Daytripper's All Time Win/Loss"
                  endLabelOffset={[-80, 30]}
                />
              </StatsContext.Provider>
            }
          />
        </Route>
      </Routes>
    </HashRouter>
  );
};
