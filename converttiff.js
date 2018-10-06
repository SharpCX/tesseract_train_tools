var shell = require('shelljs');
var source_dir = '../new'
var build_dir = source_dir+'_build'
shell.cp('-R', source_dir, build_dir)
shell.cd(build_dir)

shell.exec('echo "chi 0 0 0 0 0">font_properties')

train_file_list = [];
shell.ls('*.tiff').forEach(function (tiff_file) {
    learn_file = tiff_file.replace('.tiff', '')
    train_file_list.push(learn_file)
    shell.exec(`tesseract ${tiff_file} ${learn_file} -l chi_sim batch.nochop makebox`)// 生成box文件
});

