import {SHOW_USERS, CHANGE_TABLE_LOADING} from "../actions/Users";
import {message} from "antd"

const currentUser = Bmob.User.current();

function Users(state={loading: true, pageSize: 12, total: 10, data: [1]}, action){
  //初始的状态的data保证开始的数组length不为0
    switch (action.type) {
      case SHOW_USERS:
        let dataSource = [];
        for (var i = 0; i < action.users.length; i++) {
          var object = action.users[i];
          if (currentUser.attributes.username === object.get("username")) {
            continue;//在表格中不显示当前用户
          }
          let objToPush = {
            id: object.id,
            key: i,
            username: object.get('username'),
            email: object.get('email'),
            create_at: object.createdAt,
            updated_at: object.updatedAt
          }
          dataSource.push(objToPush)
        }
        message.success("加载完成！");
        return Object.assign({}, state,{
          loading: false,
          total: action.total,
          data: dataSource
        });
        break;
      case CHANGE_TABLE_LOADING:
        return Object.assign({}, state,{
          loading: action.isLoading
        });
        break;
      default:
        return state;

    }
}


export default Users;
