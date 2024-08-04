import { Header } from '@renderer/components/ui/header/Header';
import { NavItem, SidebarNav } from '@renderer/components/ui/sidebar-nav/SidebarNav';
import { Outlet } from 'react-router-dom';

const navItems: NavItem[] = [
  {
    title: '🏠Home',
    href: '/',
    items: []
  },
  {
    title: '🚀Samples',
    items: [
      {
        title: 'Config',
        href: '/config'
      },
      {
        title: 'Todos',
        href: '/todos'
      }
    ]
  },
  {
    title: '🐞Debug',
    href: '/debug',
    items: []
  }
];

/**
 * トップレベルのレイアウト。
 * generoutedでは、レイアウトをトップレベルとそれ以外で分けて定義している。
 * - トップレベル: _app.tsx
 * - トップレベル以外: _layout.tsx
 * @returns
 */
const RootLayout = () => {
  return (
    <div className="flex h-screen flex-col">
      <div className="border-2 p-4">
        <Header href="/" />
      </div>
      {/* NOTE: flex-grow により、フレックスコンテナの余白を自動的に広げる */}
      <div className="flex flex-grow">
        <div className="w-64 border-r-2 px-8 py-4">
          <SidebarNav navItems={navItems} />
        </div>
        <div className="h-full flex-grow">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
