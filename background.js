const isDev = 0

let apiURL = 'https://twverd.now.sh'

if (isDev) {
  apiURL = 'http://localhost:3000'
}

chrome.webRequest.onBeforeRequest.addListener(
  details => {
    let url

    try {
      url = new URL(details.url)
    } catch (e) {
      return
    }

    const pattern = /video-edge-[\w]+\.([\w]+)\.abs\.hls\.ttvnw\.net/i

    if (pattern.test(url.hostname)) {
      const redirectUrl = apiURL + '/api/rp-stream/' + encodeURIComponent(details.url)

      console.log('[twverd] redirecting to ' + redirectUrl)

      return {
        redirectUrl
      }
    }
  },
  {
    urls: [
      '<all_urls>'
    ],
    types: [
      'main_frame',
      'sub_frame',
      'xmlhttprequest',
      'other'
    ]
  },
  [
    'blocking'
  ]
)
