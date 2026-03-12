
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
    <div className="card h-100 shadow-sm border-0"
      style={{
        borderRadius: 16,
        overflow: "hidden",
        background:
          "linear-gradient(145deg, rgba(15,23,42,0.98), rgba(30,64,175,0.9))",
        color: "white",
      }}
    >
      <div style={{ height: 180, overflow: "hidden" }}>
        <img
          src={course.thumbnail}
          className="card-img-top"
          alt={course.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title mb-2">{course.title}</h5>
        <p className="card-text mb-1" style={{ fontSize: 14 }}>
          {course.instructor}
        </p>
        <p className="card-text text-light mb-3" style={{ fontSize: 13 }}>
          {course.duration}
        </p>
        <button
          className="btn btn-success mt-auto"
          onClick={handleViewCourse}
        >
          Start learning
        </button>
      </div>
    </div>
  );
}

export default Coursecard;