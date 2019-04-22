import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import qs from 'qs';
import { LoginUsers, Users ,Teams, Chals, Instances, Admins } from './data/user';
let _Users = Users;
let _Teams = Teams;
let _Chals = Chals;
let _Instances = Instances;
let _Admins=Admins;

export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    let mock = new MockAdapter(axios);

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    });

    //登录
    mock.onPost('/admin/login').reply(config => {
      //console.log(config.data);
      let {username, password} = qs.parse(config.data);
      return new Promise((resolve, reject) => {
        let user = null;
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
            if (u.username === username && u.password === password) {
              user = JSON.parse(JSON.stringify(u));
              user.password = undefined;
              return true;
            }
          });

          if (hasUser) {
            resolve([200, { code: 200, msg: '请求成功', user }]);
          } else {
            resolve([200, { code: 500, msg: '账号或密码错误' }]);
          }
        }, 1000);
      });
    });

    //获取用户列表
    mock.onGet('/user/list').reply(config => {
      let {name} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            users: mockUsers
          }]);
        }, 1000);
      });
    });

    //获取用户列表（分页）
    mock.onGet('/user/listpage').reply(config => {
      let {page, name} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      let total = mockUsers.length;
      mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            users: mockUsers
          }]);
        }, 1000);
      });
    });

    //删除用户
    mock.onGet('/user/remove').reply(config => {
      let { id } = config.params;
      _Users = _Users.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //批量删除用户
    mock.onGet('/user/batchremove').reply(config => {
      let { ids } = config.params;
      ids = ids.split(',');
      _Users = _Users.filter(u => !ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //编辑用户
    mock.onGet('/user/edit').reply(config => {
      let { id, name, addr, age, birth, sex } = config.params;
      _Users.some(u => {
        if (u.id === id) {
          u.name = name;
          u.addr = addr;
          u.age = age;
          u.birth = birth;
          u.sex = sex;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 500);
      });
    });

    //新增用户
    mock.onGet('/user/add').reply(config => {
      let { name, addr, age, birth, sex } = config.params;
      _Users.push({
        name: name,
        addr: addr,
        age: age,
        birth: birth,
        sex: sex
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 500);
      });
    });

      mock.onGet('/admin/chals').reply(config=>{
          return new Promise((resolve,reject)=>{
              setTimeout(()=>{
                  resolve([200,{
                      'chals':_Chals
                  }])
              },500)
          })
      });
      mock.onGet('/admin/instances').reply(config=>{
          return new Promise((resolve,reject)=>{
              setTimeout(()=>{
                  resolve([200,{
                      'instances':_Instances
                  }])
              },500);
          })
      })

      //获取用户列表（分页）
      mock.onGet('/admin/teams').reply(config => {
          let {page, name} = config.params;
          let mockTeams = _Teams.filter(user => {
              if (name && user.nickname.indexOf(name) == -1) return false;
              return true;
          });
          let total = mockTeams.length;
          //console.log(mockTeams)
          mockTeams = mockTeams.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, {
                      total: total,
                      users: mockTeams
                  }]);
              }, 1000);
          });
      });
      mock.onPost('/admin/teams/remove').reply(config => {
          let { id } = qs.parse(config.data);
          _Teams = _Teams.filter(u => u.id !== id);
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, {
                      code: 200,
                      msg: '删除成功'
                  }]);
              }, 500);
          });
      });

      mock.onGet('/admin/teams/batchremove').reply(config => {
          let { ids } = config.params;
          ids = ids.split(',');
          _Teams = _Teams.filter(u => !ids.includes(u.id));
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, {
                      code: 200,
                      msg: '删除成功'
                  }]);
              }, 500);
          });
      });
      mock.onPost('/admin/teams/add').reply(config => {
          //console.log(config.data);
          let { name, nickname, password } = qs.parse(config.data);
          //console.log(name,nickname,password);
          _Teams.push({
              name: name,
              nickname: nickname,
              score: 1000,
              password: password
          });
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, {
                      code: 200,
                      msg: '新增成功'
                  }]);
              }, 500);
          });
      });
      mock.onPost('/admin/teams/edit').reply(config => {
          let { id, name,nickname,password } = qs.parse(config.data);
          _Teams.some(u => {
              if (u.id === id) {
                  u.name = name;
                  u.nickname = nickname;
                  u.password = password;
                  //u.birth = birth;
                  //u.sex = sex;
                  return true;
              }
          });
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, {
                      code: 200,
                      msg: '编辑成功'
                  }]);
              }, 500);
          });
      });
      mock.onGet('/admin/chals').reply(config => {
          console.log(config.params);
          let {page, name} = config.params;
          let mockChals = _Chals.filter(user => {
              if (name && user.name.indexOf(name) == -1) return false;
              return true;
          });

          let total = mockChals.length;
          //console.log(mockTeams)
          mockChals = mockChals.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));

          console.log(mockChals);
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, {
                      total: total,
                      chals: mockChals
                  }]);
              }, 1000);
          });
      });
      mock.onPost('/admin/chals/remove').reply(config => {
          let { id } = qs.parse(config.data);
          _Chals = _Chals.filter(u => u.id !== id);
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, {
                      code: 200,
                      msg: '删除成功'
                  }]);
              }, 500);
          });
      });

      mock.onGet('/admin/chals/batchremove').reply(config => {
          let { ids } = config.params;
          ids = ids.split(',');
          _Chals = _Chals.filter(u => !ids.includes(u.id));
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, {
                      code: 200,
                      msg: '删除成功'
                  }]);
              }, 500);
          });
      });
      mock.onPost('/admin/chals/add').reply(config => {
          //console.log(config.data);
          let { name, dockername,score,command,flagcommand ,desc ,type} = qs.parse(config.data);
          //console.log(name,nickname,password);
          _Chals.push({
              name: name,
              dockername: dockername,
              score: score,
              command:command,
              flagcommand:flagcommand,
              desc:desc,
              type:type
          });
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, {
                      code: 200,
                      msg: '新增成功'
                  }]);
              }, 500);
          });
      });

      mock.onPost('/admin/chals/edit').reply(config => {
          let { id, name,dockername,score,command,flagcommand,desc,type } = qs.parse(config.data);
          _Chals.some(u => {
              if (u.id === id) {
                  u.name = name;
                  u.dockername = dockername;
                  u.score = score;
                  u.command=command;
                  u.flagcommand=flagcommand;
                  u.desc=desc;
                  u.type=type;
                  //u.birth = birth;
                  //u.sex = sex;
                  return true;
              }
          });
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, {
                      code: 200,
                      msg: '编辑成功'
                  }]);
              }, 500);
          });
      });
      mock.onGet('/admin/instances').reply(config => {
          let {page, name} = config.params;
          let mockInstances = _Instances.filter(user => {
              if (name && user.name.indexOf(name) == -1) return false;
              return true;
          });

          let total = mockInstances.length;
          //console.log(mockTeams)
          mockInstances = mockInstances.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));

          console.log(mockInstances);
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, {
                      total: total,
                      instances: mockInstances
                  }]);
              }, 1000);
          });
      });
      mock.onPost('/admin/instances/chpass').reply(config=>{
          let {id,password}=qs.parse(config.data);
          counter[id]=0;
          console.log(id,password);
          _Instances.some(u=>{
              if(u.id==id){
                  u.password=password;
                  return true;
              }
          });
          return new Promise((resolve,reject)=>{
              setTimeout(()=>{
                  resolve([200,{
                      code:200,
                      msg:'更改密码指令已发送',
                      id:id
                  }]);
              },500);
          })
      });
      let counter={};
      mock.onPost('/admin/instances/restart').reply(config=>{
          let {id}=qs.parse(config.data);
          counter[id]=0;
          return new Promise((resolve,reject)=>{
              setTimeout(()=>{
                  resolve([200,{
                      code:200,
                      msg:'重启指令已发送',
                      id:id
                  }]);
              },500);
          })
      })
      mock.onGet('/admin/instances/status').reply(config=>{
          let {id}=config.params;
          console.log(counter);
          if(counter[id]!=undefined){
              counter[id]++;
              if(counter[id]%4==0){
                  return new Promise((resolve,reject)=>{
                      console.log('success');
                      setTimeout(()=>{
                          resolve([200,{
                              code:200,
                              msg:true,
                              status:'success'
                          }]);
                      },500);
                  })
              }
              else return new Promise((resolve,reject)=>{
                  setTimeout(()=>{
                      resolve([200,{
                          code:200,
                          msg:false
                      }]);
                  },500)
              })
          }
          else{
              return new Promise((resolve,reject)=>{
                  setTimeout(()=>{
                      resolve([403,{
                          code:403,
                          msg:"forbid"
                      }]);
                  },500);
              })
          }
      });
      mock.onGet('/admin/list').reply(config => {
          console.log(config.params);
          let {page, name} = config.params;
          let mockAdmins = _Admins.filter(user => {
              if (name && user.name.indexOf(name) == -1) return false;
              return true;
          });

          let total = mockAdmins.length;
          //console.log(mockTeams)
          mockAdmins = mockAdmins.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));

          //console.log(mockAdmins);
          mockAdmins=mockAdmins.filter(user=>{
              delete user.password;
              return true;
          });
          console.log(mockAdmins);
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, {
                      total: total,
                      admins: mockAdmins
                  }]);
              }, 1000);
          });
      });
      mock.onPost('/admin/remove').reply(config => {
          let { id } = qs.parse(config.data);
          _Admins = _Admins.filter(u => u.id !== id);
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, {
                      code: 200,
                      msg: '删除成功'
                  }]);
              }, 500);
          });
      });

      mock.onPost('/admin/batchremove').reply(config => {
          let { ids } = qs.parse(config.data);
          ids = ids.split(',');
          _Admins = _Admins.filter(u => !ids.includes(u.id));
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, {
                      code: 200,
                      msg: '删除成功'
                  }]);
              }, 500);
          });
      });
      mock.onPost('/admin/add').reply(config => {
          //console.log(config.data);
          let { name, password} = qs.parse(config.data);
          //console.log(name,nickname,password);
          _Admins.push({
              name: name,
              password:password
          });
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, {
                      code: 200,
                      msg: '新增成功'
                  }]);
              }, 500);
          });
      });
      mock.onPost('/admin/edit').reply(config => {
          let { id, name, password } = qs.parse(config.data);
          _Chals.some(u => {
              if (u.id === id) {
                  u.name = name;
                  u.password=password;
                  //u.birth = birth;
                  //u.sex = sex;
                  return true;
              }
          });
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, {
                      code: 200,
                      msg: '编辑成功'
                  }]);
              }, 500);
          });
      });
      mock.onPost('/admin/startall').reply(config=>{
          counter['startall_command']=0;
          return new Promise((resolve,reject)=>{
              setTimeout(()=>{
                  resolve([200,{
                      code:200,
                      msg:'开始比赛指令已发送',
                      id:'startall_command'
                  }]);
              },500);
          })
      })
  }
};