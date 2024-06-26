import "../src/App.css"
import { 
            Route, RouterProvider, createBrowserRouter,
            createRoutesFromElements
        } from 'react-router-dom'

// APP PAGES
import Base from './templates/Base';
import ErrorPage from './pages/ErrorPage';
import LandingPage from './pages/LandingPage';

// DASHBOARD PAGES
import DashboardBase from './templates/DashboardBase';
import Home from './pages/Dashboard-pages/Home';
import MyGroups from './pages/Dashboard-pages/MyGroups';
import DiscoverGroup from './pages/Dashboard-pages/DiscoverGroup';
import Schedule from './pages/Dashboard-pages/Schedule';
import Resources from './pages/Dashboard-pages/Resources';
import Profile from './pages/Dashboard-pages/Profile';
import Login from "./pages/Dashboard-pages/Login.jsx";
import Signup from "./pages/Dashboard-pages/Signup.jsx";
import { Provider } from "react-redux";
import store from "./store/store.jsx";
import RequireAuth from "./features/RequireAuth.jsx";


const router = createBrowserRouter(
    createRoutesFromElements([
        <Route path='/' element={ <Base/> } errorElement={ <ErrorPage/> }>
            <Route index element={<LandingPage/>} />
            <Route path='login' element={<Login/>} />
            <Route path='signup' element={<Signup/>} />
        </Route>,
        <Route path='/dashboard' element={<RequireAuth/>}>
            <Route element={<DashboardBase/>}>
                <Route
                    index
                    element={<Home/>}
                />
                <Route path='my-groups' element={<MyGroups/>}/>
                <Route path='discover-groups' element={<DiscoverGroup/>}/>
                <Route
                    path='schedule'
                    element={<Schedule/>}
                />
                <Route path='resources' element={<Resources/>}/>
                <Route
                    path='profile'
                    element={<Profile/>}
                />
            </Route>
        </Route>
    ])
)

const App = () => {

  return (
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
  )
}

export default App
