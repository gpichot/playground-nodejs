import { Link, useParams } from "react-router-dom";

import { useGameListQuery } from "../queries";

import styles from "./GameList.module.scss";

export default function GameList() {
  const gameList = useGameListQuery();
  const { gameId } = useParams<{ gameId: string }>();

  if (gameList.isLoading) {
    return <div>Loading...</div>;
  }

  if (gameList.isError) {
    return <div>Error!</div>;
  }

  return (
    <div>
      <h1>Game List</h1>
      <ul className={styles.gameList}>
        {gameList.data.map((game) => (
          <li
            key={game._id}
            className={game._id === gameId ? styles.active : ""}
          >
            <Link to={`/games/${game._id}`}>
              {game._id}
              {game.winner && ` - ${game.winner} won!`}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
