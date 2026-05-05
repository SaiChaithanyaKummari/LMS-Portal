import "../App.css";
import { useNavigate } from "react-router-dom";

function Coursecard({ course }) {
  const navigate = useNavigate();

  const handleViewCourse = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      localStorage.setItem(
        "redirectAfterLogin",
        `/coursesdetails/${course.id}`
      );
      navigate("/Login");
      return;
    }
    navigate(`/coursesdetails/${course.id}`);
  };

  return (
    <div className="card h-100" style={{ borderRadius: 16, overflow: "hidden", background: "#e695098d", color: "#212529", border: "1px solid #0e0b1f" }}>
      <div style={{ height: 180, overflow: "hidden" }}>
        <img src={course.thumbnail} className="card-img-top" alt={course.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div className="card-body d-flex flex-column" >
        <h5 className="card-title mb-2">{course.title}</h5>
        <p className="card-text text-muted mb-1" style={{ fontSize: 14 }}>
          {course.instructor}
        </p>
        <p className="card-text text-secondary mb-3" style={{ fontSize: 13 }}>
          {course.duration}
        </p>
        <button
          className="btn mt-auto" style={{ backgroundColor: "var(--leap-primary)", color: "var(--leap-lightbg)" }}
          onClick={handleViewCourse}>
          Start learning
        </button>
      </div>
    </div>
  );
}

export default Coursecard;