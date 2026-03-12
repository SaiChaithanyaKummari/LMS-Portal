import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCourses, addCourse, updateCourse, deleteCourse } from "../services/Api";

const emptyForm = {
  title: "", instructor: "", duration: "", level: "Beginner",
  thumbnail: "", description: "", lessons: "", videos: []
};

export default function AdminPortal() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }
    loadCourses();
  }, [navigate]);

  const loadCourses = () => {
    setLoading(true);
    getCourses()
      .then((data) => setCourses(Array.isArray(data) ? data : []))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
    setMsg("");
  };

  const openEdit = (course) => {
    setEditing(course.id);
    setForm({
      title: course.title || "",
      instructor: course.instructor || "",
      duration: course.duration || "",
      level: course.level || "Beginner",
      thumbnail: course.thumbnail || "",
      description: course.description || "",
      lessons: (course.lessons || []).join(", "),
      videos: course.videos || []
    });
    setShowForm(true);
    setMsg("");
  };

  const handleVideoChange = (index, field, value) => {
    const newVideos = [...form.videos];
    newVideos[index][field] = value;
    setForm({ ...form, videos: newVideos });
  };

  const addVideo = () => {
    const newId = `v_${Date.now()}`;
    setForm({ ...form, videos: [...form.videos, { id: newId, title: "", duration: "", url: "", thumbnail: "" }] });
  };

  const removeVideo = (index) => {
    const newVideos = form.videos.filter((_, i) => i !== index);
    setForm({ ...form, videos: newVideos });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: form.title,
      instructor: form.instructor,
      duration: form.duration,
      level: form.level,
      thumbnail: form.thumbnail,
      description: form.description,
      lessons: form.lessons ? form.lessons.split(",").map((s) => s.trim()).filter(Boolean) : [],
      videos: form.videos
    };
    try {
      if (editing) {
        await updateCourse(editing, payload);
        setMsg("Course updated successfully!");
      } else {
        await addCourse(payload);
        setMsg("Course added successfully!");
      }
      setShowForm(false);
      setForm(emptyForm);
      setEditing(null);
      loadCourses();
    } catch {
      setMsg("Something went wrong. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await deleteCourse(id);
      setMsg("Course deleted.");
      loadCourses();
    } catch {
      setMsg("Failed to delete course.");
    }
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff" }} className="py-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold text-dark mb-1">Admin Portal</h2>
            <p className="text-muted mb-0">Manage all courses in the platform.</p>
          </div>
          <button className="btn btn-dark" onClick={openAdd}>
            + Add Course
          </button>
        </div>

        {msg && (
          <div className="alert alert-info py-2" role="alert">
            {msg}
            <button type="button" className="btn-close float-end" onClick={() => setMsg("")}></button>
          </div>
        )}

        {showForm && (
          <div className="card border shadow-sm mb-4" style={{ borderRadius: 12 }}>
            <div className="card-body">
              <h5 className="mb-3">{editing ? "Edit Course" : "Add New Course"}</h5>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Title *</label>
                    <input name="title" className="form-control" value={form.title} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Instructor</label>
                    <input name="instructor" className="form-control" value={form.instructor} onChange={handleChange} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Duration</label>
                    <input name="duration" className="form-control" placeholder="e.g. 6 Weeks" value={form.duration} onChange={handleChange} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Level</label>
                    <select name="level" className="form-select" value={form.level} onChange={handleChange}>
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Thumbnail URL</label>
                    <input name="thumbnail" className="form-control" value={form.thumbnail} onChange={handleChange} />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">Description</label>
                    <textarea name="description" className="form-control" rows="2" value={form.description} onChange={handleChange}></textarea>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">Lessons (comma-separated)</label>
                    <input name="lessons" className="form-control" placeholder="Lesson 1, Lesson 2, ..." value={form.lessons} onChange={handleChange} />
                  </div>
                  
                  <div className="col-12 mt-3">
                    <label className="form-label fw-semibold d-block">Videos</label>
                    {form.videos.map((vid, i) => (
                      <div key={vid.id || i} className="row g-2 mb-2 align-items-center">
                        <div className="col-md-3">
                          <input className="form-control form-control-sm" placeholder="Video Title" value={vid.title} onChange={(e) => handleVideoChange(i, 'title', e.target.value)} required />
                        </div>
                        <div className="col-md-2">
                          <input className="form-control form-control-sm" placeholder="Duration (e.g. 15:00)" value={vid.duration} onChange={(e) => handleVideoChange(i, 'duration', e.target.value)} />
                        </div>
                        <div className="col-md-4">
                          <input className="form-control form-control-sm" placeholder="YouTube URL" value={vid.url} onChange={(e) => handleVideoChange(i, 'url', e.target.value)} required />
                        </div>
                        <div className="col-md-2">
                          <input className="form-control form-control-sm" placeholder="Thumb URL" value={vid.thumbnail} onChange={(e) => handleVideoChange(i, 'thumbnail', e.target.value)} />
                        </div>
                        <div className="col-md-1">
                          <button type="button" className="btn btn-sm btn-outline-danger w-100" onClick={() => removeVideo(i)}>X</button>
                        </div>
                      </div>
                    ))}
                    <button type="button" className="btn btn-sm btn-outline-dark mt-1" onClick={addVideo}>+ Add Video</button>
                  </div>

                </div>
                <div className="mt-4 d-flex gap-2">
                  <button type="submit" className="btn btn-dark">{editing ? "Update Course" : "Add Course"}</button>
                  <button type="button" className="btn btn-outline-secondary" onClick={cancelForm}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {loading ? (
          <h5 className="text-muted">Loading courses...</h5>
        ) : courses.length === 0 ? (
          <h5 className="text-muted">No courses found.</h5>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Instructor</th>
                  <th>Duration</th>
                  <th>Level</th>
                  <th style={{ width: 160 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, idx) => (
                  <tr key={course.id || course._id}>
                    <td>{idx + 1}</td>
                    <td className="fw-semibold">{course.title}</td>
                    <td>{course.instructor}</td>
                    <td>{course.duration}</td>
                    <td>
                      <span className={`badge ${course.level === "Beginner" ? "bg-success" : course.level === "Intermediate" ? "bg-primary" : "bg-danger"}`}>
                        {course.level}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-dark me-2" onClick={() => openEdit(course)}>Edit</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(course.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
