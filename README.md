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

- `npm run start or yarn start` Starts the development environment which watches for any project changes.
- `npm run build or yarn build` Compiles all files ready for production. Javascript and CSS are bundled and minified. Images and svg files are also minified.


## File Structure
The development directory is `src/`.
You should not change anything in `dev/` or `build/` folders if you want to make a change start the project and work in `src/` folder.

```
├─ node_modules
├─ build
├─ dev
├─ tools
│ ├─ gulpfile.babel.js
│ │ ├─ tasks
│ │ ├─ utils
│ │ └─ index.js
│ ├─ browsersync.js
│ ├─ env.js
│ └─ webpack.config.js
├─ src
│ ├─ js
│ ├─ partials
│ ├─ recources
│ ├─ sass
│ └─ home.html
├─ .babelrc
├─ package.json
├─ .gitignore
└─ README.md
```

## Partials
Partials can be used to split your html into components.
All partials are located in `src/partials` folder.
After you create your partial lets say `header.html` then all you need to do is include it by following this syntax `@@include('header.html')`.
By default the main folder of the includes is `src/partials`.
You can create sub folders for example - `src/partials/sub-folder` and then use it by specifying the sub folder in the include `@@include('sub-folder/example.html')`

## JS
All the scripts should be placed inside the `src/js/` folder. Currently `src/js/main.js` is the main javascript file which handles all other modules if there is any. You can split your javascript code in to seperate files.

For example:

```
├── src
  └── js
    ├── main.js
    └── ui
      └── module.js
```

## SCSS (SASS)
All `scss` files should be placed in the `src/sass/` folder. Currently `sass/main.scss` is the main `scss` file where all other `scss` files should be be imported.
