import React, { useEffect, useState } from "react";
import Coursecard from "../components/Coursecard";
import { getCourses } from "../services/Api";

function Home() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCourses()
      .then((data) => setCourses(data))
      .finally(() => setLoading(false));
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="py-4"
      style={{
        minHeight: "100vh",
        background: "#ffffff",
      }}
    >
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="fw-bold text-dark mb-1">Available Courses</h2>
            <p className="text-muted mb-0">
              Browse and start learning from our course catalog.
            </p>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search courses"
          className="form-control mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? (
          <h5 className="text-muted">Loading courses...</h5>
        ) : filteredCourses.length === 0 ? (
          <h5 className="text-muted">No courses found.</h5>
        ) : (
          <div className="row g-4">
            {filteredCourses.map((course) => (
              <div className="col-md-3" key={course.id}>
                <Coursecard course={course} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;