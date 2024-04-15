import { useContext, useState} from 'react'
import { FiltersContext } from '../context/filter'
import { Calendar } from './Calendar';
import '../styles/Header.css'



export function Header (){
  const [showCalendar , setShowCalendar] = useState(false)
  const {updateLeague} = useContext(FiltersContext)

  const handleLeagueChange = (leagueCode) => {
    updateLeague(leagueCode)
  }

  const handleShowCalendar = () => {
    setShowCalendar(!showCalendar)
  }

  return(
    <header>
    <a className="logo" href="#">Pierluigi Stats</a>
    

    <nav>
      <ul className="menu">
        <li className="menu__item" onClick={handleShowCalendar}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24"><path fill="currentColor" d="M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V3q0-.425.288-.712T7 2q.425 0 .713.288T8 3v1h8V3q0-.425.288-.712T17 2q.425 0 .713.288T18 3v1h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5z"/></svg>
        </li>

        {showCalendar &&
          <Calendar/>
        }

        <li className="menu__item" >
          Leagues
          <ul className='submenu'>
              
            <li className="submenu__item" onClick={() => handleLeagueChange('eng.1')}>
              Premier League
              <div className="overlay">
                <img className="image" src="https://media.api-sports.io/football/leagues/39.png" alt="Premier League Logo"/>
              </div>
            </li>
            
            <li className="submenu__item" onClick={() => handleLeagueChange('arg.copa_lpf')}>
              Copa de La liga
              <div className="overlay">
                <img className="image" src="https://media.api-sports.io/football/leagues/128.png" alt="Copa de la Liga Logo"/>
              </div>
            </li>

            <li className="submenu__item" onClick={() => handleLeagueChange('esp.1')}>
              La Liga
              <div className="overlay">
                <img className="image" src="https://media.api-sports.io/football/leagues/140.png" alt="La liga Logo"/>
              </div>
            </li>

            <li className="submenu__item" onClick={() => handleLeagueChange('ger.1')}>
              Bundesliga
              <div className="overlay">
                <img className="image" src="https://media.api-sports.io/football/leagues/78.png" alt="Bundeliga Logo"/>
              </div>
            </li>

            <li className="submenu__item" onClick={() => handleLeagueChange('ita.1')}>
              Serie A
              <div className="overlay">
                <img className="image" src="https://a4.espncdn.com/combiner/i?img=%2Fi%2Fleaguelogos%2Fsoccer%2F500%2F12.png" alt="Serie A Logo"/>
              </div>
            </li>

            <li className="submenu__item" onClick={() => handleLeagueChange('fra.1')}>
              Ligue 1
              <div className="overlay">
                <img className="image" src="https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/9.png&scale=crop&cquality=40&location=origin&w=80&h=80" alt="Ligue 1 Logo"/>
              </div>
            </li> 

            <li className="submenu__item" onClick={() => handleLeagueChange('eng.2')}>
              Championship
              <div className="overlay">
                <img className="image" src="https://b.fssta.com/uploads/application/soccer/competition-logos/EnglishChampionship.png" alt="Championship 1 Logo"/>
              </div>
            </li> 
          </ul>
        </li>

      </ul>
    </nav>
  </header>
  )
}

