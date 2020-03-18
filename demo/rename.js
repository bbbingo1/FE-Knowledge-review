var fs = require('fs');
var PATH = './video' // 目录

// 遍历目录
function walk(path, callback) {
    var files = fs.readdirSync(path);

    files.forEach(function (file) {
        if (fs.statSync(path + '/' + file).isFile()) {
            callback(path, file);
        }
    })
}

// 修改文件名称
function rename(oblval, newval) {
    fs.rename(oblval, newval, function (err) {
        if (err) {
            throw err;
        }
    });
}

// 运行
walk(PATH, function (path, fileName) {
    var oldPath = path + '/' + fileName, // 源文件路径
        // newPath = path + '/'+ fileName.replace(/([^\s]*)( - )([^\s.]*)(.\S*$)/, '$3$2$1$4'); // 新路径
        newPath = path + '/'+ fileName.replace(/^\D{7}/, ''); // 新路径
    rename(oldPath, newPath);
});