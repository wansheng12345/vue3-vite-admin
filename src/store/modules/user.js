import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import defAva from '@/assets/images/profile.jpg'

const useUserStore = defineStore(
  'user',
  {
    state: () => ({
      token: getToken(),
      name: '',
      avatar: '',
      roles: [],
      permissions: []
    }),
    actions: {
      // 登录
      login(userInfo) {
        console.log('login');
        const username = userInfo.username.trim()
        const password = userInfo.password
        return new Promise((resolve, reject) => {
          // login(username, password).then(res => {
          let data = {
            code: 200,
            msg: "操作成功",
            access_token: 'eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjBjOGQyZTI2LTkyOTAtNDYyZC04YzRhLTM4YjM5M2YzZGQ0NCJ9.Z_1IvvBNz3gPYjOJ2f03A1x0GZWQVJGGdOpZ8UminbTlO75CroDN_1YLumAO1r9lz-mrEOJeLf__m3Jj-1Aw4A',
          }
          setToken(data.access_token)
          this.token = data.access_token
          resolve()
          // }).catch(error => {
          //   reject(error)
          // })

        })
      },
      // 获取用户信息
      getInfo() {
        console.log('getInfo');
        return new Promise((resolve, reject) => {
          // getInfo().then(res => {
          let res = {
            code: 200,
            msg: '操作成功',
            permissions: ["*:*:*"],
            roles: ["admin"],
            user: {
              admin: true,
              avatar: "",
              createBy: "admin",
              createTime: "2023-02-03 11:11:26",
              delFlag: "0",
              deptId: 103,
              email: "ry@163.com",
              loginDate: "2023-04-07T11:38:12.000+08:00",
              loginIp: "171.113.138.14",
              nickName: "若依",
              password: "$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2",
              phonenumber: "15888888888",
              postIds: null,
              remark: "管理员",
              roleId: null,
              roleIds: null,
              sex: "1",
              status: "0",
              updateBy: null,
              updateTime: null,
              userId: 1,
              userName: "admin",
              dept: {
                ancestors: "0,100,101",
                children: [],
                createBy: null,
                createTime: null,
                delFlag: null,
                deptId: 103,
                deptName: "研发部门",
                email: null,
                leader: "若依",
                orderNum: 1,
                parentId: 101,
                parentName: null,
                phone: null,
                remark: null,
                status: "0",
                updateBy: null,
                updateTime: null,
              },
              roles: [
                {
                  admin: true,
                  createBy: null,
                  createTime: null,
                  dataScope: "1",
                  delFlag: null,
                  deptCheckStrictly: false,
                  deptIds: null,
                  flag: false,
                  menuCheckStrictly: false,
                  menuIds: null,
                  permissions: null,
                  remark: null,
                  roleId: 1,
                  roleKey: "admin",
                  roleName: "超级管理员",
                  roleSort: 1,
                  status: "0",
                  updateBy: null,
                  updateTime: null,
                }
              ],
            }
          }
          const user = res.user;
          const avatar = (user.avatar == "" || user.avatar == null) ? defAva : user.avatar;
          if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            this.roles = res.roles
            this.permissions = res.permissions
          } else {
            this.roles = ['ROLE_DEFAULT']
          }
          this.name = user.userName
          this.avatar = avatar;
          resolve(res)
          // }).catch(error => {
          //   reject(error)
          // })
        })
      },
      // 退出系统
      logOut() {
        return new Promise((resolve, reject) => {
          this.token = ''
          this.roles = []
          this.permissions = []
          removeToken()
          resolve()
          // logout(this.token).then(() => {
          //   this.token = ''
          //   this.roles = []
          //   this.permissions = []
          //   removeToken()
          //   resolve()
          // }).catch(error => {
          //   reject(error)
          // })
        })
      }
    }
  })

export default useUserStore
