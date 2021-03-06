var assert = require('assert'),
	vfs = require('vinyl-fs'),
	awsLambdaUpload = require('../index'),
	AWSTest = require('./AWS.stub.js');

describe('gulp-aws-lambda-upload', function() {

	it('should throw an error when no parameters are provided', function(done) {
		try {
			var actual = awsLambdaUpload();
			actual.end();
			assert.fail('An exception should be thrown');
		}
		catch (error) {
			done();
		}
	});

	it('should throw an error when no role is provided', function(done) {
		try {
			var actual = awsLambdaUpload({ foo: 'bar' });
			actual.end();
			assert.fail('An exception should be thrown');
		}
		catch (error) {
			done();
		}
	});

	it('should throw an error when no region is provided', function(done) {
		try {
			var actual = awsLambdaUpload({ role: 'arn:partition:service:region:account-id:resource' });
			actual.end();
			assert.fail('An exception should be thrown');
		}
		catch (error) {
			done();
		}
	});

	it('should not throw an error when a role and regions are provided', function(done) {
		vfs.src('./test/lambda.stub.zip')
			.pipe(awsLambdaUpload({
				role: 'arn:partition:service:region:account-id:resource',
				region: 'us-west-2',
				aws:AWSTest,
				description: 'Test description',
				functionName: 'Test',
				handler: 'Test.handler',
				timeout: 42,
				memorySize: 256
		   	}))
			.on('error', assert.fail)
			.on('end', done);
	});
});
