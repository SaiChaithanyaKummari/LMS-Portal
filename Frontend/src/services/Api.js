// Update a user's courseProgress array
export const updateUserCourseProgress = (userId, courseProgress) => {
  return fetch(`http://localhost:5000/api/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ courseProgress })
  }).then(res => res.json());
};
// Update a user's enrolledCourses array
export const updateUserEnrolledCourses = (userId, enrolledCourses) => {
  return fetch(`http://localhost:5000/api/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ enrolledCourses })
  }).then(res => res.json());
};
export const getCourses = () => {
  return fetch("http://localhost:5000/api/courses")
    .then(res => res.json());
};

// User-related API functions
export const getUsers = () => {
  return fetch("http://localhost:5000/api/users")
    .then(res => res.json());
};

export const addUser = (user) => {
  return fetch("http://localhost:5000/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  }).then(res => res.json());
};
