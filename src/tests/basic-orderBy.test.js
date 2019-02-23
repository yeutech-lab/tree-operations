import TreeOps from '../index';

describe('basic-orderBy', () => {
  let tree = [{
    id: 1,
    tri: 5,
    title: 'Title 1',
    childrens: [{
      id: 11,
      title: 'Title 1.1',
      tri: 2,
      childrens: [
        { id: 111, title: 'Title 1.1.1' },
        {
          id: 112,
          title: 'Title 1.1.2',
          tri: 1,
          childrens: [
            { id: 1121, title: 'Title 1.1.2.1' },
          ],
        },
        { id: 113, title: 'Title 1.1.3', tri: 5 },
        { id: 114, title: 'Title 1.1.4', tri: 2 },
      ],
    },
    {
      id: 12,
      title: 'Title 1.2',
      tri: 2,
      childrens: [
        { id: 121, title: 'Title 1.2.1', tri: 2 },
        { id: 122, title: 'Title 1.2.2', tri: 1 },
        { id: 123, title: 'Title 1.2.3', tri: 4 },
      ],
    },
    { id: 13, title: 'Title 1.3', tri: 7 },
    { id: 14, title: 'Title 1.4', tri: 6 },
    ],
  }];

  test('toFlatArray', () => {
    tree = TreeOps.orderBy(
      tree,
      (x, y) => (x.tri < y.tri) ? -1 : (x.tri > y.tri) ? 1 : 0, // eslint-disable-line no-nested-ternary
      'childrens'
    );
    const expected = [{
      id: 1,
      tri: 5,
      title: 'Title 1',
      childrens: [{
        id: 11,
        title: 'Title 1.1',
        tri: 2,
        childrens: [
          { id: 111, title: 'Title 1.1.1' },
          {
            id: 112,
            title: 'Title 1.1.2',
            tri: 1,
            childrens: [
              { id: 1121, title: 'Title 1.1.2.1' },
            ],
          },
          { id: 114, title: 'Title 1.1.4', tri: 2 },
          { id: 113, title: 'Title 1.1.3', tri: 5 },
        ],
      },
      {
        id: 12,
        title: 'Title 1.2',
        tri: 2,
        childrens: [
          { id: 122, title: 'Title 1.2.2', tri: 1 },
          { id: 121, title: 'Title 1.2.1', tri: 2 },
          { id: 123, title: 'Title 1.2.3', tri: 4 },
        ],
      },
      { id: 14, title: 'Title 1.4', tri: 6 },
      { id: 13, title: 'Title 1.3', tri: 7 },
      ],
    }];
    expect(tree).toEqual(expected);
  });
});
