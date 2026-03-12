const API_BASE = "https://learning-management-system-backend-oy1e.onrender.com";

// Update a user's courseProgress array
export const updateUserCourseProgress = (userId, courseProgress) => {
  return fetch(`${API_BASE}/api/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ courseProgress })
  }).then(res => res.json());
};
// Update a user's enrolledCourses array
export const updateUserEnrolledCourses = (userId, enrolledCourses) => {
  return fetch(`${API_BASE}/api/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ enrolledCourses })
  }).then(res => res.json());
};
export const getCourses = () => {
  return fetch(`${API_BASE}/api/courses`)
    .then(res => res.json());
};

// User-related API functions
export const getUsers = () => {
  return fetch(`${API_BASE}/api/users`)
    .then(res => res.json());
};

export const addUser = (user) => {
  return fetch(`${API_BASE}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  }).then(res => res.json());
};

// Course CRUD for Admin
export const addCourse = (course) => {
  return fetch(`${API_BASE}/api/courses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course)
  }).then(res => res.json());
};

export const updateCourse = (id, course) => {
  return fetch(`${API_BASE}/api/courses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course)
  }).then(res => res.json());
};

export const deleteCourse = (id) => {
  return fetch(`${API_BASE}/api/courses/${id}`, {
    method: "DELETE"
  }).then(res => res.json());
};
