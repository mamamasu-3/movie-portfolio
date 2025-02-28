// src/components/MovieCarousel.js
import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import config from '../config';
import "./MovieCarousel.css";

// slick-carouselのCSSを読み込み
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function MovieCarousel() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 人気映画のエンドポイント（日本語表示）
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${config.TMDB_API_KEY}&language=ja-JP&page=1`;
    
    // ※APIリードアクセストークンを利用する場合は、URLからapi_keyを外し、ヘッダーにAuthorizationを設定してください。
    fetch(url, {
      headers: {
        // Authorization: `Bearer ${config.TMDB_READ_ACCESS_TOKEN}`
      }
    })
      .then(response => {
        if (!response.ok) throw new Error("ネットワークエラーが発生しました");
        return response.json();
      })
      .then(data => setMovies(data.results))
      .catch(err => setError(err.message));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // 画面に表示するスライド数
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  if (error) {
    return <div>エラー: {error}</div>;
  }

  return (
    <div className="carousel-container">
      <h2>人気の映画</h2>
      <Slider {...settings}>
        {movies.map(movie => (
          <div key={movie.id} className="carousel-item">
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title}
              className="movie-poster"
            />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>{movie.overview ? movie.overview.substring(0, 100) + "..." : "概要なし"}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default MovieCarousel;
