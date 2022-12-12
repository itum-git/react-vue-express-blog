// import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import mockJs from 'mockjs';
import { pathToRegexp } from 'path-to-regexp';

const Mock = mockJs;

const modules = import.meta.glob('./**/*.js', {
  import: 'default',
  eager: true
})

const mockModules = []
Object.keys(modules).forEach(async (key) => {
  if (key.includes('_')) {
    return
  }
  mockModules.push(...(modules[key]))
})

export function setupProdMockServer() {
  createProdMockServer(mockModules)
}


function createProdMockServer(mockList) {
  for (const { url, method, response, timeout } of mockList) {
      __setupMock__(timeout);
      Mock.mock(pathToRegexp(url, undefined, { end: false }), method || 'get', __XHR2ExpressReqWrapper__(response));
  }
}
function __param2Obj__(url) {
  const search = url.split('?')[1];
  if (!search) {
      return {};
  }
  return JSON.parse('{"' +
      decodeURIComponent(search)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"')
          .replace(/\+/g, ' ') +
      '"}');
}
function __XHR2ExpressReqWrapper__(handle) {
  return function (options) {
      let result = null;
      if (typeof handle === 'function') {
          const { body, type, url, headers } = options;
          let b = body;
          try {
              b = JSON.parse(body);
          }
          catch { }
          result = handle({
              method: type,
              body: b,
              query: __param2Obj__(url),
              headers,
          });
      }
      else {
          result = handle;
      }
      return Mock.mock(result);
  };
}
function __setupMock__(timeout = 0) {
  timeout &&
      Mock.setup({
          timeout,
      });
}
