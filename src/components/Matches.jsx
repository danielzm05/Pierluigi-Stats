import '../styles/Matches.css'
import { useState } from 'react';
import { MatchPredictions } from './MatchPredictions';
import { MatchLineUps } from './MatchLineUps';
import { MatchStats } from './MatchStats';

export function Matches({ matches }){

  return(
    <div className="matches">
      <span className='title'>Matches</span>
      {matches && matches.length > 0 ? (

          matches.map(match => (
            <Match match={match} key={match.id}/>
          ))

        ) : (
          <span className='message'>This league has no games on this date :( </span>
        )
      } 

    </div>
  )
}


function Match({ match }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showItem, setShowItem] = useState(1);

  const handleMatchClick = () => {
    setShowMenu(!showMenu);
  };

  const handleChangeItem = (number) => {
    setShowItem(number);
    console.log(number)
  };

  return (
    <div className="match" key={match.id}>

      <div className="match-info" onClick={() => handleMatchClick(match.id)}>
        <div className="team">
          <img className="logo" src={match.teams[0].logo} alt={`${match.teams[0].name} logo`} />
          <span>{match.teams[0].name}</span>
        </div>

        <div className="info-container">
          {
          match.status !== 'FT' 
          ? ( <span>VS</span>) 
          : (<span className='score'>{match.teams[0].score}-{match.teams[1].score}</span>)
          }
          <span className='date'>{match.date}</span>
        </div>


        <div className="team">
          <img className="logo" src={match.teams[1].logo} alt={`${match.teams[1].name} logo`} />
          <span>{match.teams[1].name}</span>
        </div>
      </div>

      {showMenu && (
      <div className="match-menu">
        <ul>
          <li className={showItem === 1 ? 'selected' : ''} onClick={() => handleChangeItem(1)}>STATS</li>
          <li className={showItem === 2 ? 'selected' : ''} onClick={() => handleChangeItem(2)}>LINEUPS</li>
          <li className={showItem === 3 ? 'selected' : ''} onClick={() => handleChangeItem(3)}>PREDICTIONS</li>
        </ul>

        {showItem === 1 && (
          <MatchStats
            homeTeam={match.teams[0].stats}
            awayTeam={match.teams[1].stats}
          />

        )}

        {showItem === 2 && (

          <MatchLineUps
            homeTeamFormation={match.teams[0].formation}
            homeTeamPlayers={match.teams[0].players}
            homeTeamColor={match.teams[0].color}
            awayTeamFormation={match.teams[1].formation}
            awayTeamPlayers={match.teams[1].players}
            awayTeamColor={match.teams[1].color}
          /> 
        )}

        {showItem === 3 && (
        <MatchPredictions 
          homeTeamId={match.teams[0].id}
          awayTeamId={match.teams[1].id}
          competition={match.league.code}
        />
        )}
        

      </div>
      )}
    </div>
  );
}

