import TreeOps from '../index';

describe('basic2', () => {
  const flatten = [
    { id: 1, parent: 0, title: 'Title 1' },
    { id: 11, parent: 1, title: 'Title 1.1' },
    { id: 111, parent: 11, title: 'Title 1.1.1' },
    { id: 112, parent: 11, title: 'Title 1.1.2' },
    { id: 113, parent: 11, title: 'Title 1.1.3' },
  ];
  test('toFlatArray', () => {
    const tree = TreeOps.fromArray(
      flatten,
      (node, parentNode) => node.parent === parentNode.id,
      'childrens'
    );
    expect(tree).toEqual([{
      id: 1,
      parent: 0,
      title: 'Title 1',
      childrens: [{
        id: 11,
        parent: 1,
        title: 'Title 1.1',
        childrens: [{ id: 111, parent: 11, title: 'Title 1.1.1' },
          { id: 112, parent: 11, title: 'Title 1.1.2' },
          { id: 113, parent: 11, title: 'Title 1.1.3' },
        ],
      }],
    }]);
  });
});
