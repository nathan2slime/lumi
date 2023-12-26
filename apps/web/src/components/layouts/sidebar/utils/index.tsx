import { DashboardIcon, FileIcon, PersonIcon } from '@radix-ui/react-icons';

export const items = [
  {
    path: '/',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    path: '/bills',
    title: 'Bills',
    icon: <FileIcon />,
  },
  {
    path: '/clients',
    title: 'Clients',
    icon: <PersonIcon />,
  },
];
