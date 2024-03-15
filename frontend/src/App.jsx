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
import PldGroup from './pages/Dashboard-pages/PldGroup';
import DiscoverGroup from './pages/Dashboard-pages/DiscoverGroup';
import Schedule from './pages/Dashboard-pages/Schedule';
import Resources from './pages/Dashboard-pages/Resources';
import Profile from './pages/Dashboard-pages/Profile';


const router = createBrowserRouter(
    createRoutesFromElements([
        <Route path='/' element={ <Base/> } errorElement={ <ErrorPage/> }>
            <Route index element={<LandingPage/>}/>
        </Route>,
        <Route path='/dashboard' element={<DashboardBase/>}>
            <Route index element={<Home/>}/>
            <Route path='pld' element={<PldGroup/>}/>
            <Route path='groups' element={<DiscoverGroup/>}/>
            <Route path='schedule' element={<Schedule/>}/>
            <Route path='resources' element={<Resources/>}/>
            <Route path='profile' element={<Profile/>}/>
        </Route>
    ])
)

const App = () => {

  return (
        <RouterProvider router={router}/>
  )
}

export default App
