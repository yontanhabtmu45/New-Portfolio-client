// const api_url = process.env.REACT_APP_API_URL;
const api_url = "http://localhost:1011";

// A function to send post request to create a new skill
const createSkill = async (formData) => {
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
  const response = await fetch(`${api_url}/api//admin/skill`, requestOptions);
  return response;
};

// A function to send get request to get all skill
const getAllSkills = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", "x-access-token": token },
  };
  const response = await fetch(`${api_url}/api/admin/skills`, requestOptions);
  return response;
};

// a function to send get request to get a skill by id
const getSkillById = async (id, token) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", "x-access-token": token },
  };
  const response = await fetch(
    `${api_url}/api/admin/skill/${id}`,
    requestOptions,
  );
  return response;
};

// a function to send put request to update a skill
const updateSkill = async (id, formData, token) => {
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
    `${api_url}/api/admin/skill/${id}`,
    requestOptions,
  );
  return response;
};

// a function to send delete request to delete a skill
// skill.service.jsx
const deleteSkill = async (token, id) => {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json", "x-access-token": token },
  };
  return await fetch(`${api_url}/api/admin/skill/${id}`, requestOptions);
};

// Export all the functions
const skillService = {
  createSkill,
  getAllSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
};
export default skillService;
