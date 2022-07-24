import EventEmitter from "events";

type Message = {
  id: string;
  username: string;
  text: string;
  sendAt: string;
};
interface Bus extends EventEmitter {
  emit(event: "newMessage", message: Message): boolean;
}

export const bus: Bus = new EventEmitter();

bus.setMaxListeners(5);
