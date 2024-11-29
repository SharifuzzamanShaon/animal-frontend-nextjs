import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const HttpKit = {
  getAllCategory: async () => {
    try {
      const res = await axios.get(`${BASE_URL}/category/all-category`);
      return res.data; 
    } catch (error) {
      console.log("Error to fetch All category:", error);
      return { category: [] };
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
