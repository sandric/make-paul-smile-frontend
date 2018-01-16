import App from './components/App/App';
import Game from './components/Game/Game';
import Subjects from './components/Subjects/Subjects';
import Profile from './components/Profile/Profile';
import Mission from './components/Mission/Mission';

export default [
  { component: App,
    routes: [
      { path: '/',
        exact: true,
        component: Mission
      },
      { path: '/subjects',
        component: Subjects,
        exact: true
      },
      { path: '/subjects/:id',
        component: Game
      },
      { path: '/profile',
        component: Profile
      }
    ]
  }
]
