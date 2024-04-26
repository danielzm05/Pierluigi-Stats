import ProgressBar from "@ramonak/react-progress-bar";


export function MatchStats({homeTeam, awayTeam}){
  return (

    <div className="match-stats">
    {homeTeam && awayTeam && (
      <>
      
        <span>{homeTeam.possession}%</span>
        <ProgressBar className="stat-bar" completed={homeTeam.possession} dir="rtl" baseBgColor="#12141a" bgColor="#FFD369" height="8px" customLabel=" "/>
        <span>Possession</span>
        <ProgressBar className="stat-bar" completed={awayTeam.possession} baseBgColor="#12141a" bgColor="#FFD369" height="8px" customLabel=" "/>
        <span>{awayTeam.possession}%</span>

        <span>{homeTeam.shotsOnTarget}</span>
        <ProgressBar className="stat-bar" completed={homeTeam.shotsOnTarget} maxCompleted={homeTeam.shotsOnTarget+awayTeam.shotsOnTarget} dir="rtl" baseBgColor="#12141a" bgColor="#FFD369" height="8px" customLabel=" "/>
        <span>Shots On Target</span>
        <ProgressBar className="stat-bar" completed={awayTeam.shotsOnTarget} maxCompleted={homeTeam.shotsOnTarget+awayTeam.shotsOnTarget} baseBgColor="#12141a" bgColor="#FFD369" height="8px" customLabel=" "/>
        <span>{awayTeam.shotsOnTarget}</span>

        <span>{homeTeam.fouls}</span>
        <ProgressBar className="stat-bar" completed={homeTeam.fouls} maxCompleted={homeTeam.fouls+awayTeam.fouls} dir="rtl" baseBgColor="#12141a" bgColor="#FFD369" height="8px" customLabel=" "/>
        <span>Fouls</span>
        <ProgressBar className="stat-bar" completed={awayTeam.fouls} maxCompleted={homeTeam.fouls+awayTeam.fouls} baseBgColor="#12141a" bgColor="#FFD369" height="8px" customLabel=" "/>
        <span>{awayTeam.fouls}</span>

        <span>{homeTeam.corners}</span>
        <ProgressBar className="stat-bar" completed={homeTeam.corners} maxCompleted={homeTeam.corners+awayTeam.corners} dir="rtl" baseBgColor="#12141a" bgColor="#FFD369" height="8px" customLabel=" "/>
        <span>Corners</span>
        <ProgressBar className="stat-bar" completed={awayTeam.corners} maxCompleted={homeTeam.corners+awayTeam.corners} baseBgColor="#12141a" bgColor="#FFD369" height="8px" customLabel=" "/>
        <span>{awayTeam.corners}</span>

        <span>{homeTeam.yellowCards}</span>
        <ProgressBar className="stat-bar" completed={homeTeam.yellowCards} maxCompleted={homeTeam.yellowCards+awayTeam.yellowCards} dir="rtl" baseBgColor="#12141a" bgColor="#FFD369" height="8px" customLabel=" "/>
        <span>Yellow Cards</span>
        <ProgressBar className="stat-bar" completed={awayTeam.yellowCards} maxCompleted={homeTeam.yellowCards+awayTeam.yellowCards} baseBgColor="#12141a" bgColor="#FFD369" height="8px" customLabel=" "/>
        <span>{awayTeam.yellowCards}</span>

        <span>{homeTeam.redCards}</span>
        <ProgressBar className="stat-bar" completed={homeTeam.redCards} maxCompleted={homeTeam.redCards+awayTeam.redCards} dir="rtl" baseBgColor="#12141a" bgColor="#FFD369" height="8px" customLabel=" "/>
        <span>Red Cards</span>
        <ProgressBar className="stat-bar" completed={awayTeam.redCards} maxCompleted={homeTeam.redCards+awayTeam.redCards} baseBgColor="#12141a" bgColor="#FFD369" height="8px" customLabel=" "/>
        <span>{awayTeam.redCards}</span>

        <span>{homeTeam.offsides}</span>
        <ProgressBar className="stat-bar" completed={homeTeam.offsides} maxCompleted={homeTeam.offsides+awayTeam.offsides} dir="rtl" baseBgColor="#12141a" bgColor="#FFD369" height="8px" customLabel=" "/>
        <span>Offsides</span>
        <ProgressBar className="stat-bar" completed={awayTeam.offsides} maxCompleted={homeTeam.offsides+awayTeam.offsides} baseBgColor="#12141a" bgColor="#FFD369" height="8px" customLabel=" "/>
        <span>{awayTeam.offsides}</span>


        

      </>

      
    )}

  </div>

  )
}