const debug = require('debug')('api:s3')
import AWS from 'aws-sdk'

const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION,
	params: {}
})

const buildParams = ({ Body, Key, Bucket }) => {
	return {
		Bucket,
		Body,
		Key,
		ACL: 'public-read'
	}
}

export const uploadFile = (payload, albumName) => {
	const params = buildParams(payload)
	return new Promise((resolve, reject) => {
		debug('payload %O', payload)
		s3.putObject(params, (err, data) => {
			if (err) {
				console.error(err)
				reject(err)
			}

			resolve({
				url: `https://s3-${process.env.AWS_REGION}.amazonaws.com/${
					process.env.AWS_S3_BUCKET
				}/tracks/${albumName}/${params.Key}`
			})
		})
	})
}
