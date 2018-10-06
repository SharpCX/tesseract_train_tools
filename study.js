var shell = require('shelljs');
var source_dir = '../new'
var build_dir = source_dir+'_build'
shell.rm('-rf', build_dir)
shell.cp('-R', source_dir, build_dir)
shell.cd(build_dir)

shell.exec('echo "chi 0 0 0 0 0">font_properties')

train_file_list = [];
shell.ls('*.tiff').forEach(function (tiff_file) {
    learn_file = tiff_file.replace('.tiff', '')
    train_file_list.push(learn_file)
    shell.exec(`tesseract ${tiff_file} ${learn_file}.box -l chi_sim nobatch box.train.stderr`) //生成tr文件 
});

box_str = train_file_list.join('.box ') + ".box"
shell.exec(`unicharset_extractor ${box_str}`)

box_tr_str = train_file_list.join('.box.tr ') + ".box.tr"
shell.exec(`mftraining -F font_properties -U unicharset -O chi.unicharset ${box_tr_str}`)
shell.exec(`cntraining ${box_tr_str}`)
shell.exec(`mv inttemp chi.inttemp`)
shell.exec(`mv pffmtable chi.pffmtable`)
shell.exec(`mv normproto chi.normproto`)
shell.exec(`mv shapetable chi.shapetable`)

shell.exec(`combine_tessdata chi.`)
// shell.exec(`mv chi.traineddata /usr/share/tesseract-ocr/tessdata/`)
shell.exec(`mv chi.traineddata /usr/local/Cellar/tesseract/3.05.02/share/tessdata/`)
