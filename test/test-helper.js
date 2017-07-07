const options = {};
options.apiKey = process.env.TNKFC_TEST_KEY || 'teste-key';
options.subdomain = process.env.TNKFC_TEST_SUBD || 'webler.test.thinkific.com';

export default options;