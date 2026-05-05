import Logo from "./Logo";
import Wordmark from "./Wordmark";

const LeapIQLogo = ({ size = 36 }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
        <Logo size={size} />
        <Wordmark size={size * 0.55} />
    </div>
);

export default LeapIQLogo;