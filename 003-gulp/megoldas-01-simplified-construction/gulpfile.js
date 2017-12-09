const gulp = require('gulp');
const {Writable} = require('stream');

function valamiSajatCucc() {
    return new Writable({
	objectMode: true,
	write(chunk, encoding, callback) {
	    console.log(chunk);
	    callback();
	},
    });
}

gulp.task('default', () => {
    gulp.src('*.ts')
	.pipe(valamiSajatCucc())
});
