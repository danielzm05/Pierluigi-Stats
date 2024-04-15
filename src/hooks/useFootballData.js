import { useState, useEffect } from "react";

export function useFootballData(endpoint, leagueCode) {
  const [data, setData] = useState(null);

  useEffect(() => {

    getStatsGame(endpoint ,leagueCode)
    .then((stats) => {
      setData(stats);
    });
  }, [endpoint, leagueCode]);

  return data;
}


async function getStatsGame(endpoint, leagueCode) {
  try {
    const matchesIds = await fetchData(endpoint);
    
    // Creamos un array de promesas para cada partido
    const matchPromises = matchesIds?.events?.map(match => {
      return fetchData(`https://site.api.espn.com/apis/site/v2/sports/soccer/${leagueCode}/summary?event=${match.id}`);
    });

    // Esperamos a que todas las promesas se resuelvan
    const results = await Promise.all(matchPromises);
    
    let matchesStats = results?.map(match => ({
      
      id: match.header.id,
      date: match.header.competitions[0].date.substring(5, 10).replace("-", "/"),
      status: match.header.competitions[0].status.type.detail,
      complete: match.header.competitions[0].status.type.completed,

      ...(match.header.competitions[0].status.type.detail === 'FT' && { 
        referee: match.gameInfo.officials[0].displayName, 
      }),

      teams: [
        {
          id: match.boxscore.teams[0].team.id,
          name: match.boxscore.teams[0].team.displayName,
          logo: match.boxscore.teams[0].team.logo,
          winner: match.rosters[0].winner,
          score: Number(match.header.competitions[0].competitors[0].score),

          ...(match.header.competitions[0].status.type.detail === 'FT' && { 

            players: match.rosters[0].roster,
            stats : {
              goals: {
                fh: Number(match.header.competitions[0].competitors[0].linescores[0].displayValue),
                sh: Number(match.header.competitions[0].competitors[0].linescores[1].displayValue)
              },
              shotsOnTarget: Number(match.boxscore.teams[0].statistics[8].displayValue),
              possession: Number(match.boxscore.teams[0].statistics[6].displayValue),
              fouls: Number(match.boxscore.teams[0].statistics[0].displayValue),
              yellowCards: Number(match.boxscore.teams[0].statistics[1].displayValue),
              redCards: Number(match.boxscore.teams[0].statistics[2].displayValue),
              corners: Number(match.boxscore.teams[0].statistics[4].displayValue),
              offsides: Number(match.boxscore.teams[0].statistics[3].displayValue)
            },

          }),
        },
        {
          id: match.boxscore.teams[1].team.id,
          name: match.boxscore.teams[1].team.displayName,
          logo: match.boxscore.teams[1].team.logo,
          winner: match.rosters[1].winner,
          score: Number(match.header.competitions[0].competitors[1].score),
          ...(match.header.competitions[0].status.type.detail === 'FT' && { 
            players: match.rosters[1].roster,
            stats : {
              goals: {
                firstHalf: Number(match.header.competitions[0].competitors[1].linescores[0].displayValue),
                secondHalf: Number(match.header.competitions[0].competitors[1].linescores[1].displayValue)
              },
              shotsOnTarget: Number(match.boxscore.teams[1].statistics[8].displayValue),
              possession: Number(match.boxscore.teams[1].statistics[6].displayValue),
              fouls: Number(match.boxscore.teams[1].statistics[0].displayValue),
              yellowCards: Number(match.boxscore.teams[1].statistics[1].displayValue),
              redCards: Number(match.boxscore.teams[1].statistics[2].displayValue),
              corners: Number(match.boxscore.teams[1].statistics[4].displayValue),
              offsides: Number(match.boxscore.teams[1].statistics[3].displayValue)
            },
          }),
        }
      ],
      league: {
        id: match.header.league.id,
        code: match.header.league.slug,
        name: match.header.league.name,
      }
    })) 

    console.log(matchesStats)
    return matchesStats; 
  } catch (error) {
    console.error('Error in getStatsGame:', error);
  }
}

async function fetchData(endpoint) {

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


/* 
  https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/summary?event=671339 
  https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard?dates=20240403
  https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard



  
*/