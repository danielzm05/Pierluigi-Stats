import "../styles/LeagueInfo.css";

export function LeagueInfo({ leagueInfo }) {
  return leagueInfo ? (
    <div className="league-info">
      <img src={leagueInfo.logos[0].href} alt="League Logo" />
      <div className="data">
        <h1>{leagueInfo.name}</h1>
        <span>Season: {leagueInfo.season.displayName.slice(0, 7)}</span>
      </div>
    </div>
  ) : null;
}
