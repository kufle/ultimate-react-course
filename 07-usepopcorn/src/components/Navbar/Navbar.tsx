import Logo from "./Logo";
function Navbar({children}: any) {
    
    return (
        <nav className="nav-bar">
            <Logo />
            { children }
      </nav>
    )
}

export default Navbar
