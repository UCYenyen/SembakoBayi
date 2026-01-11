'use client';

import * as React from 'react';
import { useEffect, useState, useRef, useId } from 'react';
import Link from 'next/link';
import { SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/shadcn-ui/button';
import { Input } from '@/components/ui/shadcn-ui/input';
import { FaShoppingCart } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/shadcn-ui/avatar';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/shadcn-ui/navigation-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/shadcn-ui/popover';
import { cn } from '@/lib/utils';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

const Logo = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg width='1em' height='1em' viewBox='0 0 324 323' fill='currentColor' xmlns='http://www.w3.org/2000/svg' {...(props as any)}>
      <rect
        x='88.1023'
        y='144.792'
        width='151.802'
        height='36.5788'
        rx='18.2894'
        transform='rotate(-38.5799 88.1023 144.792)'
        fill='currentColor'
      />
      <rect
        x='85.3459'
        y='244.537'
        width='151.802'
        height='36.5788'
        rx='18.2894'
        transform='rotate(-38.5799 85.3459 244.537)'
        fill='currentColor'
      />
    </svg>
  );
};

const HamburgerIcon = ({ className, ...props }: React.SVGAttributes<SVGElement>) => (
  <svg
    className={cn('pointer-events-none', className)}
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...(props as any)}
  >
    <path
      d="M4 12L20 12"
      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
    />
    <path
      d="M4 12H20"
      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
    />
    <path
      d="M4 12H20"
      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
    />
  </svg>
);

export interface Navbar04NavItem {
  href?: string;
  label: string;
}

export interface Navbar04Props extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  logoHref?: string;
  navigationLinks?: Navbar04NavItem[];
  signInText?: string;
  signInHref?: string;
  cartText?: string;
  cartHref?: string;
  cartCount?: number;
  searchPlaceholder?: string;
  onSignInClick?: () => void;
  onCartClick?: () => void;
  onSearchSubmit?: (query: string) => void;
}

const defaultNavigationLinks: Navbar04NavItem[] = [
  { href: '#', label: 'Belanja' },
  { href: '#', label: 'Voucher' },
];

export const Navbar04 = React.forwardRef<HTMLElement, Navbar04Props>(
  (
    {
      className,
      logo = <Logo />,
      logoHref = '/',
      navigationLinks = defaultNavigationLinks,
      signInText = 'Masuk',
      signInHref = '/login',
      cartText = 'Keranjang',
      cartHref = '/cart',
      cartCount = 2,
      searchPlaceholder = 'Telusuri...',
      onSignInClick,
      onCartClick,
      onSearchSubmit,
      ...props
    },
    ref
  ) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const containerRef = useRef<HTMLElement>(null);
    const searchId = useId();
    const [user, setUser] = useState<User | null>(null);
    const supabase = createClient(); // Inisialisasi client

    useEffect(() => {
      const checkWidth = () => {
        if (containerRef.current) {
          const width = containerRef.current.offsetWidth;
          setIsMobile(width < 768);
        }
      };

      checkWidth();

      const resizeObserver = new ResizeObserver(checkWidth);
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }

      return () => {
        resizeObserver.disconnect();
      };
    }, []);

    useEffect(() => {
      const getUser = async () => {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (user) {
          setUser(user);
        }
      };
      getUser();

      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUser(session?.user ?? null);
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    }, [supabase]);

    // --- 4. HANDLE LOGOUT ---
    const handleSignOut = async () => {
      await supabase.auth.signOut();
      setUser(null);
      // Opsional: Refresh halaman atau redirect ke home
      window.location.reload();
    };

    const combinedRef = React.useCallback((node: HTMLElement | null) => {
      containerRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    }, [ref]);

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const query = formData.get('search') as string;
      if (onSearchSubmit) {
        onSearchSubmit(query);
      }
    };

    return (
      <header
        ref={combinedRef}
        className={cn(
          'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6 [&_*]:no-underline',
          className
        )}
        {...(props as any)}
      >
        <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-2">
            {isMobile && (
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                    variant="ghost"
                    size="icon"
                  >
                    <HamburgerIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-64 p-4">
                  <div className="flex flex-col gap-2">
                    {navigationLinks.map((link, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        asChild
                        className="w-full justify-start text-left font-medium h-10 px-3"
                      >
                        <Link
                          href={link.href || '#'}
                          onClick={() => setIsPopoverOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </Button>
                    ))}

                    <div className="my-2 h-px bg-border" />
                    {!user ? (
                      <>
                        <Button
                          variant="ghost"
                          asChild
                          className="w-full justify-start text-left h-10 px-3"
                        >
                          <Link
                            href={signInHref || '#'}
                            onClick={() => {
                              setIsPopoverOpen(false);
                              if (onSignInClick) onSignInClick();
                            }}
                          >
                            {signInText}
                          </Link>
                        </Button>
                      </>
                    ) : (
                      <>

                        <Button
                          variant="ghost"
                          asChild
                          className="w-full justify-start text-left h-10 px-3"
                        >
                          <Link
                            href={cartHref || '#'}
                            onClick={() => {
                              setIsPopoverOpen(false);
                              if (onCartClick) onCartClick();
                            }}
                          >
                            <div className="flex w-full items-center justify-between">
                              <span>{cartText}</span>
                              {cartCount !== undefined && cartCount > 0 && (
                                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary/10 px-1 text-xs font-medium text-primary">
                                  {cartCount}
                                </span>
                              )}
                            </div>
                          </Link>
                        </Button>
                      </>)}
                  </div>
                </PopoverContent>
              </Popover>
            )}

            <div className="flex flex-1 items-center gap-6 max-md:justify-between">
              <Link
                href={logoHref}
                className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors cursor-pointer"
              >
                <div className="text-2xl">
                  {logo}
                </div>
                <span className="hidden font-bold text-xl sm:inline-block">SBP</span>
              </Link>

              {!isMobile && (
                <NavigationMenu className="flex">
                  <NavigationMenuList className="gap-1">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink
                          asChild
                          className="text-muted-foreground hover:text-primary py-1.5 font-medium transition-colors cursor-pointer group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                        >
                          <Link href={link.href || '#'}>
                            {link.label}
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              )}

              <form onSubmit={handleSearchSubmit} className="relative">
                <Input
                  id={searchId}
                  name="search"
                  className="peer h-8 ps-8 pe-2"
                  placeholder={searchPlaceholder}
                  type="search"
                />
                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50">
                  <SearchIcon size={16} />
                </div>
              </form>
            </div>
          </div>

          {!isMobile && (
            <div className="flex items-center gap-3">
              {!user ? (
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-sm font-medium hover:bg-accent hover:text-accent-foreground cursor-pointer"
              >
                <Link
                  href={signInHref || '#'}
                  onClick={(e) => {
                    if (onSignInClick) onSignInClick();
                  }}
                >
                  {signInText}
                </Link>
              </Button>
              ) : (
                <>
                  <Button
                    variant={"ghost"}
                    size="sm"
                    asChild
                    className="text-sm font-medium px-4 h-9 rounded-md cursor-pointer"
                  >
                    <Link
                      href={cartHref || '#'}
                      onClick={(e) => {
                        if (onCartClick) onCartClick();
                      }}
                    >
                      <span className="flex text-primary items-baseline gap-2">
                        <FaShoppingCart />
                        <span className="text-primary text-xs">
                          {cartCount}
                        </span>
                      </span>
                    </Link>
                  </Button>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </>
              )}
            </div>
          )}
        </div>
      </header>
    );
  }
);

Navbar04.displayName = 'Navbar04';

export { Logo, HamburgerIcon };