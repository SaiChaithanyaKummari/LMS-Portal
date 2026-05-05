import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import LeapIQLogo from "../assets/logo/LeapIQlogo";
import { IoHome } from "react-icons/io5";
import { RiAdminFill } from "react-icons/ri";
import { FaAddressBook } from "react-icons/fa6";




// ── Hamburger ─────────────────────────────────────────────────────
const HamburgerIcon = ({ open }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 5, width: 22 }}>
    {[0, 1, 2].map(i => (
      <span key={i} style={{
        display: "block", height: 2, background: "#fff", borderRadius: 2, transition: "all 0.25s",
        transform: i === 0 ? (open ? "translateY(7px) rotate(45deg)" : "none")
          : i === 2 ? (open ? "translateY(-7px) rotate(-45deg)" : "none") : "none",
        opacity: i === 1 && open ? 0 : 1,
      }} />
    ))}
  </div>
);

// ── Nav Links Config ──────────────────────────────────────────────
const getNavLinks = (user) => {
  if (!user) return [
    { to: "/login", label: "Login" },
    { to: "/signup", label: "Sign Up" },
  ];
  const links = [{ to: "/", label: "Home", icon: <IoHome /> }];
  if (user.role === "admin") links.push({ to: "/admin", label: "Admin Portal", icon: <RiAdminFill /> });
  if (user.role !== "admin") links.push({ to: "/mycourses", label: "My Courses", icon: <FaAddressBook /> });
  return links;
};

const getSidebarLinks = (user) => {
  if (!user) return [
    { to: "/login", label: "Login" },
    { to: "/signup", label: "Sign Up" },
  ];
  const links = [{ to: "/", label: "Home", icon: <IoHome /> }];
  if (user.role === "admin") links.push({ to: "/admin", label: "Admin Portal", icon: <RiAdminFill /> });
  if (user.role !== "admin") links.push({ to: "/mycourses", label: "My Courses", icon: <FaAddressBook /> });
  return links;
};

// ── Navbar ────────────────────────────────────────────────────────
function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(() => {
    const s = localStorage.getItem("user");
    return s ? JSON.parse(s) : null;
  });

  useEffect(() => {
    const s = localStorage.getItem("user");
    setUser(s ? JSON.parse(s) : null);
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const navLinks = getNavLinks(user);
  const sidebarLinks = getSidebarLinks(user);

  const linkStyle = ({ isActive }) => ({
    fontSize: 14, fontWeight: 500, textDecoration: "none",
    padding: "6px 12px", borderRadius: 7, transition: "all 0.15s",
    color: isActive ? "#fff" : "#9B93E8",
    background: isActive ? "#6C63FF" : "transparent",
  });

  const sidebarLinkStyle = ({ isActive }) => ({
    display: "flex", alignItems: "center", gap: 12,
    padding: "13px 24px", fontSize: 15, textDecoration: "none", transition: "all 0.15s",
    fontWeight: isActive ? 600 : 400,
    color: isActive ? "#fff" : "#9B93E8",
    background: isActive ? "#6C63FF" : "transparent",
    borderLeft: isActive ? "3px solid #FFD700" : "3px solid transparent",
  });

  const logoutBtnStyle = {
    background: "transparent", color: "#9B93E8",
    border: "1px solid rgba(108,99,255,0.4)",
    padding: "7px 16px", borderRadius: 7,
    fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.15s",
  };

  return (
    <>
      {/* ── Desktop Navbar ── */}
      <nav className="d-none d-lg-flex align-items-center justify-content-between"
        style={{ background: "#0e0b1f", height: 64, padding: "0 32px", position: "sticky", top: 0, zIndex: 100, borderBottom: "1px solid rgba(108,99,255,0.2)" }}>

        <div onClick={() => navigate("/")}><LeapIQLogo size={36} /></div>

        <ul style={{ display: "flex", alignItems: "center", gap: 4, listStyle: "none", margin: 0, padding: 0 }}>
          {navLinks.map(({ to, label }) => (
            <li key={to}><NavLink to={to} style={linkStyle}>{label}</NavLink></li>
          ))}
        </ul>

        {user && (
          <button style={logoutBtnStyle} onClick={handleLogout}
            onMouseEnter={e => { e.target.style.background = "#6C63FF"; e.target.style.color = "#fff"; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#9B93E8"; }}>
            Logout
          </button>
        )}
      </nav>

      {/* ── Mobile Header ── */}
      <div className="d-flex d-lg-none align-items-center justify-content-between"
        style={{ background: "#0e0b1f", height: 58, padding: "0 16px", position: "sticky", top: 0, zIndex: 100, borderBottom: "1px solid rgba(108,99,255,0.2)" }}>
        <div onClick={() => navigate("/")}><LeapIQLogo size={30} /></div>
        <button onClick={() => setIsOpen(o => !o)} style={{ background: "none", border: "none", cursor: "pointer", padding: 6 }}>
          <HamburgerIcon open={isOpen} />
        </button>
      </div>

      {/* ── Overlay ── */}
      <div onClick={() => setIsOpen(false)} style={{
        position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.55)",
        opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? "all" : "none", transition: "opacity 0.25s",
      }} />

      {/* ── Sidebar ── */}
      <div style={{
        position: "fixed", top: 0, left: isOpen ? 0 : "-272px", width: 260, height: "100%",
        background: "#0e0b1f", zIndex: 300, display: "flex", flexDirection: "column",
        borderRight: "1px solid rgba(108,99,255,0.2)", transition: "left 0.3s ease",
      }}>

        {/* Sidebar Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 20px", height: 58, borderBottom: "1px solid rgba(108,99,255,0.15)" }}>
          <LeapIQLogo size={28} />
          <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", color: "#9B93E8", fontSize: 20, cursor: "pointer" }}>✕</button>
        </div>

        {/* Sidebar Links */}
        <ul style={{ listStyle: "none", margin: 0, padding: "10px 0", flex: 1 }}>
          {sidebarLinks.map(({ to, label, icon }) => (
            <li key={to}>
              <NavLink to={to} style={sidebarLinkStyle}>
                <span style={{ fontSize: 16, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{icon}</span> {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Sidebar Footer */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(108,99,255,0.15)" }}>
          {user && (
            <button onClick={handleLogout}
              style={{ width: "100%", background: "rgba(108,99,255,0.15)", color: "#A89CFF", border: "1px solid rgba(108,99,255,0.3)", padding: 11, borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}
              onMouseEnter={e => { e.target.style.background = "#6C63FF"; e.target.style.color = "#fff"; }}
              onMouseLeave={e => { e.target.style.background = "rgba(108,99,255,0.15)"; e.target.style.color = "#A89CFF"; }}>
              Logout
            </button>
          )}
          <p style={{ textAlign: "center", fontSize: 11, color: "rgba(155,147,232,0.3)", marginTop: 12, marginBottom: 0 }}>
            Leap<span style={{ color: "#6C63FF" }}>IQ</span> · Learn · Grow · Leap
          </p>
        </div>
      </div>
    </>
  );
}

export default Navbar;