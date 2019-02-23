import TreeOps from '../index';

describe('basic-selectNew', () => {
  let tree = [
    { id: 0, tri: 6 },
    {
      id: 1,
      parent: 0,
      tri: 4,
      title: 'Title 1',
      childrens: [{
        id: 11,
        parent: 1,
        title: 'Title 1.1',
        tri: 2,
        childrens: [
          {
            id: 111, parent: 11, title: 'Title 1.1.1', tri: 7,
          },
          {
            id: 112,
            parent: 11,
            title: 'Title 1.1.2',
            tri: 1,
            childrens: [
              { id: 1121, parent: 112, title: 'Title 1.1.2.1' },
            ],
          },
          {
            id: 113, parent: 11, title: 'Title 1.1.3', tri: 5,
          },
          {
            id: 114, parent: 11, title: 'Title 1.1.4', tri: 2,
          },
        ],
      },
      {
        id: 12,
        parent: 1,
        title: 'Title 1.2',
        tri: 2,
        childrens: [
          {
            id: 121, parent: 12, title: 'Title 1.2.1', tri: 2,
          },
          {
            id: 122, parent: 12, title: 'Title 1.2.2', tri: 1,
          },
          {
            id: 123, parent: 12, title: 'Title 1.2.3', tri: 4,
          },
        ],
      },
      {
        id: 13, parent: 1, title: 'Title 1.3', tri: 7,
      },
      {
        id: 14, parent: 1, title: 'Title 1.4', tri: 6,
      },
      ],
    },
  ];

  const expected = [
    { id: 0, tri: 6 },
    {
      id: 1,
      tri: 4,
      childrens: [{
        id: 11,
        tri: 2,
        childrens: [
          { id: 111, tri: 7 },
          {
            id: 112,
            tri: 1,
            childrens: [
              { id: 1121, tri: undefined },
            ],
          },
          { id: 113, tri: 5 },
          { id: 114, tri: 2 },
        ],
      },
      {
        id: 12,
        tri: 2,
        childrens: [
          { id: 121, tri: 2 },
          { id: 122, tri: 1 },
          { id: 123, tri: 4 },
        ],
      },
      { id: 13, tri: 7 },
      { id: 14, tri: 6 },
      ],
    },
  ];

  it('toFlatArray', () => {
    tree = TreeOps.selectNew(tree, 'childrens', 'id', 'tri');
    expect(tree).toEqual(expected);
  });
});
