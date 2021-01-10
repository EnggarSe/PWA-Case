import { all, takeEvery, put, fork, call } from 'redux-saga/effects'
import actions from './action'
import callApi from './callApi'

export function * getItemList () {
   yield takeEvery('GET_ITEM_LIST', function * (payload) {
     try {
       let res = yield call(callApi.getItemList, payload)   
       if (res.status === 200 || res.status === 201)  {
         yield put({
           type: actions.ITEM_LIST,
           data: res.data,
           message: 'success'
         })
       } else {
         yield put({ type: actions.ITEM_LIST, data: [res.data], message: 'failed' })
       }
     } catch (error) {
       yield put({ type: actions.ITEM_LIST, data: [] })
     }
   })
 }

export function * addUserList () {
   yield takeEvery('ADD_USER_LIST', function * (payload) {
     try {
       let res = yield call(callApi.addUserList, payload) 
       if (res.status === 200 || res.status === 201) {
         yield put({
           type: actions.ADD_USER,
           data: res.data,
           message: res.statusText
         })
       } else {
         yield put({ type: actions.ADD_USER, data: [res.data], message: 'failed' })
       }
     } catch (error) {
       yield put({ type: actions.ADD_USER, data: [] })
     }
   })
 }

 export function * getUserList () {
   yield takeEvery('GET_USER_LIST', function * (payload) {
     try {
       let res = yield call(callApi.getUserList, payload)   
       if (res.status === 200 || res.status === 201) {
         console.log(res.data, 'PAYLOAD');
         yield put({
           type: actions.USER_LIST,
           data: res.data,
           message: 'success'
         })
       } else {
         yield put({ type: actions.USER_LIST, data: [res.data], message: 'failed' })
       }
     } catch (error) {
       yield put({ type: actions.USER_LIST, data: [] })
     }
   })
 }


 export function * addItemList () {
   yield takeEvery('ADD_ITEM_LIST', function * (payload) {
     try {
       let res = yield call(callApi.addItemList, payload) 
       if (res.status === 200 || res.status === 201) {
         yield put({
           type: actions.ITEM_LIST_ADD,
           data: res.data,
           message: "Item Added"
         })
       } else {
         yield put({ type: actions.ITEM_LIST_ADD, data: [res.data], message: 'failed' })
       }
     } catch (error) {
       yield put({ type: actions.ITEM_LIST_ADD, data: [] })
     }
   })
 }

 export function * deleteItemList () {
   yield takeEvery('DELETE_ITEM_LIST', function * (payload) {
     try {
       let res = yield call(callApi.deleteItemList, payload) 
       if (res.status === 200 || res.status === 201) {
         yield put({
           type: actions.ITEM_LIST_DELETED,
           data: res.data,
           message: "Item Deleted"
         })
       } else {
         yield put({ type: actions.ITEM_LIST_DELETED, data: [res.data], message: 'failed' })
       }
     } catch (error) {
       yield put({ type: actions.ITEM_LIST_DELETED, data: [] })
     }
   })
 }

 export function * editItemList () {
   yield takeEvery('EDIT_ITEM_LIST', function * (payload) {
     try {
       let res = yield call(callApi.editItemList, payload) 
       if (res.status === 200 || res.status === 201) {
         yield put({
           type: actions.ITEM_LIST_EDITED,
           data: res.data,
           message: "Item Edited"
         })
       } else {
         yield put({ type: actions.ITEM_LIST_EDITED, data: [res.data], message: 'failed' })
       }
     } catch (error) {
       yield put({ type: actions.ITEM_LIST_EDITED, data: [] })
     }
   })
 }

export default function * rootSaga () {
   yield all([
    fork(getItemList),
    fork(addUserList),
    fork(getUserList),
    fork(addItemList),
    fork(deleteItemList),
    fork(editItemList)
   ])
 }