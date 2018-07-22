# webpack-gulp-boilerplate
A nice and clean front-end boilerplate for projects with multiple html files which supports ES6+ javascript features using gulp and webpack.

[![GitHub issues](https://img.shields.io/github/issues/shalachev/webpack-gulp-boilerplate.svg)](https://github.com/shalachev/webpack-gulp-boilerplate/issues)
[![GitHub forks](https://img.shields.io/github/forks/shalachev/webpack-gulp-boilerplate.svg)](https://github.com/shalachev/webpack-gulp-boilerplate/network)
[![GitHub stars](https://img.shields.io/github/stars/shalachev/webpack-gulp-boilerplate.svg)](https://github.com/shalachev/webpack-gulp-boilerplate/stargazers)
[![GitHub license](https://img.shields.io/github/license/shalachev/webpack-gulp-boilerplate.svg)](https://github.com/shalachev/webpack-gulp-boilerplate/blob/master/LICENSE)

## Installation and Usage
You need to install all the dependencies before start using the boilerplate, for example:

 ```
 $ npm install or yarn
 $ npm run start or yarn start
 ```

###### Gulp Tasks

| Task Name                     | Description
| ----------------------------- | --------------------------------------------------------------------- |
| `npm run start or yarn start` | Starts a development environment which watches for any project changes. |
| `npm run build or yarn build` | Compile all files ready for production. Javascript and CSS are bundled and minified. Images and svg files are minified. |


## File Structure
The working directory for development is `src/`.
Everything inside `dev/` folder is for development purposes only. You should not change anything in `dev/` folder.

```
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── dev
├── config
│   ├── server-config.js
│   ├── gulp-config.js
│   ├── node-env.js
│   └── webpack.config.js
└── src
    ├── images
    ├── js
    ├── sass
    └── home.html
```

### Images
All images should be placed inside the `src/images/` folder. After `npm run build or yarn start` only those images which are located in `src/images/` will be minified.

### JS
All the scripts should be placed inside the `src/js/` folder. Currently `src/js/main.js` is the main javascript file which handles all other modules if there is any. You can split your javascript code in to seperate files. And use ES6 `import and export` features to use them where you need to.

For example:

```
├── src
    └── js
        ├── main.js
        └── ui
            └── module.js
```

### SCSS (SASS)
All `scss` files should be placed in the `src/sass/` folder. Currently `sass/main.scss` is the main `scss` file where all other `scss` files should be be imported.
