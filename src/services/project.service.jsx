// const api_url = process.env.REACT_APP_API_URL;
const api_url = "http://localhost:1011";

// A function to send post request to create a new project
const createProject = async (formData) => {
  const data = new FormData();
  Object.keys(formData).forEach(key => {
    if (formData[key] !== null) {
      data.append(key, formData[key]);
    }
  });
  const requestOptions = {
    method: "POST",
    headers: {},
    body: data,
  };
  const response = await fetch(`${api_url}/api//admin/project`, requestOptions);
  return response;
};

// A function to send get request to get all project
const getAllProjects = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", "x-access-token": token },
  };
  const response = await fetch(`${api_url}/api/admin/projects`, requestOptions);
  return response;
};

// a function to send get request to get a project by id
const getProjectById = async (id, token) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", "x-access-token": token },
  };
  const response = await fetch(
    `${api_url}/api/admin/project/${id}`,
    requestOptions,
  );
  return response;
};

// a function to send put request to update a project
const updateProject = async (id, formData, token) => {
  const data = new FormData();
  Object.keys(formData).forEach(key => {
    if (formData[key] !== null) {
      data.append(key, formData[key]);
    }
  });
  const requestOptions = {
    method: "PUT",
    headers: { "x-access-token": token },
    body: data,
  };
  const response = await fetch(
    `${api_url}/api/admin/project/${id}`,
    requestOptions,
  );
  return response;
};

// a function to send delete request to delete a project
// project.service.jsx
const deleteProject = async (token, id) => {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json", "x-access-token": token },
  };
  return await fetch(`${api_url}/api/admin/project/${id}`, requestOptions);
};

// Export all the functions
const projectService = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
export default projectService;
