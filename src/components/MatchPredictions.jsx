import { getTeamPredictions } from "../service/getTeamPredictions"

export function MatchPredictions ({ show, homeTeamId, awayTeamId , competition}){
  //Quantity of games that i wnt to analyzed
  const quantityOfMatches = 5
  const homeTeam = getTeamPredictions(homeTeamId, competition, quantityOfMatches)
  const awayTeam = getTeamPredictions(awayTeamId, competition, quantityOfMatches)
  
  
  return(
    <div className="predictions">
      <div className="team-prediction">
        {
        homeTeam?.map( prediction => (
        <span key={prediction.title}>
          {prediction.title} 
          <b>
          {prediction.total}/{quantityOfMatches}
          </b>
        </span>
        ))}
      </div>

      <div className="team-prediction">
        {
        awayTeam?.map( prediction => (
        <span key={prediction.title}>
          {prediction.title} 
          <b>
          {prediction.total}/{quantityOfMatches}
          </b>
        </span>
        ))}
      </div>
    </div>
  )
}