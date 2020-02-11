import { createContext } from "react";

// ReSharper disable once InconsistentNaming
const EventContext = createContext<Function>(() => { });

// ReSharper disable once InconsistentNaming
export const EventProvider = EventContext.Provider;

// ReSharper disable once InconsistentNaming
export const EventConsumer = EventContext.Consumer;

export { EventContext };