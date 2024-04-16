import { useFootballData } from "../hooks/useFootballData";

export function getTeamPredictions (teamId, competition , quantityOfMatches){
  
  let lastMatches = useFootballData(`https://site.api.espn.com/apis/site/v2/sports/soccer/${competition}/teams/${teamId}/schedule`, competition)
  lastMatches = lastMatches?.slice(0, quantityOfMatches) 
  /* INCLUIR BTTS Y WINNER FH Y */
  let predictions = [
    { 
      title: 'Over 2.5 goals in the Games',
      total: lastMatches?.filter(match => match.teams[0].score + match.teams[1].score > 2).length,
    },{
      title: 'Under 2.5 goals in the Games',
      total: lastMatches?.filter(match => match.teams[0].score + match.teams[1].score <= 2).length,
    },{ 
      title: 'Scoring more than 1.5 goals',
      total: lastMatches?.filter(match => match.teams.some(team => team.id === teamId && team.score > 1)).length,
    },{
      title: 'Scoring less than 1.5 goals',
      total: lastMatches?.filter(match => match.teams.some(team => team.id === teamId && team.score <= 1)).length,
    },{ 
      title: 'Over 20.5 Fouls in the Game',
      total: lastMatches?.filter(match => match.teams[0].stats.fouls + match.teams[1].stats.fouls > 20 ).length,
    },{
      title: 'Under 20.5 Fouls in the Game',
      total: lastMatches?.filter(match => match.teams[0].stats.fouls + match.teams[1].stats.fouls <= 20 ).length,
    },{ 
      title: 'Committing more than 9.5 fouls',
      total: lastMatches?.filter(match => match.teams.some(team => team.id === teamId && team.stats.fouls > 9)).length,
    },{
      title: 'Committing less than 9.5 fouls',
      total: lastMatches?.filter(match => match.teams.some(team => team.id === teamId && team.stats.fouls <= 9)).length,
    },{ 
      title: 'Over 4.5 Yellow Cards in the Game',
      total: lastMatches?.filter(match => match.teams[0].stats.yellowCards + match.teams[1].stats.yellowCards > 4).length,
    },{
      title: 'Under 4.5 Yellow Cards in the Game',
      total: lastMatches?.filter(match => match.teams[0].stats.yellowCards + match.teams[1].stats.yellowCards <= 4).length,
    },{ 
      title: 'Receiving more than 1.5 Yellow Cards',
      total: lastMatches?.filter(match => match.teams.some(team => team.id === teamId && team.stats.yellowCards > 1)).length,
    },{
      title: 'Receiving less than 3.5 Yellow Cards',
      total: lastMatches?.filter(match => match.teams.some(team => team.id === teamId && team.stats.yellowCards <= 3)).length,
    },{ 
      title: 'Over 10.5 Corners in the Game',
      total: lastMatches?.filter(match => match.teams[0].stats.corners + match.teams[1].stats.corners > 10).length,
    },{
      title: 'Under 10.5 Corners in the Game',
      total: lastMatches?.filter(match => match.teams[0].stats.corners + match.teams[1].stats.corners <= 10).length,
    },{ 
      title: 'Made more than 4.5 Corners',
      total: lastMatches?.filter(match => match.teams.some(team => team.id === teamId && team.stats.corners > 4)).length,
    },{
      title: 'Made less than 4.5 Corners',
      total: lastMatches?.filter(match => match.teams.some(team => team.id === teamId && team.stats.corners <= 4)).length,
    },{ 
      title: 'Over 3.5 Offsides in the Game',
      total: lastMatches?.filter(match => match.teams[0].stats.offsides + match.teams[1].stats.offsides > 3 ).length,
    },{
      title: 'Under 3.5 Offsides in the Game',
      total: lastMatches?.filter(match => match.teams[0].stats.offsides + match.teams[1].stats.offsides <= 3 ).length,
    },{ 
      title: 'Committing more than 1.5 Offsides',
      total: lastMatches?.filter(match => match.teams.some(team => team.id === teamId && team.stats.offsides > 9)).length,
    },{
      title: 'Committing less than 1.5 Offsides',
      total: lastMatches?.filter(match => match.teams.some(team => team.id === teamId && team.stats.offsides <= 9)).length,
    }
  ]
    
  predictions = predictions?.filter(prediction => prediction.total >= quantityOfMatches-1)

  return predictions
}







