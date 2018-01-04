const { send } = require('micro');
const hasYarn = require('has-yarn');
const execa = require('execa');

module.exports = async (req, res) => {
  const { params: { dependency } } = req;
  try {
    const command = hasYarn() ? 'yarn' : 'npm';
    const argument = hasYarn() ? 'remove' : 'rm';
    const { stdout, kill } = execa(command, [argument, dependency]);
    stdout.pipe(process.stdout);
    send(res, 200, stdout);
    req.on('close', kill);
  } catch (err) {
    send(res, 404, err);
  }
};
