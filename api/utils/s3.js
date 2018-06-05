import AWS from 'aws-sdk'

const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	params: {}
})

const buildParams = buffer => {
	return {
		Bucket: process.env.AWS_S3_BUCKET,
		Body: buffer
	}
}

export const uploadFile = buffer => {
	const params = buildParams(buffer)
	console.log('PARAMS', params)
	return new Promise((resolve, reject) => {
		s3.putObject(params, (err, data) => {
			if (err) {
				console.error(err)
			}

			console.log('data', data)
		})
	})
}
