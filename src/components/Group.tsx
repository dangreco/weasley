import dayjs from "dayjs"
import { HassEntity } from "home-assistant-js-websocket"
import { orderBy, uniq } from "lodash"
import { FunctionalComponent } from "preact"
import { useContext } from "preact/hooks"
import { HomeAssistantContext } from "../contexts/hass"
import Person from "./Person"


type GroupProps = {
    entities: HassEntity[];
    showTitle?: boolean;
}

const Group: FunctionalComponent<GroupProps> = ({
    entities,
    showTitle = false
}) => {

    const {
        config
    } = useContext(HomeAssistantContext);

    const hasEntities = entities.length > 0;

    const getTitle = () => {

        const homogenous = uniq(
            entities.map(entity => entity.state)
        ).length === 1;
        

        return homogenous && entities[0].state !== "unknown" ? entities[0].state.substring(0,1).toUpperCase() + entities[0].state.substring(1) :
            config?.misc_group_name || "Unknown"

    }

    return (
        <div style={{
            width: '100%'
        }}>
            {
                showTitle && hasEntities ? (
                    <p
                        style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginTop: 0,
                            marginLeft: 0,
                            marginRight: 0,
                            marginBottom: 18
                        }}
                    >
                        { getTitle() }
                    </p>
                ) : (null)
            }
            <div

                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: 24
                }}

            >
                {
                    orderBy(entities, e => dayjs(e.last_updated).unix(), "desc").map(
                        entity => <Person entity={entity} />
                    )
                }
            </div>
            
        </div>
    )

}

export default Group;