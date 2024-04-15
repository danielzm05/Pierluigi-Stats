import '../styles/Match.css'
import { useState } from 'react';
import { MatchPredictions } from './MatchPredictions';
import { useFootballData } from "../hooks/useFootballData"

export function Match({ match }) {
  const [showPredictions, setShowPredictions] = useState(false);

  const handleMatchClick = () => {
    setShowPredictions(!showPredictions);
  };

  return (
    <div className="match" key={match.id} onClick={() => handleMatchClick(match.id)}>
      <div className="competition">
        {match.league.name} 
      </div>

      <div className="match-info">
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

      {showPredictions && (
        <MatchPredictions 
          homeTeamId={match.teams[0].id}
          awayTeamId={match.teams[1].id}
          competition={match.league.code}
        />
      ) }
    </div>
  );
}

