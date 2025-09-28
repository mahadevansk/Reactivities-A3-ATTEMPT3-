import { createBrowserRouter, Navigate } from "react-router";
import App from "../layout/App";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import HomePage from "../../features/home/HomePage";
import ActivityDetailPage from "../../features/activities/details/ActivityDetailsPage";
import Counter from "../../features/counter/Counter";
import TestErrors from "../../features/errors/TestError";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";


export const router = createBrowserRouter([
    {
        path:'/',
        element: <App/>,
        children:[
            {path: '', element: <HomePage/>},
            {path: 'activities', element: <ActivityDashboard/>}, // To Remove Erro i removed the entire the
            //  prop drilling here and moved to the better approach. We can pass Routes as Propdrilling but it is not the recommend way. 
            
            {path: 'activities/:id', element: <ActivityDetailPage/>},
            {path: 'createActivity', element: <ActivityForm key={'AFKey'}/>},
            { path: 'manage/:id', element: <ActivityForm /> },
            { path: 'counter', element: <Counter /> },
            { path: 'errors',element:<TestErrors/> },
            { path: 'not-found', element: <NotFound /> },
            { path: 'server-error', element: <ServerError /> },
            { path: '*', element: <Navigate replace to = '/not-found' /> }
            
        ]
    }
])