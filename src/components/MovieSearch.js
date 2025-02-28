// src/components/MovieSearch.js

// ReactライブラリとuseStateフックをインポートします。
// useStateはコンポーネント内で状態（変数）を管理するための関数です。
import React, { useState } from 'react';

// config.jsからTMDb APIの設定情報（APIキーなど）をインポートします。
import config from '../config';

// このコンポーネント専用のCSSスタイルシートを読み込みます。
import "./MovieSearch.css";

// MovieSearchコンポーネントを定義します。
function MovieSearch() {
  // queryはユーザーが入力した検索キーワードを保持する状態です。
  // 初期値は空文字列("")に設定しています。
  const [query, setQuery] = useState("");
  
  // resultsは映画検索の結果（映画オブジェクトの配列）を保持する状態です。
  // 初期値は空の配列([])です。
  const [results, setResults] = useState([]);
  
  // errorは検索中に発生したエラーメッセージを保持する状態です。
  // 初期値はnull（エラーなし）です。
  const [error, setError] = useState(null);

  // handleSearchはフォームが送信されたときに実行される関数です。
  // eはイベントオブジェクトで、フォーム送信時の情報が含まれています。
  const handleSearch = (e) => {
    // フォーム送信時のデフォルトの動作（ページリロード）を防ぎます。
    e.preventDefault();
    
    // 入力された検索キーワードの前後の空白を除去し、空文字列の場合は処理を中断します。
    if(query.trim() === "") return;

    // TMDb APIの検索エンドポイントURLを作成します。
    // URLにはAPIキー、表示言語（日本語）、ページ番号、そして検索キーワード（エンコード済み）を含めています。
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${config.TMDB_API_KEY}&language=ja-JP&page=1&query=${encodeURIComponent(query)}`;
    
    // fetch関数を使って、上記URLにHTTPリクエストを送信します。
    fetch(url, {
      headers: {
        // 必要に応じて、APIリードアクセストークンを使用する場合は以下のコメントを外して設定できます。
        // Authorization: `Bearer ${config.TMDB_READ_ACCESS_TOKEN}`
      }
    })
      // レスポンスが返ってきたら、まず正常なレスポンスかどうかをチェックします。
      .then(response => {
        // レスポンスが正常でなければ、エラーを投げて後続の処理を停止します。
        if (!response.ok) throw new Error("検索中にエラーが発生しました");
        // 正常な場合、レスポンスの内容をJSON形式に変換して返します。
        return response.json();
      })
      // JSONに変換されたデータ（映画情報）を受け取り、results状態に保存します。
      .then(data => setResults(data.results))
      // エラーが発生した場合、catchブロックでエラーメッセージをerror状態に保存します。
      .catch(err => setError(err.message));
  };

  // コンポーネントが画面に表示する部分（JSX）を返します。
  return (
    // CSSクラス「search-container」を持つdivタグで全体を囲みます。
    <div className="search-container">
      {/* 見出しとして「映画検索」を表示します。 */}
      <h2>映画検索</h2>
      
      {/* フォームタグ。ユーザーが検索キーワードを入力し、送信できるようにします。 */}
      {/* onSubmit属性にhandleSearch関数を指定し、フォーム送信時に検索処理を実行します。 */}
      <form onSubmit={handleSearch} className="search-form">
        {/* テキスト入力フィールド。ユーザーが映画のタイトルを入力するためのものです。 */}
        <input 
          type="text" // 入力フィールドのタイプはテキストです。
          placeholder="映画のタイトルを入力..." // 入力欄に表示されるヒントテキストです。
          value={query} // 入力されている値はquery状態の値と連動します。
          // ユーザーが入力を変更するたびに、setQuery関数を使ってquery状態を更新します。
          onChange={(e) => setQuery(e.target.value)} 
          className="search-input" // CSSクラスを指定してスタイルを適用します。
        />
        {/* 検索ボタン。クリックするとフォームが送信され、検索処理が実行されます。 */}
        <button type="submit" className="search-button">検索</button>
      </form>
      
      {/* error状態に値がある場合（エラーが発生している場合）、そのエラーメッセージを表示するdivタグです。 */}
      {error && <div className="error">{error}</div>}
      
      {/* 検索結果を表示するためのdivタグ。CSSクラス「search-results」でスタイルが適用されます。 */}
      <div className="search-results">
        {/* results配列の各映画オブジェクトに対してmap関数を使って表示内容を作成します。 */}
        {results.map(movie => (
          // 各映画情報を表示するためのdivタグです。movie.idをkey属性に指定して一意性を保ちます。
          <div key={movie.id} className="search-item">
            {/* 映画のポスター画像を表示します。 */}
            <img 
              // poster_pathが存在する場合はTMDbの画像URLに連結し、画像を表示します。
              // もしposter_pathがない場合は、代替画像（プレースホルダー画像）を表示します。
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : "https://via.placeholder.com/200x300?text=No+Image"} 
              alt={movie.title} // 画像が表示されない場合に、映画タイトルを代替テキストとして表示します。
              className="search-poster" // CSSクラスで画像にスタイルを適用します。
            />
            {/* 映画のタイトルとあらすじを表示するための領域です。 */}
            <div className="search-info">
              {/* 映画のタイトルを見出し（h3タグ）で表示します。 */}
              <h3>{movie.title}</h3>
              {/* 映画のあらすじを段落（pタグ）で表示します。 */}
              {/* あらすじがある場合は、最初の150文字を表示し、「...」を付加します。 */}
              {/* あらすじがない場合は「概要なし」と表示します。 */}
              <p>{movie.overview ? movie.overview.substring(0, 150) + "..." : "概要なし"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// MovieSearchコンポーネントをエクスポートして、他のファイルでインポートできるようにします。
export default MovieSearch;
