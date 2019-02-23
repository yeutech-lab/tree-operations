import TreeOps from '../index';
import data from './graph.json';
import expected from './expected.json';

describe('test-es6', () => {
  const dataMapped = data.map((x) => ({
    Uid: x.data.Uid || x.data.ShortName || 'Book',
    parentUid: x.data.ParentUid || 'Book',
    data: x.data,
  }));
  dataMapped[0].parentUid = null;
  it('toFlatArray', () => {
    const tree = TreeOps.fromArray(dataMapped, (node, parentNode) => node.parentUid === parentNode.Uid);
    expect(tree).toEqual(expected);
  });
});
