self.addEventListener('install', function (evt) {
  // waitUtil 保证里面的代码在安装前执行完
  evt.waitUtil(
    // 将资源缓存在 v1 的 Caches 里面
    caches.open('v1').then((cache) => {
      // 缓存所有需要的静态资源
      return cache.addAll([
        '/',
        '/browser/serviceworker/assetsImg/button_1.png',
        '/browser/serviceworker/assetsImg/button_2.png'
      ])
    })
  )
})

self.addEventListener('fetch', function (evt) {
  // 在发起请求时候会触发fetch事件
  evt.respondWith(
    caches.match(evt.request).then(function (response) {
      // 如果 sw 已经保存了请求的响应，直接返回响应，减少http请求
      if (response !== undefined) {
        return response
      }
      // 不存在需要发起请求
      return fetch(evt.request).then((httpRes) => {
        if (!httpRes || httpRes !== 200) {
          // 请求出错则直接返回错误信息
          return httpRes
        }
        // 将响应复制一份
        const httpResClone = httpRes.clone()
        // 并且保存到安装时候的缓存对象里
        caches.open('v1').then((cache) => {
          cache.put(evt.request, httpResClone)
        })
        return httpRes
      })
    })
  )
})
