import TreeOps from '../index';

describe('basic3', () => {
  const tree = [{
    title: 'Title 1',
    childrens: [{
      title: '1.1',
      childrens: [{ title: 'Title 1.1.1' },
        { title: 'Title 1.1.2' },
        { title: 'Title 1.1.3' },
      ],
    },
    {
      title: 'Title 1.2',
      childrens: [{
        title: 'Title 1.2.1',
        childrens: [{
          title: 'Title 1.2.1.3',
          childrens: [{
            title: 'Title 1.2.1.3.1',
          },
          { title: 'Title 1.2.1.3.2' },
          ],
        },
        { title: 'Title 1.2.1.1' },
        { title: 'Title 1.2.1.2' },
        ],
      }],
    },
    { title: 'Title 1.3' },
    ],
  },
  {
    title: 'Title 2',
    childrens: [{ title: 'Title 2.1' }],
  },
  ];

  it('toFlatArray', () => {
    const list = TreeOps.toFlatArray(
      tree,
      'childrens',
      false
    );
    expect(list).toEqual([
      { title: 'Title 1' },
      { title: '1.1' },
      { title: 'Title 1.1.1' },
      { title: 'Title 1.1.2' },
      { title: 'Title 1.1.3' },
      { title: 'Title 1.2' },
      { title: 'Title 1.2.1' },
      { title: 'Title 1.2.1.3' },
      { title: 'Title 1.2.1.3.1' },
      { title: 'Title 1.2.1.3.2' },
      { title: 'Title 1.2.1.1' },
      { title: 'Title 1.2.1.2' },
      { title: 'Title 1.3' },
      { title: 'Title 2' },
      { title: 'Title 2.1' },
    ]);
  });
});
