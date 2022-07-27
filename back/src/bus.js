import EventEmitter from "events";
const bus = new EventEmitter();
bus.setMaxListeners(5);

export default bus;
