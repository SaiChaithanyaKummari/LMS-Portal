import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getCourses,
  getUsers,
  updateUserCourseProgress,
} from "../services/Api";
import Progressbar from "../components/Progressbar";

export default function Player() {
  const { id, lesson } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const storedUser = localStorage.getItem("user");
      const userData = storedUser ? JSON.parse(storedUser) : null;
      setUser(userData);
      setCurrentLesson(lesson ? parseInt(lesson, 10) : 0);

      const courses = await getCourses();
      const found = courses.find((c) => String(c.id) === String(id));
      setCourse(found || null);

      if (userData) {
        const users = await getUsers();
        const dbUser = users.find((u) => u.email === userData.email);
        if (dbUser && dbUser.courseProgress) {
          const courseProg = dbUser.courseProgress.find(
            (cp) => String(cp.courseId) === String(id)
          );
          setProgress(courseProg ? courseProg.completedLessons : []);
        }
      }
      setLoading(false);
    };

    loadData();
  }, [id, lesson]);

  if (loading || !course) {
    return (
      <div className="container mt-4">
        <h2 className="text-muted">Loading player...</h2>
      </div>
    );
  }

  const lessons = course.lessons || [];
  const videos = course.videos || [];
  const lessonCount = Math.min(lessons.length, videos.length);
  const completedCount = progress.filter((idx) => idx < lessonCount).length;
  const totalCount = lessonCount;
  const percent = totalCount
    ? Math.round((completedCount / totalCount) * 100)
    : 0;

  const handleComplete = async () => {
    if (!user) return;
    const users = await getUsers();
    const dbUser = users.find((u) => u.email === user.email);
    if (!dbUser) return;

    const courseProgress = dbUser.courseProgress || [];
    let courseProg = courseProgress.find(
      (cp) => String(cp.courseId) === String(id)
    );
    if (!courseProg) {
      courseProg = { courseId: id, completedLessons: [] };
      courseProgress.push(courseProg);
    }
    if (!courseProg.completedLessons.includes(currentLesson)) {
      courseProg.completedLessons.push(currentLesson);
      await updateUserCourseProgress(dbUser.id, courseProgress);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...dbUser, courseProgress })
      );
      setProgress([...courseProg.completedLessons]);
    }
  };

  const nextLessons = videos
    .map((video, idx) => ({
      idx,
      title: video.title,
      thumbnail: video.thumbnail,
      url: video.url,
    }))
    .filter((l) => !progress.includes(l.idx) && l.idx !== currentLesson);

  const currentVideo = videos[currentLesson];

  const handleBack = () => {
    if (currentLesson - 1 >= 0) {
      navigate(`/player/${id}/${currentLesson - 1}`);
    }
  };

  const handleNext = () => {
    if (currentLesson + 1 < videos.length) {
      navigate(`/player/${id}/${currentLesson + 1}`);
    }
  };

  return (
    <div
      className="py-4"
      style={{
        minHeight: "100vh",
        background: "#ffffff",
      }}
    >
      <div className="container">
        <div
          style={{
            width: "100%",
            borderRadius: 10,
            display: "flex",
            flexDirection: "row",
            gap: 20,
          }}
        >
          <div className="mt-4 mb-3" style={{ width: "70%" }}>
            <iframe
              width="100%"
              height="500"
              src={currentVideo.url.replace("watch?v=", "embed/")}
              title={currentVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ background: "#222" }}
            ></iframe>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 10,
                gap: 10,
              }}
            >
              <button
                className="btn btn-secondary mb-3"
                onClick={handleBack}
                disabled={currentLesson === 0}
              >
                Back
              </button>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  className="btn btn-success mb-3"
                  onClick={handleComplete}
                  disabled={progress.includes(currentLesson)}
                >
                  {progress.includes(currentLesson)
                    ? "Completed"
                    : "Mark as Complete"}
                </button>
                <button
                  className="btn btn-primary mb-3"
                  onClick={handleNext}
                  disabled={currentLesson + 1 >= videos.length}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          <div
            className="mt-4"
            style={{
              width: "30%",
              padding: "30px 15px",
              marginBottom: 40,
              backgroundColor: "#f8f9fa",
              borderRadius: 20,
            }}
          >
            <Progressbar percent={percent} />
            <div style={{ padding: 4 }}>
              <h5>Next videos</h5>
              {nextLessons.length === 0 ? (
                <div>All videos completed!</div>
              ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {nextLessons.map((l) => (
                    <li
                      key={l.idx}
                      className="d-flex align-items-center mb-2"
                    >
                      <img
                        src={l.thumbnail}
                        alt={l.title}
                        style={{
                          width: 80,
                          height: 45,
                          objectFit: "cover",
                          marginRight: 12,
                          borderRadius: 4,
                        }}
                      />
                      <span style={{ fontSize: 16 }}>{l.title}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}