import { useFetchData } from "../hooks/useFetchData";

export async function getStandings() {
  try {
    const standings = await useFetchData(`https://site.api.espn.com/apis/v2/sports/soccer/arg.copa_lpf/standings`);
    const mappedGroups = standings?.children?.map(group => ({
      id: group.id,
      name: group.name,
      standings: group.standings.entries.map(team => ({

        id: team.team.id,

        name: team.team.displayName,
        logo: team.team.logos[0].href,
        stats: team.stats,

      }))
    }));
    console.log(mappedGroups)
    return mappedGroups;
  } catch (error) {
    console.error('Error in getStandings:', error);
    return []; // Devuelve un array vacío en caso de error
  }
}
