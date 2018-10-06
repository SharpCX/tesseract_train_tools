var shell = require('shelljs');
var path = require('path');

var source_dir = '../origin'
var dist_dir = '../sharped'
script_dir = __dirname
pyscript = path.join(script_dir, 'ehance.py')

shell.rm('-rf', dist_dir)
shell.cd(source_dir)
shell.mkdir(dist_dir)

shell.ls('*.tiff').forEach(function (tiff_file) {
    console.log(tiff_file)
    shell.exec(`python  ${pyscript} ${tiff_file}`)
    shell.mv(`sharped${tiff_file}`, dist_dir+'/'+tiff_file)
});

// shell.exec('echo "chi 0 0 0 0 0">font_properties')