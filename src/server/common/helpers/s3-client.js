import { S3Client } from '@aws-sdk/client-s3'
import { fromNodeProviderChain } from '@aws-sdk/credential-providers'
import { config } from '~/src/config/config.js'

const s3Client = new S3Client({
  credentials: fromNodeProviderChain(),
  ...(config.get('isDevelopment') && {
    endpoint: config.get('localstackEndpoint'),
    forcePathStyle: true
  })
})

export { s3Client }
