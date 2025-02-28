# My TMDb React App

このリポジトリは、TMDb APIを活用して映画のポスターやあらすじを表示するReactアプリ（React 18）です。  
人気映画のカルーセル表示や、映画検索機能を備えたリッチなデザインのサイトになっています。

## 目次

- [特徴](#特徴)
- [下準備](#下準備)
- [インストール方法](#インストール方法)
- [設定ファイルの作成](#設定ファイルの作成)
- [APIトークンの取得方法](#apiトークンの取得方法)
- [使い方](#使い方)
- [ライセンス](#ライセンス)

## 特徴

- **人気映画のカルーセル**  
  TMDb APIから人気映画情報を取得し、動的にスライドするカルーセルで表示します。

- **映画検索機能**  
  映画タイトルを入力すると、TMDb APIから検索結果を取得して表示します。

- **リッチなデザイン**  
  CSSと`react-slick`を用いて、見やすく、直感的に操作できるUIを実現しています。

## 下準備

以下のツールをインストールしてください。

- [Node.js](https://nodejs.org/)（本プロジェクトでは、`node -v`が`v22.14.0`で動作確認済みです）
- npm（Node.jsに同梱されています）

## インストール方法

1. このリポジトリをクローンします。

   ```bash
   git clone https://github.com/あなたのユーザー名/MyTMDbReactApp.git
   cd MyTMDbReactApp
   ```

2. 必要なパッケージをインストールします。

   ```bash
   npm install
   ```

3. さらに、以下のコマンドでカルーセルに必要なパッケージもインストールしてください。

   ```bash
   npm install react-slick slick-carousel
   ```

## 設定ファイルの作成

プロジェクト内の `src/config.js` ファイルに、TMDb APIの**APIキー**と**APIリードアクセストークン**を設定してください。

例:

```js
// src/config.js
const config = {
  TMDB_API_KEY: "YOUR_API_KEY_HERE",             // ご自身のTMDb APIキーを設定
  TMDB_READ_ACCESS_TOKEN: "YOUR_READ_ACCESS_TOKEN_HERE",  // ご自身のTMDb APIリードアクセストークンを設定
};

export default config;
```

## APIトークンの取得方法

TMDb APIを利用するには、APIキーとAPIリードアクセストークンが必要です。  
これらの取得方法については、以下のURLを参照してください。

[TMDb APIのトークンの取得方法 - Chocolat5](https://chocolat5.com/tips/tmdb-api/)

簡単な手順は以下の通りです：

1. [TMDbの公式サイト](https://www.themoviedb.org/)にアクセスし、アカウントを作成します。  
2. アカウントにログイン後、APIセクションへ移動し、APIキーを申請します。  
3. 同様に、必要に応じてリードアクセストークンも取得します。

## 使い方

1. 設定ファイルにAPIキーとアクセストークンを設定後、以下のコマンドでアプリを起動します。

   ```bash
   npm start
   ```

2. ブラウザで [http://localhost:3000](http://localhost:3000) にアクセスすると、人気映画のカルーセルと映画検索機能が動作するアプリが表示されます。

## ライセンス

このプロジェクトはMITライセンスのもと公開されています。  
詳しくは、LICENSEファイルをご参照ください.
