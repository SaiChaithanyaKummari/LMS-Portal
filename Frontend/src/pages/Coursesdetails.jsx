import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Coursecard from "../components/Coursecard";
import { getCourses, getUsers, updateUserEnrolledCourses } from "../services/Api";

export default function Coursesdetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCourses().then((data) => {
      setAllCourses(data);
      const found = data.find((c) => String(c.id) === String(id));
      setCourse(found || null);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="container mt-4">
        <h2 style={{ color: "white" }}>Loading course...</h2>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mt-4">
        <h2 style={{ color: "white" }}>Course not found.</h2>
      </div>
    );
  }

  const otherCourses = allCourses.filter(
    (c) => String(c.id) !== String(id)
  );

  const handleEnroll = async () => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      navigate("/login");
      return;
    }
    const currentUser = JSON.parse(stored);
    const users = await getUsers();
    const dbUser = users.find((u) => u.email === currentUser.email);
    if (!dbUser) return;

    const enrolled = dbUser.enrolledCourses || [];
    if (!enrolled.includes(course.id)) {
      const updated = [...enrolled, course.id];
      await updateUserEnrolledCourses(dbUser.id, updated);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...dbUser, enrolledCourses: updated })
      );
    }
    navigate("/mycourses");
  };

  return (
    <div className="py-4"style={{minHeight: "100vh",background: "radial-gradient(circle at top left, #3b82f6 0, transparent 55%), radial-gradient(circle at bottom right, #22c55e 0, transparent 55%), #0f172a"}}>
      <div className="container">
        <div className="card border-0 shadow-lg mb-4"style={{ borderRadius: 20, overflow: "hidden" }}>
          <div className="row g-0">
            <div className="col-md-6">
              <img src={course.thumbnail}alt={course.title}style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
            </div>
            <div className="col-md-6">
              <div className="card-body h-100 d-flex flex-column">
                <h3 className="card-title mb-2">{course.title}</h3>
                <p className="card-text mb-2"><strong>Description:</strong> {course.description}</p>
                <p className="card-text mb-1"><strong>Instructor:</strong> {course.instructor}</p>
                <p className="card-text mb-1"><strong>Duration:</strong> {course.duration}</p>
                {course.level && <p className="card-text mb-1"><strong>Level:</strong> {course.level}</p>}
                {course.lessons && <p className="card-text mb-2"><strong>Lessons:</strong> {course.lessons.join(", ")}</p>}
                <div className="mt-auto d-flex gap-3">
                  <button className="btn btn-success" onClick={handleEnroll}>
                    Enroll now
                  </button>
                  <button className="btn btn-outline-success" onClick={() => navigate(`/player/${course.id}/0`)}>Play video</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h4 className="text-white mb-4">Other available courses</h4>
        <div className="row g-4">
          {otherCourses.map((c) => (
            <div className="col-md-3" key={c.id}>
              <Coursecard course={c} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
