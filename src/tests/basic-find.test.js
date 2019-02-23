import TreeOps from '../index';

describe('basic-find', () => {
  const tree = [{
    id: 1,
    parent: 0,
    title: 'Title 1',
    childrens: [{
      id: 11,
      parent: 1,
      title: 'Title 1.1',
      childrens: [
        { id: 111, parent: 11, title: 'Title 1.1.1' },
        {
          id: 112,
          parent: 11,
          title: 'Title 1.1.2',
          childrens: [
            { id: 1121, parent: 112, title: 'Title 1.1.2.1' },
          ],
        },
        { id: 113, parent: 11, title: 'Title 1.1.3' },
      ],
    },
    {
      id: 12,
      parent: 1,
      title: 'Title 1.2',
      childrens: [
        { id: 121, parent: 12, title: 'Title 1.2.1' },
      ],
    },
    { id: 13, parent: 1, title: 'Title 1.3' },
    ],
  }];

  it('parentOf112', () => {
    const parentOf112 = TreeOps.find(
      tree,
      (x) => x.childrens && x.childrens.find((y) => y.id === 112),
      (node, parentNode) => node.parent === parentNode.id,
      'childrens',
    );
    expect(parentOf112).toEqual({
      id: 11,
      parent: 1,
      title: 'Title 1.1',
      childrens: [
        { id: 111, parent: 11, title: 'Title 1.1.1' },
        {
          id: 112,
          parent: 11,
          title: 'Title 1.1.2',
          childrens: [
            { id: 1121, parent: 112, title: 'Title 1.1.2.1' },
          ],
        },
        { id: 113, parent: 11, title: 'Title 1.1.3' },
      ],
    });
  });

  it('node1', () => {
    const node1 = TreeOps.find(
      tree,
      (x) => x.id === 1,
      (node, parentNode) => node.parent === parentNode.id,
      'childrens',
    );
    expect(node1).toEqual(tree[0]);
  });

  it('node13', () => {
    const node13 = TreeOps.find(
      tree,
      (x) => x.id === 13,
      (node, parentNode) => node.parent === parentNode.id,
      'childrens',
    );
    expect(node13).toEqual({ id: 13, parent: 1, title: 'Title 1.3' });
  });

  it('node112', () => {
    const node112 = TreeOps.find(
      tree,
      (x) => x.id === 112,
      (node, parentNode) => node.parent === parentNode.id,
      'childrens'
    );
    expect(node112).toEqual({
      id: 112,
      parent: 11,
      title: 'Title 1.1.2',
      childrens: [
        { id: 1121, parent: 112, title: 'Title 1.1.2.1' },
      ],
    });
  });
});
