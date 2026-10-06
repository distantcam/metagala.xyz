module.exports = ({ env }) => ({
  plugins: {
		'@tailwindcss/postcss': {},
		'postcss-nested': {},
		cssnano: env === 'production' ? { 
			preset: [ 'default', { discardComments: { removeAll: true } } ]
		} : false
  }
})
