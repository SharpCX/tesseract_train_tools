var shell = require('shelljs');
var source_dir = '../new'
shell.cd(source_dir)
script_dir = __dirname

train_file_list = [];
shell.ls('*.png').forEach(function (tiff_file) {
    shell.exec(`python ${script_dir}/convertpngtotiff.py ${tiff_file}`)// 生成box文件
});
