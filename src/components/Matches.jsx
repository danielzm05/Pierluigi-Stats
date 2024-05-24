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
  const [showInfo, setShowInfo] = useState(false);
  const [showItem, setShowItem] = useState(match.status === "FT" ? 1 : 3);

  const handleMatchClick = () => {
    setShowInfo(!showInfo);
  };

  const handleChangeItem = (number) => {
    setShowItem(number);
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

      {showInfo && (
        <>
        <div className="match-scorers">
          <div className="scorers home">
            
            {match.teams[0].goalscorers && match.teams[0].goalscorers.length > 0 ?(

                match.teams[0].goalscorers.map(scorer => (
                  <span>
                    {`${scorer.clock.displayValue} ${scorer.participants[0].athlete.displayName} `}
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="currentColor" d="M255.03 33.813a229.242 229.242 0 0 0-5.5.03c-6.73.14-13.462.605-20.155 1.344c.333.166.544.32.47.438L204.78 75.063l73.907 49.437l-.125.188l70.625.28L371 79.282L342.844 52a225.62 225.62 0 0 0-49.47-14.78c-12.65-2.24-25.497-3.36-38.343-3.407zM190.907 88.25l-73.656 36.78l-13.813 98.407l51.344 33.657l94.345-43.438l14.875-76.5l-73.094-48.906zm196.344.344l-21.25 44.5l36.75 72.72l62.063 38.905l11.312-21.282c.225.143.45.403.656.75c-.77-4.954-1.71-9.893-2.81-14.782c-6.446-28.59-18.59-55.962-35.5-79.97c-9.07-12.872-19.526-24.778-31.095-35.5l-20.125-5.342zm-302.656 23c-6.906 8.045-13.257 16.56-18.938 25.5c-15.676 24.664-26.44 52.494-31.437 81.312A223.087 223.087 0 0 0 31 261l20.25 5.094l33.03-40.5L98.75 122.53l-14.156-10.936zm312.719 112.844l-55.813 44.75l-3.47 101.093l39.626 21.126l77.188-49.594l4.406-78.75l-.094.157l-61.844-38.783zm-140.844 6.406l-94.033 43.312l-1.218 76.625l89.155 57.376l68.938-36.437l3.437-101.75l-66.28-39.126zm-224.22 49.75c.91 8.436 2.29 16.816 4.156 25.094c6.445 28.59 18.62 55.96 35.532 79.968c3.873 5.5 8.02 10.805 12.374 15.938l-9.374-48.156l.124-.032l-27.03-68.844zm117.188 84.844l-51.532 8.156l10.125 52.094a225.067 225.067 0 0 0 27.314 20.437a226.31 226.31 0 0 0 46.687 22.594l62.626-13.69l-4.344-31.124l-90.875-58.47zm302.437.5l-64.22 41.25l-42 47.375l4.408 6.156c12.027-5.545 23.57-12.144 34.406-19.72c23.97-16.76 44.604-38.304 60.28-62.97c2.51-3.947 4.87-7.99 7.125-12.092zm-122.78 97.656l-79.94 9.625l-25.968 5.655c26.993 4 54.717 3.044 81.313-2.813c9.412-2.072 18.684-4.79 27.75-8.062l-3.156-4.406z"/></svg>
                  </span>
                ))
            ): null}

          </div>

          <div className="scorers away">
            
            {match.teams[1].goalscorers && match.teams[1].goalscorers.length > 0 ?(

                match.teams[1].goalscorers.map(scorer => (
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="currentColor" d="M255.03 33.813a229.242 229.242 0 0 0-5.5.03c-6.73.14-13.462.605-20.155 1.344c.333.166.544.32.47.438L204.78 75.063l73.907 49.437l-.125.188l70.625.28L371 79.282L342.844 52a225.62 225.62 0 0 0-49.47-14.78c-12.65-2.24-25.497-3.36-38.343-3.407zM190.907 88.25l-73.656 36.78l-13.813 98.407l51.344 33.657l94.345-43.438l14.875-76.5l-73.094-48.906zm196.344.344l-21.25 44.5l36.75 72.72l62.063 38.905l11.312-21.282c.225.143.45.403.656.75c-.77-4.954-1.71-9.893-2.81-14.782c-6.446-28.59-18.59-55.962-35.5-79.97c-9.07-12.872-19.526-24.778-31.095-35.5l-20.125-5.342zm-302.656 23c-6.906 8.045-13.257 16.56-18.938 25.5c-15.676 24.664-26.44 52.494-31.437 81.312A223.087 223.087 0 0 0 31 261l20.25 5.094l33.03-40.5L98.75 122.53l-14.156-10.936zm312.719 112.844l-55.813 44.75l-3.47 101.093l39.626 21.126l77.188-49.594l4.406-78.75l-.094.157l-61.844-38.783zm-140.844 6.406l-94.033 43.312l-1.218 76.625l89.155 57.376l68.938-36.437l3.437-101.75l-66.28-39.126zm-224.22 49.75c.91 8.436 2.29 16.816 4.156 25.094c6.445 28.59 18.62 55.96 35.532 79.968c3.873 5.5 8.02 10.805 12.374 15.938l-9.374-48.156l.124-.032l-27.03-68.844zm117.188 84.844l-51.532 8.156l10.125 52.094a225.067 225.067 0 0 0 27.314 20.437a226.31 226.31 0 0 0 46.687 22.594l62.626-13.69l-4.344-31.124l-90.875-58.47zm302.437.5l-64.22 41.25l-42 47.375l4.408 6.156c12.027-5.545 23.57-12.144 34.406-19.72c23.97-16.76 44.604-38.304 60.28-62.97c2.51-3.947 4.87-7.99 7.125-12.092zm-122.78 97.656l-79.94 9.625l-25.968 5.655c26.993 4 54.717 3.044 81.313-2.813c9.412-2.072 18.684-4.79 27.75-8.062l-3.156-4.406z"/></svg>
                    {` ${scorer.participants[0].athlete.displayName} ${scorer.clock.displayValue} `}
                  </span>
                ))
            ): null}

          </div>

        </div>

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

        </>
      
      )}
    </div>
  );
}

