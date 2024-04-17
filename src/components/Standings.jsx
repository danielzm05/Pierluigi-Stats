import { useState, useEffect } from 'react';
import { useFetchData } from "../hooks/useFetchData";

export function Standings () {
  const [groups, setGroups] = useState([]);

  useEffect(() => {

    const getStandings = async () => {
      try {

        const standings = await useFetchData('https://site.api.espn.com/apis/v2/sports/soccer/arg.copa_lpf/standings');
        
        const mappedGroups = standings?.children?.map(group => ({
          id: group.id,
          name: group.name,
          standings: group.standings.entries.map(team => ({
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
          }))
        }));

        setGroups(mappedGroups);

      } catch (error) {

        console.error('Error in getStandings:', error);
        setGroups([]); 
      }
    };

    getStandings();
  }, []);

  return (
    <div className='standings-container'>
      {groups.map(group => (
        <div className='standings' key={group.id}>
          <span className='title'>{group.name}</span>

          {group.standings.map(team => (
            <div className="team" key={team.id}>
              <span>10</span>
              <span>{team.name}</span>
            </div>
          ))}
          
        </div>
      ))}
    </div>
  );

};
