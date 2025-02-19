import { s3Client } from '~/src/server/common/helpers/s3-client.js'
import { HeadObjectCommand } from '@aws-sdk/client-s3'
import { log } from 'console'

const baseUploadCompleteController = {
  options: {},
  handler: async (request, h) => {
    const { statusUrl } = request.yar.get('basic-upload')

    log('Checking status of upload at', statusUrl)

    const response = await fetch(`${statusUrl}?debug=true`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    const status = await response.json()
    log('Status:', statusUrl, status)

    if (status.uploadStatus !== 'ready') {
      return h.view('basic-upload/views/basic-upload-wait', {
        pageTitle: 'Virus check',
        heading: 'Scanning your files',
        status: JSON.stringify(status, null, 2)
      })
    }

    if (!status.form.basicfile) {
      request.yar.flash('basic-upload', {
        formErrors: { basicfile: { message: 'Select a file' } }
      })
      return h.redirect('/basic')
    }

    if (status.form.basicfile?.hasError === true) {
      request.yar.flash('basic-upload', {
        formErrors: {
          basicfile: { message: status.form.basicfile.errorMessage }
        }
      })
      return h.redirect('/basic')
    }

    const s3Key = status.form.basicfile.s3Key
    const s3Bucket = status.form.basicfile.s3Bucket

    const metadata = await s3Client.send(
      new HeadObjectCommand({
        Bucket: s3Bucket,
        Key: s3Key
      })
    )

    return h.view('basic-upload/views/basic-upload-complete', {
      heading: 'Basic upload example',
      metadata: JSON.stringify(metadata, null, 2)
    })
  }
}

export { baseUploadCompleteController }
