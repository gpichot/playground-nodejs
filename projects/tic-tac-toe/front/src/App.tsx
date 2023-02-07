import { Outlet, useNavigate } from "react-router-dom";

import GameList from "./games/components/GameList";
import { useCreateGameMutation } from "./games/queries";
import { useSocket } from "./games/socket";

import "./globals.scss";
import styles from "./App.module.scss";

function App() {
  const createGameMutation = useCreateGameMutation();
  const navigate = useNavigate();

  const handleCreateGameClick = () => {
    createGameMutation.mutateAsync().then((game) => {
      // Navigate to the new game
      navigate(`/games/${game._id}`);
    });
  };

  const { isConnected } = useSocket();

  return (
    <div className={styles.app}>
      <div className={styles.gameList}>
        {isConnected ? "🟢" : "🔴"}
        <GameList />
        <button type="button" onClick={handleCreateGameClick}>
          New Game
        </button>
      </div>
      <div className={styles.main}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
