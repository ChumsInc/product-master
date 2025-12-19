import {type FallbackProps} from "react-error-boundary";
import Alert from "react-bootstrap/Alert";

export default function ErrorFallbackComponent({error, resetErrorBoundary}: FallbackProps) {
    return (
        <Alert variant="danger" onClose={resetErrorBoundary} dismissible>
            <Alert.Heading>Oops, something went wrong.</Alert.Heading>
            <p>{error.message}</p>
            <code><pre>{error.stack}</pre></code>
        </Alert>
    )
}
