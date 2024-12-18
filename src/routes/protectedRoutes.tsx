import Dashboard from '../components/Dashboard';
import JournalView from '../components/Journal/JournalView';
import TasksView from '../components/Tasks/TasksView';
import MentorsView from '../components/Mentors/MentorsView';
import SummaryView from '../components/Summary/SummaryView';
import ProfileSettings from '../components/Auth/ProfileSettings';

export const protectedRoutes = [
  {
    path: '/dashboard',
    element: Dashboard,
  },
  {
    path: '/journal',
    element: JournalView,
  },
  {
    path: '/tasks',
    element: TasksView,
  },
  {
    path: '/mentors',
    element: MentorsView,
  },
  {
    path: '/summary',
    element: SummaryView,
  },
  {
    path: '/profile',
    element: ProfileSettings,
  },
];