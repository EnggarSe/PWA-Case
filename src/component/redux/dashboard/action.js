const actions = {
   GET_ITEM_LIST : "GET_ITEM_LIST",
   ITEM_LIST : "ITEM_LIST",

   ADD_USER_LIST : 'ADD_USER_LIST',
   ADD_USER : 'ADD_USER',

   RESET_STATE : 'RESET_STATE',

   GET_USER_LIST : 'GET_USER_LIST',
   USER_LIST : 'USER_LIST',

   ADD_ITEM_LIST : "ADD_ITEM_LIST",
   ITEM_LIST_ADD : "ITEM_LIST_ADD",

   DELETE_ITEM_LIST : 'DELETE_ITEM_LIST',
   ITEM_LIST_DELETED : 'ITEM_LIST_DELETED',

   EDIT_ITEM_LIST : "EDIT_ITEM_LIST",
   ITEM_LIST_EDITED : "ITEM_LIST_EDITED",

   getItemList : payload => ({
      type : actions.GET_ITEM_LIST,
      payload
   }),

   addUserList : payload => ({
      type : actions.ADD_USER_LIST,
      payload
   }),

   resetState : payload =>({
      type : actions.RESET_STATE,
      payload
   }),

   getUserList : payload =>({
      type : actions.GET_USER_LIST,
      payload 
   }),

   addItemList : payload =>({
      type : actions.ADD_ITEM_LIST,
      payload
   }),

   deleteItemList : payload => ({
      type : actions.DELETE_ITEM_LIST,
      payload
   }),

   editItemList : payload => ({
      type : actions.EDIT_ITEM_LIST,
      payload
   })

}

export default actions