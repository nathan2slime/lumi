import { DashboardIcon, FileIcon, PersonIcon } from '@radix-ui/react-icons';
import { PermissionEnum } from '@lumi/database/enums';

export const items = [
  {
    path: '/',
    title: 'Dashboard',
    icon: <DashboardIcon />,
    permissions: [PermissionEnum.ADMINISTRATOR],
  },
  {
    path: '/bills',
    title: 'Bills',
    icon: <FileIcon />,
  },
];
