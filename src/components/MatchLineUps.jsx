import '../styles/MatchLineUps.css'
export function MatchLineUps ({ homeTeamFormation , homeTeamPlayers, homeTeamColor, awayTeamFormation, awayTeamPlayers, awayTeamColor }){

  return(
    <div className="lineups">

      {homeTeamFormation && (
        <>
      <span className="title-lineup">STARTERS</span>
      <div className="starters">
       <div className="team">
          {homeTeamPlayers.starters.map( player => (
            <Player key={player.athlete.id} name={player.athlete.displayName} number={player.jersey} shirtColor={homeTeamColor}/>
          ))}
        </div>

        <div className="team">
          {awayTeamPlayers.starters.map( player => (
            <Player key={player.athlete.id} name={player.athlete.displayName} number={player.jersey} shirtColor={awayTeamColor}/>
          ))}
        </div>
      </div>

      <span className="title-lineup">SUBSTITUTES</span>
      <div className="substitutes">
        <div className="team">
          {homeTeamPlayers.substitutes.map( player => (
            <Player key={player.athlete.id} name={player.athlete.displayName} number={player.jersey} shirtColor={homeTeamColor}/>
          ))}
        </div>

        <div className="team">
          {awayTeamPlayers.substitutes.map( player => (
            <Player key={player.athlete.id} name={player.athlete.displayName} number={player.jersey} shirtColor={awayTeamColor}/>
          ))}
        </div>

      </div>
        </>
      )}

    </div>

  )
}

const Player = ({ name, number, shirtColor }) => {
  return(
    <div className="player">
      <div className="shirt">
        <span className="number">{number}</span>
        <svg className="shirt-icon" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 1024 897"><path fill={`#${shirtColor}`} d="m1009 265l-72 72q-15 15-36.5 15T864 337l-32-31v527q0 26-18.5 45T768 897H256q-27 0-45.5-19T192 833V306l-32 31q-15 15-36.5 15T87 337l-72-72Q0 250 0 229t15-36L192 16q15-16 64-16h128q0 37 33.5 50.5T512 64t94.5-13.5T640 0h128q49 0 64 16l177 177q15 15 15 36t-15 36"/></svg>
      </div>
      <span>{name}</span>
    </div>
  )
}