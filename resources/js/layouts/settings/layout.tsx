import Heading from '@/components/heading';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

const sidebarNavItems: NavItem[] = [
  {
    title: 'Profile',
    href: '/settings/profile',
    icon: null,
  },
  {
    title: 'Password',
    href: '/settings/password',
    icon: null,
  },
  {
    title: 'Appearance',
    href: '/settings/appearance',
    icon: null,
  },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
  if (typeof window === 'undefined') {
    return null;
  }

  const currentPath = window.location.pathname;

  return (
    <div className="min-h-screen bg-background px-4 py-8 lg:px-12">
        <Navbar />
        <br></br>
      <div className="mx-auto w-full max-w-7xl space-y-8 lg:flex lg:space-y-0 lg:space-x-12">
        <aside className="lg:w-60 w-full">
          <h2 className="text-lg font-semibold text-muted-foreground mb-4">
            Settings
          </h2>
          <nav className="flex flex-col space-y-1">
            {sidebarNavItems.map((item, index) => (
              <Button
                key={`${item.href}-${index}`}
                size="sm"
                variant="ghost"
                asChild
                className={cn(
                  'justify-start w-full text-left text-sm font-medium transition-colors',
                  currentPath === item.href
                    ? 'bg-muted text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Link href={item.href} prefetch>
                  {item.title}
                </Link>
              </Button>
            ))}
          </nav>
        </aside>

        <Separator className="my-6 lg:hidden" />

        {/* Main Content */}
        <main className="flex-1">
          <div className="space-y-8">
            <Heading title="Account Settings" description="Manage your personal settings and preferences." />
            <section className="space-y-12">{children}</section>
          </div>
        </main>
      </div>
    </div>
  );
}
