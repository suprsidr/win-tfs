var fs = require('fs'),
  path = require('path'),
  spawn = require('child_process').spawn,
  msg = {
    'cmd': {
      'startCommand': 'Start cmd command',
      'noCommand': 'Missing cmd command',
      'stdout': 'Interpreter Output ',
      'stderr': 'Interpreter Error: ',
      'exitCode': 'Child process exited with code # '
    }
  },
  cmd = function(exe, arg, obj) {
    var mymsg = '';
    var myerrmsg = '';
    if (!exe) {
      return msg.cmd.noCommand;
    }
    ps = spawn(exe, arg, obj);
    ps.stdout.setEncoding('utf8');
    ps.stdout.on('data', function(data) {
      mymsg += data + '\n';
    });
    ps.stdout.on('end', function() {
      if (!!mymsg) {
        console.log('\n<-- ' + arg[0] + ' -->\n\n' + mymsg);
      }
    });
    ps.stderr.setEncoding('utf8');
    ps.stderr.on('data', function(data) {
      myerrmsg += data + '\n';
    });
    ps.stderr.on('end', function() {
      if (!!myerrmsg) {
        console.log(myerrmsg);
      }
    });
    ps.on('close', function(code, signal) {
      var out = '';
      out += msg.cmd.exitCode + (code || '');
      if (signal != null) {
        out += '\n' + 'Child process terminated due to receipt of signal ' + signal;
      }
      //console.log(out);
    });
  },
  tfCmd = function(exe, command, paths, params) {
    var pathsTest = Object.prototype.toString.call(paths),
      exists,
      arr = [],
      filepaths = '',
      log = command + ' files:\n';
    if (pathsTest == '[object String]') {
      paths = paths.indexOf(',') !== -1 ? paths.split(',') : [paths];
    } else if (pathsTest != '[object Array]') {
      throw new TypeError('paths paramter must be a string or an array');
    }
    arr.concat(params);
    arr.unshift(command);
    for (var i = 0, len = paths.length; i < len; i++) {
      arr.push(fs.realpathSync(paths[i]));
    }
    cmd(exe, arr, {
      stdio: 'pipe'
    });
    log += paths.join('\n');
    console.log(log);
  },
  findVisualStudioPath = function() {
    var wd;
    for (var ver in paths) {
      if (paths.hasOwnProperty(ver)) {
        for (var dirPath in paths[ver]) {
          if (paths[ver].hasOwnProperty(dirPath)) {
            if (fs.existsSync(paths[ver][dirPath]) && fs.existsSync(path.join(paths[ver][dirPath], 'tf.exe'))) {
              wd = paths[ver][dirPath];
            }
          }
        }
      }
    }
    return wd;
  },
  paths = {
    vs2008: {
      'bit32': 'C:/Program Files/Microsoft Visual Studio 9.0/Common7/IDE/',
      'bit64': 'C:/Program Files (x86)/Microsoft Visual Studio 9.0/Common7/IDE/'
    },
    vs2010: {
      'bit32': 'C:/Program Files/Microsoft Visual Studio 10.0/Common7/IDE/',
      'bit64': 'C:/Program Files (x86)/Microsoft Visual Studio 10.0/Common7/IDE/'
    },
    vs2012: {
      'bit32': 'C:/Program Files/Microsoft Visual Studio 11.0/Common7/IDE/',
      'bit64': 'C:/Program Files (x86)/Microsoft Visual Studio 11.0/Common7/IDE/'
    },
    vs2013: {
      'bit32': 'C:/Program Files/Microsoft Visual Studio 12.0/Common7/IDE/',
      'bit64': 'C:/Program Files (x86)/Microsoft Visual Studio 12.0/Common7/IDE/'
    },
    vs2015: {
      'bit32': 'C:/Program Files/Microsoft Visual Studio 14.0/Common7/IDE/',
      'bit64': 'C:/Program Files (x86)/Microsoft Visual Studio 14.0/Common7/IDE/'
    }
  };

exports.findVisualStudioPath = findVisualStudioPath;

exports.get = function(exe, paths, params) {
  return tfCmd(exe, 'get', paths, params);
};

exports.add = function(exe, paths, params) {
  return tfCmd(exe, paths, 'add', params);
};

exports.delete = function(exe, paths, params) {
  return tfCmd(exe, 'delete', paths, params);
};

exports.undelete = function(exe, paths, params) {
  return tfCmd(exe, 'undelete', paths, params);
};

exports.checkout = function(exe, paths, params) {
  return tfCmd(exe, 'checkout', paths, params);
};

exports.checkin = function(exe, paths, params) {
  return tfCmd(exe, 'checkin', paths, params);
};

exports.undo = function(exe, paths, params) {
  return tfCmd(exe, 'undo', paths, params);
};

exports.rollback = function(exe, paths, params) {
  return tfCmd(exe, 'rollback', paths, params);
};

exports.history = function(exe, paths, params) {
  return tfCmd(exe, 'history', paths, params);
};

exports.workflod = function(exe, paths, params) {
  return tfCmd(exe, 'worflod', paths, params);
};
