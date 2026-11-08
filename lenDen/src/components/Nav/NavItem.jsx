import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavItem({ to, icon: Icon, label, end = false, compact = false }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        [
          'transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-lenden-border-focus',
          compact
            ? 'flex flex-1 flex-col items-center gap-1 py-2 text-[11px] font-medium'
            : 'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium',
          isActive
            ? compact
              ? 'text-lenden-primary-active'
              : 'bg-lenden-primary/10 text-lenden-primary-active font-semibold'
            : 'text-lenden-text-dark hover:text-lenden-text-dark ' +
              (compact ? '' : 'hover:bg-lenden-bg-page hover:text-lenden-text-muted'),
        ].join(' ')
      }
    >
      <Icon size={compact ? 20 : 18} strokeWidth={1.8} />
      <span>{label}</span>
    </NavLink>
  )
}