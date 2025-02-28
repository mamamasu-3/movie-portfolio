// src/components/MovieList.js
import React, { useState, useEffect } from 'react';
import config from '../config';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // APIエンドポイントURL（TMDb v3：人気の映画）
    // 日本語表示の場合は language=ja-JP を指定
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${config.TMDB_API_KEY}&language=ja-JP&page=1`;
    
    // ※ APIリードアクセストークンを使いたい場合は、下記のようにヘッダーに設定し、URLからapi_keyを除去してください
    /*
    const url = `https://api.themoviedb.org/3/movie/popular?language=ja-JP&page=1`;
    */

    fetch(url, {
      headers: {
        // APIリードアクセストークンを使用する場合は以下のコメントアウトを外す
        // Authorization: `Bearer ${config.TMDB_READ_ACCESS_TOKEN}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("ネットワークエラーが発生しました");
        }
        return response.json();
      })
      .then(data => {
        setMovies(data.results);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
      });
  }, []);

  if (error) {
    return <div>エラー: {error}</div>;
  }

  return (
    <div>
      <h2>人気の映画</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {movies.map(movie => (
          <div key={movie.id} style={{ margin: "10px", width: "200px" }}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={{ width: "100%" }}
            />
            <h3 style={{ fontSize: "16px" }}>{movie.title}</h3>
            <p style={{ fontSize: "14px" }}>{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
