import { Header } from "./components/Header";
import { useContext } from "react";
import { FiltersContext } from "./context/filter";
import { Standings } from "./components/Standings";
import { Matches } from "./components/Matches";
import { LeagueInfo } from "./components/LeagueInfo";
import { useFootballData } from "./hooks/useFootballData";
import "./App.css";

export function App() {
  const { filters } = useContext(FiltersContext);

  let leagueInfo = useFootballData(
    `https://site.api.espn.com/apis/site/v2/sports/soccer/${filters.league}/scoreboard?dates=${filters.date}`,
    filters.league
  );

  return (
    <>
      <Header />

      <main>
        {leagueInfo && <LeagueInfo leagueInfo={leagueInfo.league} />}
        {leagueInfo && <Matches matches={leagueInfo.matches} />}

        <Standings />
      </main>
    </>
  );
}

export default App;
