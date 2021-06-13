import { FunctionComponent } from "preact";
import { useState } from 'preact/hooks';
import Loading from "./Loading";
import { HomeAssistant, WeasleyConfig } from "../types";
import Weasley from "./Weasley";
import { HomeAssistantContext } from '../contexts/hass';
import { WeasleyCard } from "..";

type WeasleyProps = {
    hass?: Partial<HomeAssistant> | undefined,
    config?: WeasleyConfig | undefined,
    card: WeasleyCard
}

export const Root: FunctionComponent<WeasleyProps> = ({
    hass,
    config,
    card
}) => {

    return (
        <>
            {/* @ts-ignore */}
            <ha-card>
                <div style={{position: 'relative', overflow: 'hidden', padding: 16}}>

                    {
                        hass !== undefined && config !== undefined ? (
                        
                            <HomeAssistantContext.Provider value={{hass, config, card}}>
                                <Weasley />
                            </HomeAssistantContext.Provider>

                        ) : <Loading />
                    }
                </div>
                {/* @ts-ignore */}
            </ha-card>
        </>
    )

}