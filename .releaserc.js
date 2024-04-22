const package = require('./package.json');
const { name, version: previousVersion } = package;
const version = '${nextRelease.version}';
const releaseNotes = '${nextRelease.notes}';

/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
  branches: ['main'],
  tagFormat: 'v${version}',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'CHANGELOG.md'],
        message: `chore(release): Bumping ${name} version ${previousVersion} to version ${version} [skip ci]\n\n${releaseNotes}`,
      },
    ],
  ],
};
