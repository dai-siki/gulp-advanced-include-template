/******************************************************
 *             ----前端工程自动化构建----             *
 *                                                    *
 *      @author dai-siki同学 < 851733175@qq.com >     *
 ******************************************************/

// import package
const $ = require('gulp-load-plugins')(),
	includeTemplate = require('./src/index'),
	gulp = require('gulp');

/** 辅助函数
 -------------------------------------------------------------*/
//错误提示
const _errrHandler = (e) => {
	$.util.beep();
	$.util.log(e);
};

/** 开发
 -------------------------------------------------------------*/

gulp.task('test', function() {
	gulp.src('./demo/src/index.html')
		.pipe($.plumber({
			errorHandler: _errrHandler
		}))
		.pipe(includeTemplate())
		// .pipe($.htmlmin({
		// 	minifyCSS: true,
		// 	minifyJS: true,
		// 	minifyURLs: true,
		// 	removeComments: true,
		// 	removeEmptyAttributes: true,
		// 	collapseInlineTagWhitespace: true,
		// }))
		.pipe(gulp.dest('./demo/dist/'))
});

gulp.task('default', ['test']);
