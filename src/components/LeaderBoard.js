import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar";

function LeaderBoard() {
    const [category, setCategory] = useState('actor');
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleLeaderBoard = (e) => {
      e.preventDefault();
        setLoading(true);
        setError('');

        fetch(`http://localhost:8000/${category}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch leaderboard data');
                }
                return response.json();
            })
            .then(data => {
                setLoading(false);
                const sortedData = data.sort((a, b) => b.rank - a.rank);
                setLeaderboardData(sortedData);
            })
            .catch(error => {
                setLoading(false);
                setError(error.message);
            });
    }
    useEffect(() => {
        handleLeaderBoard({ preventDefault: () => {} });
    }, [category]);


    return (
    <div class="header">
        <Navbar></Navbar>
        <div class="content">
            <div class="sidebar">
                <h1 class="sidetext">LeaderBoards</h1>
            </div>
            <div class="leadership">
                <div class="category">
                    <div class="radiofield">
                        <input
                          id="c1"
                          type="radio"
                          name="c"
                          value="actor"
                          onChange={handleCategoryChange}
                          checked={category === 'actor'}
                        />
                        <label for="c1" class="radiolabel0">Actor</label>
                        <input
                          id="c2"
                          type="radio"
                          name="c"
                          value="actress"
                          onChange={handleCategoryChange}
                          checked={category === 'actress'}
                        />
                        <label for="c2" class="radiolabel1">Actress</label>
                        <input
                          id="c3"
                          type="radio"
                          name="c"
                          value="singer"
                          onChange={handleCategoryChange}
                          checked={category === 'singer'}
                        />
                        <label for="c3" class="radiolabel2">Singer/Musician</label>
                        <input
                          id="c4"
                          type="radio"
                          name="c"
                          value="tvshow"
                          onChange={handleCategoryChange}
                          checked={category === 'tvshow'}
                        />
                        <label for="c4" class="radiolabel3">Tv Show/Animation</label>
                        <input
                          id="c5"
                          type="radio"
                          name="c"
                          value="movie"
                          onChange={handleCategoryChange}
                          checked={category === 'movie'}
                        />
                        <label for="c5" class="radiolabel4">Movie</label>
                    </div>
                </div>
                <div class="results">
                {loading && <p>Loading...</p>}
                        {error && <p className="error">{error}</p>}
                        {!loading && !error && (
                            <div className="items">
                                {leaderboardData.map((item, index) => (
                                    <div className="item" key={item.id}>
                                        <div className="block">
                                            <div className="image">
                                                <img src={item.image} alt={item.name} />
                                            </div>
                                            <div className="texts">
                                                <p>{item.name}</p>
                                                <p>Rank: {item.rank}</p>
                                            </div>
                                        </div>
                                        <div className="rank">
                                            <h1>#{index + 1} {item.name}</h1>
                                        </div>
                                        <div className="bgimage">
                                            <img src={item.image} alt={item.name} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                </div>
            </div>
        </div>
    </div>
    );
  }
  
export default LeaderBoard;
  