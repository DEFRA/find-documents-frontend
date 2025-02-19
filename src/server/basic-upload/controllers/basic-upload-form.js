import { log } from 'console'
import { config } from '~/src/config/config.js'

const basicUploadFormController = {
  options: {},
  handler: async (request, h) => {
    request.yar.clear('basic-upload')

    const endpointUrl = config.get('cdpUploaderUrl') + '/initiate'

    log('Initiating upload to CDP-Uploader at', endpointUrl)

    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // callback: '/basic/list',
        redirect: '/basic/complete',
        s3Bucket: config.get('bucket')
      })
    })

    const upload = await response.json()
    request.yar.set('basic-upload', { statusUrl: upload.statusUrl })

    return h.view('basic-upload/views/basic-upload-form', {
      pageTitle: 'Basic CDP-Uploader example',
      action: upload.uploadUrl,
      heading: 'Basic upload example'
    })
  }
}

export { basicUploadFormController }
