var gulp = require("gulp");
var gutil = require("gulp-util");
var eslint = require("gulp-eslint");
var run = require("child_process").spawn;
var webpack = require("webpack");

gulp.task("lint", function () {
    gulp.src(["src/**/*.js"])
        .pipe(eslint({
            rules: {
                "no-underscore-dangle": false
            },
            envs: ["node"]
        }))
        .pipe(eslint.format("stylish"));
});

gulp.task("test", ["webpack:uncompressed"], function (next) {
    run("npm", ["test", "-s"], { stdio: "inherit" }).on("exit", function (err) {
        next(err);
    });
});

gulp.task("webpack:uncompressed", function (next) {
    webpack({
        entry: {
            mulberry: "./src/index"
        },
        output: {
            path: "./dist/",
            filename: "[name].js",
            sourceMapFilename: "[file].js.map",
            libraryTarget: "umd",
            library: "Mulberry"
        },
        plugins: [
            new webpack.optimize.DedupePlugin()
        ],
        node: {
            fs: "empty"
        }
    }, function (err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack", err);
        }

        gutil.log("[webpack]", stats.toString({
            assets: true,
            children: true,
            colors: true,
            hash: false,
            timings: false,
            chunks: false,
            chunkModules: false,
            modules: false
        }));

        next();
    });
});

gulp.task("webpack:minified", function (next) {
    webpack({
        entry: {
            mulberry: "./src/index"
        },
        output: {
            path: "./dist/",
            filename: "[name].min.js",
            libraryTarget: "umd",
            library: "Mulberry"
        },
        plugins: [
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
        ],
        node: {
            fs: "empty"
        }
    }, function (err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack", err);
        }

        gutil.log("[webpack]", stats.toString({
            assets: true,
            children: true,
            colors: true,
            hash: false,
            timings: false,
            chunks: false,
            chunkModules: false,
            modules: false
        }));

        next();
    });
});

gulp.task("webpack", ["webpack:uncompressed", "webpack:minified"])

gulp.task("watch", function () {
    gulp.watch(["src/**/*.js", "spec/**/*.js"], ["lint", "webpack", "test"]);
});
