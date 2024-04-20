import { Header } from './components/Header';
import { useContext } from 'react';
import { FiltersContext } from './context/filter';
import { Standings } from './components/Standings';
import { Matches } from './components/Matches';
import { useFootballData } from './hooks/useFootballData';
import './App.css'

export function App() {
  const { filters } = useContext(FiltersContext)
  let matches = useFootballData(`https://site.api.espn.com/apis/site/v2/sports/soccer/${filters.league}/scoreboard?dates=${filters.date}`, filters.league);
  
  

  return (
    <>
      <Header/>

      <main>
        {/* <h2>Today Matches</h2> */}
        
      <Matches matches={matches}/>
      <Standings/>
      

      </main>
    </>
  )
}

export default App




