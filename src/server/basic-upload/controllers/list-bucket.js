import { s3Client } from '~/src/server/common/helpers/s3-client.js'
import { ListObjectsV2Command } from '@aws-sdk/client-s3'
import { config } from '~/src/config/config.js'
import { log } from 'console'

const listBucketController = {
  options: {},
  handler: async (request, h) => {
    const command = new ListObjectsV2Command({ Bucket: config.get('bucket') })
    const response = await s3Client.send(command)
    const objects = response.Contents.map((object) => object.Key)
    log('Objects:', response)

    return h.response(objects).code(200)
  }
}

export { listBucketController }
