import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  Grid2x2,
  Banknote,
  Users,
  Bell,
  User,
  CirclePlus,
} from 'lucide-react'
import NavItem from './NavItem'

const links = [
  { to: '/', label: 'Dashboard', icon: Grid2x2, end: true },
  { to: '/transactions', label: 'Transactions', icon: Banknote },
  { to: '/people', label: 'People', icon: Users },
  { to: '/reminders', label: 'Reminder', icon: Bell },
  { to: '/profile', label: 'Profile', icon: User },
]
export default function Nav(){
  const user = useSelector((state) => state.auth.user)
  const name =
    user?.user_metadata?.name ||
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0] ||
    'there'

  return (
    <>
      {/* Top header */}
      <header className="fixed inset-x-0 top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-lenden-border-light bg-lenden-bg-card/90 px-4 backdrop-blur md:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lenden-primary text-sm font-bold text-white">
            LD
          </span>
          <span className="hidden text-lg font-bold tracking-tight text-lenden-text-dark sm:block">
            Len Den
            <span className="font-medium text-lenden-text-muted"> , Track your money</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/people"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-lenden-text-dark transition-colors hover:bg-lenden-bg-page hover:text-lenden-text-muted"
          >
            <Users size={18} strokeWidth={1.5} />
            <span className="hidden sm:inline">Search People</span>
          </Link>

          <Link
            to="/add"
            className="flex items-center gap-2 rounded-lg bg-lenden-primary px-3 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-lenden-primary-hover hover:shadow active:bg-lenden-primary-active focus:outline-none focus:ring-2 focus:ring-lenden-primary focus:ring-offset-2"
          >
            <CirclePlus size={18} strokeWidth={1.5} />
            <span className="hidden sm:inline">Add Transaction</span>
          </Link>
        </div>
      </header>

      {/* Desktop sidebar */}
      <aside className="fixed bottom-0 left-0 top-16 z-20 hidden w-60 flex-col gap-6 border-r border-lenden-border-light bg-lenden-bg-card p-4 md:flex">
        <p className="px-3 pt-2 text-sm text-lenden-text-muted">
          Welcome,
          <span className="block text-base font-semibold text-lenden-text-dark">{name}</span>
        </p>

        <nav className="flex flex-col gap-1">
          {links.map((link) => (
            <NavItem key={link.to} {...link} />
          ))}
        </nav>
      </aside>

      {/* Mobile bottom bar */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-lenden-border-light bg-lenden-bg-card md:hidden">
        {links.map((link) => (
          <NavItem key={link.to} {...link} compact />
        ))}
      </nav>
    </>
  )
}