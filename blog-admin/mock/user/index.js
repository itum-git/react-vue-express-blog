import { config } from '@/config/axios/config'

const { success_code } = config

const timeout = 1000

const user = {
    username: 'admin',
    password: 'admin',
    permissions: ['dashboard']
  }

const token = 'A6JOBFjWTYIneDhKPox7uRviEm4d0w5VZHbaGfty1sprMQkl8S'

export default [
  // 登录接口
  {
    url: '/user/login',
    method: 'post',
    timeout,
    response: ({ body }) => {
      const data = body
      if (user.username === data.username && user.password === data.password) {
        return {
          code: success_code,
          data: { token }
        }
      } else {
        return {
          code: '500',
          msg: '账号或密码错误'
        }
      }
    }
  },

  // 获取用户信息接口
  {
    url: '/user/info',
    method: 'get',
    timeout,
    response: () => {
      const userInfo = { ...user }

      delete userInfo.password

      return {
        code: success_code,
        data: {
          userInfo
        }
      }
    }
  },

  // 刷新token
  {
    url: '/user/refreshToken',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: success_code,
        data: null
      }
    }
  },

  // 退出接口
  {
    url: '/user/loginOut',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: success_code,
        data: null
      }
    }
  }
]
