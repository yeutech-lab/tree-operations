import TreeOps from '../index';

const flatten = [
  { id: 1, parent: 0, title: 'Title 1' },
  { id: 11, parent: 1, title: 'Title 1.1' },
  { id: 111, parent: 11, title: 'Title 1.1.1' },
  { id: 112, parent: 11, title: 'Title 1.1.2' },
  { id: 113, parent: 11, title: 'Title 1.1.3' },
  { id: 1213, parent: 121, title: 'Title 1.2.1.3' },
  { id: 12131, parent: 1213, title: 'Title 1.2.1.3.1' },
  { id: 12132, parent: 1213, title: 'Title 1.2.1.3.2' },
  { id: 2, parent: 0, title: 'Title 2' },
  { id: 21, parent: 2, title: 'Title 2.1' },
  { id: 12, parent: 1, title: 'Title 1.2' },
  { id: 13, parent: 1, title: 'Title 1.3' },
  { id: 121, parent: 12, title: 'Title 1.2.1' },
  { id: 1211, parent: 121, title: 'Title 1.2.1.1' },
  { id: 1212, parent: 121, title: 'Title 1.2.1.2' },
];

describe('basic', () => {
  it('toFlatArray', () => {
    const tree = TreeOps.fromArray(
      flatten,
      (node, parentNode) => node.parent === parentNode.id,
      'childrens'
    );

    expect(TreeOps.toFlatArray(
      tree,
      'childrens',
      false
    ).sort((x, y) => x.id < y.id ? 1 : -1)).toEqual(flatten.sort((x, y) => x.id < y.id ? 1 : -1));
  });
});
