const fs = require('fs')
const { exec } = require('child_process')

function e(cmd, options = {}) {
  return new Promise((resolve, reject) => {
    exec(cmd, options, (err, stdout, stderr) => {
      const commonStd = {
        cmd,
        p: options.cwd || './',
      }
      if (err) {
        const r = { ...commonStd, stderr }
        reject(r)
        return
      }
      resolve({
        ...commonStd,
        stdout,
      })
    })
  })
}

const dir = process.argv[2]
if (dir) {
  fs.stat(`./${dir}`, function(err, stats) {
    if (err) {
      return console.error(err)
    }
    if (stats.isDirectory()) {
      e('rm -rf /etc/nginx/conf.d/*')
        .then(() => e(`cp ./${dir} /etc/nginx/conf.d/`))
    }
  })
}
