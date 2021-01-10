import actions from './action'

const initialState = {
   itemsList : '',
   loader : false,
   addUserMessage : '',
   addUserLoader : false,
   userList : '',
   addItemMessage : '',
   addItemLoader : false,
   deleteItemMessage : '',
   deleteItemLoader : false,
   editItemMessage : '',
   editItemLoader : false,
}

export default function ViewsReducer (state = initialState, action){
   console.log(action, 'ACTION');
   
   switch (action.type){
      case actions.GET_ITEM_LIST:
         return{
            ...state,
           itemsList : '',
           loader : true 
         }
      case actions.ITEM_LIST:
         return{
            ...state,
           itemsList : action.data,
           loader : false
         }
      case actions.ADD_USER_LIST:
         return{
            ...state,
            addUserMessage : '',
            addUserLoader : true 
         }
      case actions.ADD_USER:
         return{
            ...state,
            addUserMessage : action.message,
            addUserLoader : false
         }
      case actions.GET_USER_LIST:
         return{
            ...state,
           userList : '', 
         }
      case actions.USER_LIST:
         return{
            ...state,
           userList : action.data,
         }
      case actions.ADD_ITEM_LIST:
         return{
            ...state,
            addItemMessage : '',
            addItemLoader : true 
         }
      case actions.ITEM_LIST_ADD:
         return{
            ...state,
            addItemMessage : action.message,
            addItemLoader : false 
         }
      case actions.DELETE_ITEM_LIST :
         return{
            ...state,
            deleteItemLoader : true,
         }
      case actions.ITEM_LIST_DELETED :
         return{
            ...state,
            deleteItemMessage : action.message,
            deleteItemLoader : false,
         }
      case actions.EDIT_ITEM_LIST :
         return{
            ...state,
            editItemLoader : true,
         }
      case actions.ITEM_LIST_EDITED :
         return{
            ...state,
            editItemMessage : action.message,
            editItemLoader : false,
         }
      case actions.RESET_STATE:
         return{
            ...state,
            addUserMessage : '',
            addUserLoader : false,
            addItemMessage : '',
            addItemLoader : false,
            deleteItemMessage :'',
            deleteItemLoader : false,
            editItemMessage : '',
            editItemLoader : false,
         }
         default:
            return state
      }
   }