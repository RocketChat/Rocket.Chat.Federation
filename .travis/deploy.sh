echo "registry=http://registry.npmjs.org/"  > ~/.npmrc
echo "//registry.npmjs.org/:_authToken=$NPM_AUTH_TOKEN" >> ~/.npmrc
cd $TRAVIS_BUILD_DIR/matrix.org/hubot-freddie
npm publish
