# Local installation

Make sure you have the latest Node and NPM.

```bash
# Clone the code
git clone https://github.com/alex-uol/todo-app
cd todo-app
# Install node packages
npm install
# Run local server
npm run server
```

The application should be accessible on http://localhost:9000/

# Demo deployment

Every commit to the main branch is automatically deployed through GitHub Actions. \
The latest app version can be seen here:

http://alex-uol.github.io/agile-todo/

# File structure

`public/` - static files such as HTML and CSS. \
`src/` - JavaScript source code for the application. \
`webpack.config.js` - configuration for the Webpack code bundler and dev web server. \
`babel.config.json` - Configuration for the Babel.js compiler.
