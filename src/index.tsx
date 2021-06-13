import { render } from "preact";
import { Root } from "./components/Root";
import { HomeAssistant, WeasleyConfig } from "./types";

declare global {
    interface Window {
        customCards?: object[];
    }
}

export class WeasleyCard extends HTMLElement {

    
    _hass?: Partial<HomeAssistant>;
    _config?: WeasleyConfig;

    public static getStubConfig(
      hass: HomeAssistant,
      entities: string[],
      entitiesFallback: string[]
    ) : WeasleyConfig {

        const getPersons = (eids: string[]) => eids.filter(eid => eid.startsWith("person.") && hass.states[eid]);

        const found = getPersons(entities);

        if (found.length > 0) return {
            type: "custom:weasley-card",
            entities: found
        }

        return {
            type: "custom:weasley-card",
            entities: getPersons(entitiesFallback)
        }

    }


    set hass(hass: Partial<HomeAssistant>) 
    {
        this._hass = hass;
        this._render();
    }

    setConfig(config: WeasleyConfig)
    {
        this._config = config;
        this._render();
    }

    getCardSize() 
    {
        return 1;
    }

    connectedCallback()
    {
        this._render();
    }

    disconnectedCallback() 
    {
        render('', this);
    }

    _render()
    {
        render(
            <Root hass={this._hass} config={this._config} card={this} />,
            this
        )
    }

}

customElements.define('weasley-card', WeasleyCard);

window.customCards?.push({
    type: 'weasley-card',
    name: "Weasley Card",
    preview: true,
    description: "Shows the whereabouts your HA memebers via device tracker -- like the Weasley clock!"
})