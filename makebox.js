var shell = require('shelljs');
var source_dir = '../new'
shell.cd(source_dir)

train_file_list = [];
shell.ls('*.tiff').forEach(function (tiff_file) {
    learn_file = tiff_file.replace('.tiff', '')
    train_file_list.push(learn_file)
    shell.exec(`tesseract ${tiff_file} ${learn_file} --psm 7 -l chi_sim batch.nochop makebox `)// 生成box文件
});

