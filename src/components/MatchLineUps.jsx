export function MatchLineUps ({ homeTeamFormation , homeTeamPlayers, homeTeamColor, awayTeamFormation, awayTeamPlayers, awayTeamColor }){

  return(
    <div className="lineUps">
      {homeTeamFormation}
      {awayTeamFormation}
    </div>
  )
}