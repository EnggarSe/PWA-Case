import axios from 'axios'

const getItemList = async(payload) => {
   try{
      const url = 'https://5e8ecf49fe7f2a00165ee9ff.mockapi.io/Barang'
      return await axios.get(url)
   }catch(error){
      return error.messages
   }
}

const addUserList = async(payload) => { 
   try{
      const url = 'https://5e8ecf49fe7f2a00165ee9ff.mockapi.io/users'
      return await axios.post(url, payload.payload)
   }catch(error){
      return error.messages
   }
}

const getUserList = async(payload) => {
   console.log(payload, 'PAY');
   
   try{
      const url = 'https://5e8ecf49fe7f2a00165ee9ff.mockapi.io/users'
      return await axios.get(url)
   }catch(error){
      return error.messages
   }
}
const addItemList = async(payload) => {    
   try{
      const url = 'https://5e8ecf49fe7f2a00165ee9ff.mockapi.io/Barang'
      return await axios.post(url, payload.payload)
   }catch(error){
      return error.messages
   }
}
const deleteItemList = async(payload) => {    
   try{
      const url = 'https://5e8ecf49fe7f2a00165ee9ff.mockapi.io/Barang'
      return await axios.delete(`${url}/${payload.payload}`)
   }catch(error){
      return error.messages
   }
}

const editItemList = async(payload) => {    
   
   console.log(payload.payload, 'EDIT PAYLOAD');
   try{
      const url = 'https://5e8ecf49fe7f2a00165ee9ff.mockapi.io/Barang'
      return await axios.put(`${url}/${payload.payload.id}`, payload.payload)
   }catch(error){
      return error.messages
   }
}


export default{
   getItemList,
   addUserList,
   getUserList,
   addItemList,
   deleteItemList,
   editItemList,
  
}