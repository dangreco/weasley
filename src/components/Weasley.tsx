import { HassEntity } from 'home-assistant-js-websocket';
import { concat, forEach, forOwn, groupBy, partition } from 'lodash';
import { useContext } from "preact/hooks";
import { HomeAssistantContext } from "../contexts/hass";
import { Severity } from '../types';
import Group from './Group';
import Person from './Person';
import Warning from './Warning';

const Weasley = () => {

    const {
        hass,
        config
    } = useContext(HomeAssistantContext);

    const validEntity = (entityId: string) => {
        return (
            entityId?.substring(0, 6) === 'person'
            &&
            // @ts-ignore
            hass.states[entityId]
        )
    }

    const {
        validEntities,
        invalidEntityIds
    } = (() => {

        const [validIds, invalidIds] = partition(config?.entities, validEntity);

        return {
            // @ts-ignore
            validEntities: validIds.map(id => hass!.states[id]),
            invalidEntityIds: invalidIds
        };
    })();

    const renderEntities = (entities: HassEntity[]) => {

        const grouped = groupBy(entities, entity => entity.state);

        const ok: HassEntity[][] = [];
        let misc: HassEntity[] = [];

        forOwn(grouped,
            (
                groupedEntities: HassEntity[],
                state: string
            ) => {
                if (groupedEntities.length > 1 || (config?.groups && config.groups!.includes(state))) {
                    ok.push(groupedEntities);
                } else {
                    misc = concat(misc, groupedEntities);
                }
            }
        )

        const renderable = [];

        forEach(ok, entities => renderable.push(
            <Group showTitle entities={entities} />
        ))

        misc.length > 0 ? renderable.push(
            <Group showTitle entities={misc} />
        ) : null

        return renderable;
    }

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8
                }}
            >
                {
                    invalidEntityIds.map(
                        invalidEntityId => (
                            <Warning
                                message={`"${invalidEntityId}" is not a valid entity.`}
                                severity={Severity.Low}
                            />
                        )
                    )
                }
                <div
                    style={{
                        display: "flex",
                        flexDirection: 'column',
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        gap: 24
                    }}
                >

                    {
                        renderEntities(validEntities)
                    }
                </div>
            </div>

        </div>
    )

}

export default Weasley;