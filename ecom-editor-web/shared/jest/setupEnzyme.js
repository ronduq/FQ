const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
require('jest-chain');

Enzyme.configure({ adapter: new Adapter() });

global.beforeEach(() => {
  expect.hasAssertions();
});
