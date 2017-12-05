# gulp-advanced-include-template
Easiest way to extend or include html file using gulp.

## example

gulpfile.js
```js
const gulp = require('gulp');
const includeTemplate = require('gulp-advanced-include-template');

gulp.task('test', function() {
	gulp.src('./demo/src/index.html')
		.pipe(includeTemplate())
		// .pipe(htmlmin())
		.pipe(gulp.dest('./demo/dist/'))
});
```

index.html
```html
<t-include src="./layout.html"
	title="gulp-advanced-include-template"
	css="global.css | index.css"
	js="global.js | index.js">

	<div>hello, world!</div>

</t-include>
```

layout.html
```html
<!DOCTYPE html>
<html>
<head>
	<title><%= title %></title>
	<!-- @foreach(css) -->
	<link rel="stylesheet" href="<%= item %>">
	<!-- @endforeach -->
</head>
<body>
	<!-- soft area -->
	<t-soft></t-soft>

	<!-- @foreach(js) -->
	<script src="<%= item %>"></script>
	<!-- @endforeach -->
</body>
</html>
```

index-parsed.html
```html
<html>
<head>
	<title>gulp-advanced-include-template</title>

	<link rel="stylesheet" href="global.css">
	<link rel="stylesheet" href="index.css">
</head>
<body>
	<div>hello, world!</div>

	<script src="global.js"></script>
	<script src="index.js"></script>
</body>
</html>
```
