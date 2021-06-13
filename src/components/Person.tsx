import { HassEntity } from "home-assistant-js-websocket";
import { FunctionalComponent } from "preact";
import { useContext, useState } from "preact/hooks";
import { HomeAssistantContext } from "../contexts/hass";
import dayjs from 'dayjs'
import { motion, AnimatePresence } from "framer-motion"
import { fireEvent } from '../utils';

const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
dayjs.extend(isSameOrAfter);
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime);

type PersonProps = {
    entity: HassEntity;
}

const Person: FunctionalComponent<PersonProps> = ({
    entity
}) => {

    const {
        attributes: {
            friendly_name,
            entity_picture,
        },
        last_updated,
        entity_id
    } = entity;

    const {
        hass,
        config,
        card
    } = useContext(HomeAssistantContext);

    const [pressingImage, setPressingImage] = useState(false);

    const lastUpdated = dayjs(last_updated);

    const moreInfo = () => {
        // @ts-ignore
        fireEvent(card!, "hass-more-info", {
            entityId: entity_id
        });
    };

    const imageVariants = {
        up: { scale: 1 },
        down: { scale: 0.8 },
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    width: 106,
                    height: 106
                }}
            >   

                <button
                    onClick={moreInfo}
                    onPointerDown={() => setPressingImage(true)}
                    onPointerUp={() => setPressingImage(false)}
                    style={{
                        backgroundColor: 'transparent',
                        margin: 0,
                        padding: 0,
                        outline: 'none',
                        border: 'none'
                    }}
                >
                    <motion.div
                        initial="up"
                        animate={ pressingImage ? 'down' : 'up' }
                        variants={imageVariants}
                        style={{
                            backgroundImage: `url("${entity_picture}")`,
                            width: 64,
                            height: 64,
                            borderRadius: '50%',
                            backgroundSize: 'cover',
                            backgroundPosition: "center"
                        }}
                    >

                    </motion.div>
                </button>
                

                <p
                    style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: 8,
                        fontSize: 16,
                        marginBottom: 0
                    }}
                >
                    {
                        config?.first_name_only ? (
                            friendly_name?.split(/\s/)[0]
                        ) : friendly_name
                    }
                </p>
                <p
                    style={{
                        textAlign: "center",
                        opacity: 0.5,
                        fontSize: 10,
                        margin: 0,
                        lineHeight: '14px'
                    }}
                >
                    { /* @ts-ignore */}
                    {lastUpdated.fromNow(false)}
                </p>
            </motion.div>
        </AnimatePresence>
    )

}

export default Person;