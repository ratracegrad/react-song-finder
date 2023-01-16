import { useState } from 'react'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [artists, setArtists] = useState([]);

  const findMusic = () => {
    if (!searchTerm || searchTerm === '') {
      alert('Please enter a search term');
    } else {
      const url = `https://itunes.apple.com/search?term=${searchTerm}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setArtists(data.results);
        })
    }
  }

  return (
    <div className="App">
      <h1>Song Finder</h1>
      <input 
        type="text"
        placeholder="Enter search term"
        onChange={e => setSearchTerm(e.target.value)}
      ></input>
      <button className="btn" onClick={(() => findMusic() )}>Search</button>
      <hr></hr>
      {artists.length && (
        <table>
          <thead>
            <tr>
              <th>Artwork</th>
              <th>Artist Name</th>
              <th>Track Name</th>
              <th>Price</th>
            </tr>
          </thead>
            <tbody>
              {artists.map((artist) => {
                const list = (
                  <>
                    <tr>
                    <td><img src={artist.artworkUrl60} alt={artist.artistName} /></td>
                      <td key={artist.artistId}>{artist.artistName}</td>
                      <td>{artist.trackCensoredName}</td>
                      <td>{artist.collectionPrice}</td>
                    </tr>
                    
                  </>
                );
                return list;
              })}
            </tbody>
        </table>
      )}
    </div>
  )
}

export default App
