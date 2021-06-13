import { createContext } from "preact";
import { WeasleyCard } from "..";
import { HomeAssistant, WeasleyConfig } from '../types';

type HomeAssistantContextValues = {
    hass: Partial<HomeAssistant>;
    config: WeasleyConfig;
    card: WeasleyCard;
}

export const HomeAssistantContext = createContext<Partial<HomeAssistantContextValues>>({});
