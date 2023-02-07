import { EventEmitter } from "events";

class GameBus extends EventEmitter {}

export default new GameBus();
