import axios from "axios";

const BACKEND_API_URL = "http://localhost:3000";

export async function fetchRiders() {
  try {
    const results = await axios.get(`${BACKEND_API_URL}/riders`)
    return results.data
  }

  catch (error) {
    new Error("backend API request failed.")
  }
};

export async function submitSponsorship(form) {
  try {
    const params = {
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      slogan: form.slogan
    }

    const results = await axios.post(`${BACKEND_API_URL}/submissions`, params);
    return results

  } catch (error) {
    new Error("backend API request failed.")
  }
}

export default {
  fetchRiders, submitSponsorship
};
