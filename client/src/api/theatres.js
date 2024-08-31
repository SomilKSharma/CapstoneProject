import { axiosInstance } from ".";

export const addTheatre = async (payload) => {
  try {
    const response = await axiosInstance.post('/api/theatres/add-theatre', payload);
    return response.data;
  } catch (err) {
    return err.response;
  }
}

export const getAllTheatresForAdmin = async () => {
  try {
    const response = await axiosInstance.get('/api/theatres/get-all-theatres');
    return response.data;
  } catch (err) {
    return err.response;
  }
}

export const getAllTheatres = async (payload) => {
  try {
    const response = await axiosInstance.post('/api/theatres/get-all-theatres-by-owner', payload);
    return response.data;
  } catch (err) {
    return err.response;
  }
}

export const updateTheatre = async (payload) => {
  try {
    const response = await axiosInstance.put('/api/theatres/update-theatre', payload);
    return response.data;
  } catch (err) {
    return err.resposne;
  }
}

export const deleteTheatre = async (payload) => {
  try {
    const response = await axiosInstance.put('/api/theatres/delete-theatre', payload);
    return response.data;
  } catch (err) {
    return err.response;
  }
}

