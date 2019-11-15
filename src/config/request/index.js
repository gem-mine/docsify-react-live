import request from '@gem-mine/request'
import { actions } from '@gem-mine/durex'
import { config } from './proxy'

// 请求初始化
request.init(config, {
  // 开发模式下，如果某个域配置了 wds，则优先使用 wds 配置
  wds: !ENV.PRODUCTION,
  // 环境配置
  env: ENV.MOCK ? 'mock' : 'defaults'
})

// 全局设置，对所有请求生效
request.config({
  verify(data) {
    return data.status === 200
  },
  loading() {},
  error() {},
  complete() {}
})

// demo 域 API 请求配置，会覆盖全局设置，仅对当前域生效
request.demo.config({
  loading() {
    actions.demo.setField({
      status: 'loading'
    })
  },
  error(res) {
    actions.demo.setField({
      status: 'failure',
      data: res.data
    })
  }
})
