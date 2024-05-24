import { useState, useEffect } from "react";
import { useFetchData } from "./useFetchData";

export function useFootballData(endpoint, leagueCode) {
  const [matches, setMatches] = useState(null);

  useEffect(() => {
    getLeagueGames(endpoint, leagueCode).then((stats) => {
      setMatches(stats);
    });
  }, [endpoint, leagueCode]);

  return matches;
}

async function getLeagueGames(endpoint, leagueCode) {
  try {
    const league = await useFetchData(endpoint);

    const matchPromises = league?.events?.map((match) => {
      return useFetchData(
        `https://site.api.espn.com/apis/site/v2/sports/soccer/${leagueCode}/summary?event=${match.id}`
      );
    });

    // Esperamos a que todas las promesas se resuelvan
    const results = await Promise.all(matchPromises);

    let matchesStats = results?.map((match) => ({
      id: match.header.id,
      date: match.header.competitions[0].date
        .substring(5, 10)
        .replace("-", "/"),
      status: match.header.competitions[0].status.type.detail,
      complete: match.header.competitions[0].status.type.completed,
      venue: match.gameInfo.venue.fullName,

      ...(match.header.competitions[0].status.type.detail === "FT" && {
        referee: match.gameInfo.officials[0].displayName,
      }),

      teams: [
        {
          id: match.boxscore.teams[0].team.id,
          name: match.boxscore.teams[0].team.shortDisplayName,
          abbreviation: match.boxscore.teams[0].team.abbreviation,
          logo: match.boxscore.teams[0].team.logo,
          color: match.boxscore.teams[0].team.color,
          winner: match.rosters[0].winner,
          score: Number(match.header.competitions[0].competitors[0].score),
          ...(match.rosters[0].roster && {
            formation: match.rosters[0].formation,
            players: {
              starters: match.rosters[0].roster.filter(
                (player) => player.starter === true
              ),
              substitutes: match.rosters[0].roster.filter(
                (player) => player.starter === false
              ),
            },
          }),

          ...(match.header.competitions[0].status.type.detail === "FT" && {
            goalscorers: match.header.competitions[0].details.filter(
              (scorer) => scorer.team.id === match.boxscore.teams[0].team.id
            ),
            stats: {
              goals: {
                fh: Number(
                  match.header.competitions[0].competitors[0].linescores[0]
                    .displayValue
                ),
                sh: Number(
                  match.header.competitions[0].competitors[0].linescores[1]
                    .displayValue
                ),
              },
              shotsOnTarget: Number(
                match.boxscore.teams[0].statistics[8].displayValue
              ),
              possession: Number(
                match.boxscore.teams[0].statistics[6].displayValue
              ),
              fouls: Number(match.boxscore.teams[0].statistics[0].displayValue),
              yellowCards: Number(
                match.boxscore.teams[0].statistics[1].displayValue
              ),
              redCards: Number(
                match.boxscore.teams[0].statistics[2].displayValue
              ),
              corners: Number(
                match.boxscore.teams[0].statistics[4].displayValue
              ),
              offsides: Number(
                match.boxscore.teams[0].statistics[3].displayValue
              ),
            },
          }),
        },
        {
          id: match.boxscore.teams[1].team.id,
          name: match.boxscore.teams[1].team.shortDisplayName,
          abbreviation: match.boxscore.teams[1].team.abbreviation,
          logo: match.boxscore.teams[1].team.logo,
          color: match.boxscore.teams[1].team.color,
          winner: match.rosters[1].winner,
          score: Number(match.header.competitions[0].competitors[1].score),

          ...(match.rosters[1].roster && {
            formation: match.rosters[1].formation,
            players: {
              starters: match.rosters[1].roster.filter(
                (player) => player.starter === true
              ),
              substitutes: match.rosters[1].roster.filter(
                (player) => player.starter === false
              ),
            },
          }),
          ...(match.header.competitions[0].status.type.detail === "FT" && {
            goalscorers: match.header.competitions[0].details.filter(
              (scorer) => scorer.team.id === match.boxscore.teams[1].team.id
            ),
            stats: {
              goals: {
                firstHalf: Number(
                  match.header.competitions[0].competitors[1].linescores[0]
                    .displayValue
                ),
                secondHalf: Number(
                  match.header.competitions[0].competitors[1].linescores[1]
                    .displayValue
                ),
              },
              shotsOnTarget: Number(
                match.boxscore.teams[1].statistics[8].displayValue
              ),
              possession: Number(
                match.boxscore.teams[1].statistics[6].displayValue
              ),
              fouls: Number(match.boxscore.teams[1].statistics[0].displayValue),
              yellowCards: Number(
                match.boxscore.teams[1].statistics[1].displayValue
              ),
              redCards: Number(
                match.boxscore.teams[1].statistics[2].displayValue
              ),
              corners: Number(
                match.boxscore.teams[1].statistics[4].displayValue
              ),
              offsides: Number(
                match.boxscore.teams[1].statistics[3].displayValue
              ),
            },
          }),
        },
      ],
      league: {
        id: match.header.league.id,
        code: match.header.league.slug,
        name: match.header.league.name,
      },
    }));

    const leagueInfo = {
      league: league.leagues[0],
      matches: matchesStats,
    };

    return leagueInfo;
  } catch (error) {
    console.error("Error in getStatsGame:", error);
  }
}
