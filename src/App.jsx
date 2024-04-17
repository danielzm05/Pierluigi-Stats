import { Header } from './components/Header';
import { useContext } from 'react';
import { FiltersContext } from './context/filter';
import { Match } from './components/Match';
import { Standings } from './components/Standings';
import { useFootballData } from './hooks/useFootballData';
import { getStandings } from './service/getStandings';
import './App.css'

export function App() {
  const { filters } = useContext(FiltersContext)
  let matches = useFootballData(`https://site.api.espn.com/apis/site/v2/sports/soccer/${filters.league}/scoreboard?dates=${filters.date}`, filters.league);
  
  

  return (
    <>
      <Header/>

      <main>
        <h2>Today Matches</h2>

      <Standings/>

      {
        matches && matches.length > 0 ? (

          matches.map(match => (
            <Match match={match} key={match.id}/>
          ))

        ) : (
          <span className='message'>This league has no games on this date :( </span>
        )
      }

      </main>
    </>
  )
}

export default App




