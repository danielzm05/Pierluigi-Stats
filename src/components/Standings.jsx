import { useState, useEffect, useContext } from "react";
import { useFetchData } from "../hooks/useFetchData";
import { FiltersContext } from "../context/filter";
import "../styles/Standings.css";

export function Standings() {
  const { filters } = useContext(FiltersContext);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const getStandings = async () => {
      try {
        const standings = await useFetchData(
          `https://site.api.espn.com/apis/v2/sports/soccer/${filters.league}/standings`
        );

        const mappedGroups = standings?.children?.map((group) => ({
          id: group.id,
          name: group.name,
          standings: group.standings.entries.map((team) => ({
            id: team.team.id,
            ...(team.note && {
              rank: {
                number: team.note.rank,
                color: team.note.color,
                description: team.description,
              },
            }),
            name: team.team.displayName,
            logo: team.team.logos[0].href,
            stats: team.stats,
          })),
        }));

        setGroups(mappedGroups);
      } catch (error) {
        console.error("Error in getStandings:", error);
        setGroups([]);
      }
    };

    getStandings();
  }, [filters]);

  return (
    <div className="standings-container">
      {groups.map((group) => (
        <div className="standings" key={group.id}>
          <span className="title">Standings</span>
          <div className="header row">
            <span>Club</span>
            <span>MP</span>
            <span>W</span>
            <span>D</span>
            <span>L</span>
            <span>G</span>
            <span>GD</span>
            <span>PTS</span>
          </div>
          {group.standings.map((team, index) => (
            <div className="team row" key={team.id}>
              <span className="rank">
                {team.rank ? team.rank.number : index + 1}
              </span>
              <img className="logo" src={team.logo} alt={`${team.name} logo`} />
              <span className="name">{team.name}</span>
              <span>{team.stats[0].value}</span>
              <span>{team.stats[7].value}</span>
              <span>{team.stats[6].value}</span>
              <span>{team.stats[1].value}</span>
              <span>
                {team.stats[5].value}:{team.stats[4].value}
              </span>
              <span>{team.stats[2].displayValue}</span>
              <span>
                <b>{team.stats[3].displayValue}</b>
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
