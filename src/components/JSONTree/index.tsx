import styled from "styled-components";
import {Base16Theme, solarized} from "base16";


const NodeKey = styled.span`
    font-weight: 300;
    color: ${(props) => (props.theme || solarized).base05};
`;
const NumberNode = styled.li`
    color: ${(props) => (props.theme || solarized).base09};
`;
const StringNode = styled.li`
    color: ${(props) => (props.theme || solarized).base0B};
`;
const ObjectNode = styled.ul`
    list-style: none;
`

const nodeType = (value:any) => {
    const type = typeof value;
    switch (type) {
    case 'object':
        if (value === null) {
            return 'null';
        }
        if (Array.isArray(value)) {
            return 'array';
        }
        return type;
    default:
        return type;
    }
}

const JSONNodeValue = (value:any) => {
    try {
        return JSON.stringify(value, undefined, 2);
    } catch(err:unknown) {
        if (err instanceof Error) {
            return err.message;
        }
        return null;
    }
}

interface JSONNodeProps {
    depth: number,
    nodeKey:string,
    value: any,
    theme: Base16Theme,
}

const JSONNode = ({depth, nodeKey, value, theme}:JSONNodeProps) => {
    const type = nodeType(value);
    switch (type) {
    case 'number':
    case 'boolean':
    case 'bigint':
        return (
            <NumberNode theme={theme}>
                <NodeKey>{nodeKey}:</NodeKey>
                <span className="ms-1">{JSON.stringify(value)}</span>
            </NumberNode>
        )
    case 'string':
        return (
            <StringNode theme={theme}>
                <NodeKey>{nodeKey}:</NodeKey>
                <span className="ms-1">{JSON.stringify(value)}</span>
            </StringNode>
        )
    case 'null':

    case 'array':

    }

    return (
        <li>
            <strong>{nodeKey}<small className="mx-1">({type})</small>:</strong>
            {JSONNodeValue(value)}
        </li>
    )
}

export interface JSONTreeProps {
    data: any,
    theme?: Base16Theme
}
const JSONTree = ({data, theme = solarized}: JSONTreeProps) => {
    const style:React.CSSProperties = {
        fontSize: '0.7rem',
        lineHeight: '0.85rem',
        maxHeight: '90vh',
        overflow: 'auto',
        fontFamily: 'Roboto Mono, monospace',
        whiteSpace: "pre-wrap",
        backgroundColor: "transparent",
        color: theme.base05,
    }
    return (
        <div style={style}>
            <ObjectNode>
                {Object.keys(data).map(key => <JSONNode theme={theme} key={key} nodeKey={key} value={data[key]} depth={1} />)}
            </ObjectNode>
            {JSON.stringify(data, undefined, 2)}

        </div>
    )
}
export default JSONTree;
