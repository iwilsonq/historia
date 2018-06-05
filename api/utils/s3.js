import AWS from 'aws-sdk'

const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	params: {}
})

const buildParams = ({ Body, Key }) => {
	return {
		Bucket: process.env.AWS_S3_BUCKET,
		Body,
		Key,
		ACL: 'public-read'
	}
}

export const uploadFile = payload => {
	const params = buildParams(payload)
	return new Promise((resolve, reject) => {
		s3.putObject(params, (err, data) => {
			if (err) {
				console.error(err)
				reject(err)
			}

			resolve({
				url: `https://s3-us-west-1.amazonaws.com/${process.env.AWS_S3_BUCKET}/${params.Key}`
			})
		})
	})
}
