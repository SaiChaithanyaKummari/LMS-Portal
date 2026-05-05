const Wordmark = ({ size = 20 }) => (
    <span style={{
        fontWeight: 800,
        fontSize: size,
        color: "#fff",
        letterSpacing: "-0.5px",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        lineHeight: 1,
    }}>
        Leap<span style={{ color: "#A89CFF" }}>IQ</span>
    </span>
);

export default Wordmark;