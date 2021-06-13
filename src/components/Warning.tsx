import { FunctionalComponent } from "preact"
import { Severity } from "../types";

type WarningProps = {
    message: string;
    severity?: Severity
}

const SEVERITY_COLORS = {
    [Severity.Gentle]: {
        background: '#2196F3',
        text: '#fff'
    },
    [Severity.Low]: {
        background: '#FFC107',
        text: '#282828'
    },
    [Severity.High]: {
        background: '#F44336',
        text: '#fff'
    }
}

const Warning: FunctionalComponent<WarningProps> = ({
    message,
    severity = Severity.Gentle
}) => {

    const {
        background,
        text
    } = SEVERITY_COLORS[severity];

    return (
        <div
            style={{
                backgroundColor: background,
                padding: 8,
                borderRadius: 4,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 12
            }}
        >
            <div style={{
                width: 20,
                height: 20,
                borderWidth: 2,
                borderRadius: '50%',
                borderStyle: 'solid',
                borderColor: text,
                overflow: 'hidden'
            }}>
                <p
                    style={{ 
                        width: 20,
                        lineHeight: '20px',
                        textAlign: 'center',
                        margin: 0,
                        fontWeight: 'bold',
                        color: text 
                    }}
                >
                    !
                </p>
            </div>
            <p
                style={{ 
                    margin: 0,
                    color: text 
                }}
            >
                { message }
            </p>
        </div>
    )

}

export default Warning;