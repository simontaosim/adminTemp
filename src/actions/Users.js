
import {message} from "antd";
import {changeFormLoading, changeFormData} from "./RegForm";
import {changeConditon} from './condition';


export const QUERY_LATEST_USERS = "QUERY_LASTEST_USERS";
export const SHOW_USERS = "SHOW_USERS";
export const ADD_ONE_USER = "ADD_ONE_USER";
export const CHANGE_TABLE_LOADING = "CHANGE_TABLE_LOADING";
export const SHOW_USERS_FAILED = "SHOW_USERS_FAILED";
export const GET_ONE_USER = "GET_ONE_USER";
export const DELETE_ONE_USER = "DELETE_ONE_USER";


function deleteOneUser(key){
  return {type: DELETE_ONE_USER, key}
}

export function deleteUser(id, key){
  return function(dispatch) {
    let query = new Bmob.Query(Bmob.User);
    return query.get(id).then (
      user => user.destory({
        success: key => dispatch(deleteUser(key)),
        error: error => dispatch(delteUserFailed(key))
      }),
      error => dispatch(showUsersFailed(error))
    )
  }
}







export function queryLatestUsers(condition){
  return function (dispatch, getState) {
    let page = condition.pagination;
    let pageSize = page.pageSize;
    let skipNumber = pageSize*(page.current-1);
    let total = page.total;
    if (page.current*pageSize >= total && getState().Users.data.length > 0) {
      total = total + pageSize*2;
      dispatch(changeConditon({pagination: {
        total: total
      }}));
    }
     dispatch(changeTableLoading(true));
    let query = new Bmob.Query(Bmob.User);
    query.descending("updatedAt");
    query.limit(pageSize);
    query.skip(skipNumber);
    return query.find(null).then (
      users => dispatch(showUsers(users, total)),
      error => dispatch(showUsersFailed(error))
    )
  }
}

function changeTableLoading(isLoading){
  return {type: CHANGE_TABLE_LOADING, isLoading}
}

function showUsers(users, total=10){
  return {type: SHOW_USERS, users, total}
}
function showUsersFailed(error){
  return {type: SHOW_USERS_FAILED, error}
}

export function addOneUser(){
  return function (dispatch, getState) {
    dispatch(changeFormLoading(true));
    let User = new Bmob.Object.extend("_User");
    let user = new User();
     user.set("username", getState().RegForm.username.value);
     user.set("password", getState().RegForm.password.value);
     user.set("email", getState().RegForm.email.value);
       dispatch(changeTableLoading(true));
    return user.save(null).then (
      users => {

        dispatch(queryLatestUsers(getState().condition));
          message.success("添加成功！");
        dispatch(changeFormLoading(false));


      },
      error => {
        // message.error(error);
        dispatch(showUsersFailed(error))
      }
    )
  }
}
