import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCourses, getUsers } from "../services/Api";

function Mycourses() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setEnrolledCourses([]);
      setLoading(false);
      return;
    }
    getUsers().then((users) => {
      const dbUser = users.find((u) => u.email === user.email);
      if (!dbUser || !dbUser.enrolledCourses) {
        setEnrolledCourses([]);
        setLoading(false);
        return;
      }
      getCourses().then((data) => {
        const filtered = data.filter((course) =>
          dbUser.enrolledCourses.includes(course.id)
        );
        setEnrolledCourses(filtered);
        setLoading(false);
      });
    });
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <h3 style={{ color: "white" }}>Loading your courses...</h3>
      </div>
    );
  }

  return (
    <div className="py-5" style={{minHeight: "100vh",background: "#C9D6DF"}}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold text-black mb-1">My Courses</h2>
              <p className="text-black mb-0">
                View and continue the courses you&apos;re enrolled in.
              </p>
          </div>
        </div>

        {enrolledCourses.length === 0 ? (
          <div
            className="d-flex flex-column align-items-center justify-content-center text-center"
            style={{padding: "60px 20px",borderRadius: "20px",background:"#C9D6DF"}}>
            <h4 className="text-black mb-3">No courses enrolled yet</h4>
            <button className="btn btn-success px-4" onClick={() => navigate("/")}>Browse Courses</button>
          </div>
        ) : (
          <div className="row g-4">
            {enrolledCourses.map((course) => (
              <div className="col-md-6 col-lg-4" key={course.id}>
                <div className="card h-100 shadow-sm border-0" style={{borderRadius: "15px",overflow: "hidden",background:"linear-gradient(145deg, #0b1120, #020617, #111827)",color: "white",}}>
                  <div style={{ height: 180, overflow: "hidden" }}>
                    <img src={course.thumbnail} alt={course.title} style={{width: "100%",height: "100%",objectFit: "cover",}}/>
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title mb-2">{course.title.toUpperCase()}</h5>
                    <p className="card-text text-white mb-2" style={{ fontSize: 14 }}>
                      {course.description?.slice(0, 90)}
                      {course.description && course.description.length > 90 && "..."}
                    </p>
                    <div className="d-flex justify-content-between align-items-center mb-3" style={{ fontSize: 13 }}>
                      <span className="text-black">{course.instructor || "Instructor"}</span>
                      <span className="badge bg-primary">{course.duration || "Self-paced"}</span>
                    </div>
                    <div className="mt-auto d-flex gap-2">
                      <button className="btn btn-sm btn-success flex-grow-1" onClick={() => navigate(`/player/${course.id}/0`)}>Continue</button>
                      <button className="btn btn-sm btn-outline-light" onClick={() => navigate(`/coursesdetails/${course.id}`)}>Details</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Mycourses;