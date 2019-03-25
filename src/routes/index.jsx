import Home from 'views/Home';
import Login from 'views/Login';
import Signup from 'views/Signup';
import Profile from 'views/Profile';
import Settings from 'views/Settings';

export default [
    { path: "/settings", component: Settings },
    { path: "/signup", component: Signup },
    { path: "/Login", component: Login },
    { path: "/:username", component: Profile },
    { path: "/", component: Home }
]