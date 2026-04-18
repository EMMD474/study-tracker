"use client"

import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOutAction } from "@/components/auth/actions"
import LogoutIcon from "@mui/icons-material/Logout"
import DashboardIcon from "@mui/icons-material/Dashboard"
import MenuBookIcon from "@mui/icons-material/MenuBook"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';

const navLinks = [
  { label: "Dashboard", href: "/dashboard", icon: <DashboardIcon fontSize="small" /> },
  { label: "Courses", href: "/courses", icon: <MenuBookIcon fontSize="small" /> },
  { label: "Timetable", href: "/timetable", icon: <CalendarMonthIcon fontSize="small" /> },
  { label: "Timer", href: "/timer", icon: <AccessAlarmsIcon fontSize="small" /> },
]

const hiddenOn = ["/", "/auth/login", "/auth/register"]

export default function TopNav() {
  const pathname = usePathname()

  if (hiddenOn.some((path) => pathname === path || pathname.startsWith("/auth/"))) {
    return null
  }

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "#0f0f0f",
        borderBottom: "1px solid rgba(200,169,110,0.12)",
        backdropFilter: "blur(12px)",
      }}
    >
      <Toolbar sx={{ gap: 1, minHeight: { xs: 56 } }}>
        {/* Brand */}
        <Link href="/dashboard" style={{ textDecoration: "none", marginRight: "auto" }}>
          <span
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#c8a96e",
            }}
          >
            Median Stratum
          </span>
        </Link>

        {/* Nav links */}
        {navLinks.map(({ label, href, icon }) => (
          <Button
            key={href}
            component={Link}
            href={href}
            startIcon={icon}
            sx={{
              color: pathname === href ? "#c8a96e" : "#7a7060",
              fontSize: "0.75rem",
              fontWeight: pathname === href ? 600 : 400,
              letterSpacing: "0.05em",
              textTransform: "none",
              borderRadius: "8px",
              px: 1.5,
              borderBottom: pathname === href ? "1px solid rgba(200,169,110,0.5)" : "1px solid transparent",
              "&:hover": {
                color: "#e8e6e0",
                bgcolor: "rgba(200,169,110,0.06)",
              },
            }}
          >
            {label}
          </Button>
        ))}

        {/* Sign out */}
        <form action={signOutAction}>
          <Tooltip title="Sign out">
            <IconButton
              type="submit"
              size="small"
              sx={{
                color: "#5e5a52",
                ml: 1,
                "&:hover": { color: "#c8a96e", bgcolor: "rgba(200,169,110,0.06)" },
              }}
            >
              <LogoutIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </form>
      </Toolbar>
    </AppBar>
  )
}
