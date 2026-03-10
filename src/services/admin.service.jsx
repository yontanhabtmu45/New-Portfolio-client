// Import from env
// const api_url = process.env.REACT_APP_API_URL;
const api_url = "http://localhost:1011";

// A function to send post request to create a new admin
const createAdmin = async (formData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${api_url}/api/admin`, requestOptions);
  return response;
};

// A function to send get request to get all admins
const getAllAdmins = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", "x-access-token": token },
  };
  const response = await fetch(`${api_url}/api/admins`, requestOptions);
  return response;
};

// a function to send get request to get a single Admin
const getAdmin = async (id) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(`${api_url}/api/admin/${id}`, requestOptions);
  return response;
};

// a function to update an admin
const updateAdmin = async (id, formData) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${api_url}/api/admin/${id}`, requestOptions);
  return response;
};

// a function to delete an admin
const deleteAdmin = async (id, token) => {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json", "x-access-token": token },
  };
  const response = await fetch(`${api_url}/api/admin/${id}`, requestOptions);
  return response;
};



// Also provide a default export for convenience
const AdminService = {
  createAdmin,
  getAllAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin
};
export default AdminService;
