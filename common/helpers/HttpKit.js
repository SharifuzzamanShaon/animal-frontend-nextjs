import axios from "axios";

const BASE_URL = "http://localhost:5006/api/v1";

const HttpKit = {
  getAllCategory: async () => {
    try {
      const res = await axios.get(`${BASE_URL}/category/all-category`);
      return res.data; // Return the data, which you can use in react-query
    } catch (error) {
      console.log("Error to fetch All category:", error);
      return { category: [] }; // Return an empty array if error occurs
    }
  },
  fetchAnimalByCategory: async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/animal/get?category=${id}`);
      return res.data;
    } catch (error) {
      console.log("Error to fetch items:", error);
    }
  },
  fetchAllAnimal: async ()=>{
    try {
      const res = await axios.get(`${BASE_URL}/animal/all-animals`)
      return res.data
    } catch (error) {
      console.log(error);
      
    }
  },
  addNewAnimal: async ( data ) => {
    try {
      console.log(data);

      const res = await axios.post(`${BASE_URL}/animal/add-animal`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  addNewCategory: async (data)=>{
    try {
      const res = await axios.post(`${BASE_URL}/category/add`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      return res?.data;
    } catch (error) {
      console.log(error);
    }
  }
};

export default HttpKit;
