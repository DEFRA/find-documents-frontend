import { basicUploadFormController } from '~/src/server/basic-upload/controllers/basic-upload-form.js'
import { baseUploadCompleteController } from '~/src/server/basic-upload/controllers/basic-upload-complete.js'
import { listBucketController } from '~/src/server/basic-upload/controllers/list-bucket.js'

const basicUpload = {
  plugin: {
    name: 'basic',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/basic',
          ...basicUploadFormController
        },
        {
          method: 'GET',
          path: '/basic/complete',
          ...baseUploadCompleteController
        },
        {
          method: 'POST',
          path: '/basic/list',
          ...listBucketController
        }
      ])
    }
  }
}

export { basicUpload }
