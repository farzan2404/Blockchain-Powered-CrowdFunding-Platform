import { createCampaign, dashboard, logout, transaction, profile, document} from '../assets';

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'campaign',
    imgUrl: createCampaign,
    link: '/create-campaign',
  },
  {
    name: 'transaction',
    imgUrl: transaction,
    link: '/transaction',
  },
  {
    name: 'document',
    imgUrl: document,
    link: '/document',
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  },
  {
    name: 'logout',
    imgUrl: logout,
    link: '/logout',
  },
];
