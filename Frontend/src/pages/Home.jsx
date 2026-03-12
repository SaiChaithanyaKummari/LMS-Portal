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
        background:
          "radial-gradient(circle at top left, #3b82f6 0, transparent 55%), radial-gradient(circle at bottom right, #22c55e 0, transparent 55%), #0f172a",
      }}
    >
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="fw-bold text-black mb-1">Available Courses</h2>
            <p className="text-black mb-0">
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
          <h5 style={{ color: "white" }}>Loading courses...</h5>
        ) : filteredCourses.length === 0 ? (
          <h5 style={{ color: "white" }}>No courses found.</h5>
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