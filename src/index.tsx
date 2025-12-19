import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {Provider} from "react-redux";
import store from "@/app/configureStore.ts";
import AppRouter from "@/app/AppRouter.tsx";

createRoot(document.getElementById('app')!).render(
    <StrictMode>
        <Provider store={store}>
            <AppRouter/>
        </Provider>
    </StrictMode>,
)
