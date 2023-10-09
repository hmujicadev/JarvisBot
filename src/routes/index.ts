import {
  CogIcon,
  HomeIcon,
  LightningBoltIcon,
  ViewGridIcon,
  XIcon,
  ChartSquareBarIcon
} from '@heroicons/react/outline'
export type HeroIcon = (props: React.ComponentProps<'svg'>) => JSX.Element

type RouteItemT = {
  title: string
  href: string
  showInDasboard?: boolean
  icon?: HeroIcon
}

type RoutesT = {
  [key: string]: RouteItemT
}
export const ROUTES: RoutesT = {
  home: { title: 'Home', href: '/' },
  dashboard: { title: 'Home', href: '/dashboard', showInDasboard: true, icon: HomeIcon },
  trading: {
    title: 'Trading',
    href: '/dashboard/trading/',
    showInDasboard: true,
    icon: ChartSquareBarIcon
  },
  sniper: {
    title: 'Sniper',
    href: '/dashboard/sniper/',
    // showInDasboard: true,
    icon: LightningBoltIcon
  },
  presale: {
    title: 'Presale',
    href: '/dashboard/presale/',
    showInDasboard: true,
    icon: LightningBoltIcon
  },
  settings: { title: 'Settings', href: '/dashboard/settings/', showInDasboard: true, icon: CogIcon }
}

export const ROUTES_ARRAY = Object.values(ROUTES)

export const API_ROUTES = {
  tokens: {
    balance: { title: 'balance', href: '/api/tokens/balance' },
    trade: { title: 'trade', href: '/api/tokens/trade' },
    price: { title: 'price', href: '/api/tokens/price' }
  },
  providers: { title: 'trade', href: '/api/providers/' }
}
