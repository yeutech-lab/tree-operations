<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## TreeOps

tree-operations

### find

Find a node in a tree

```js
const tree = [{
  id: 1,
  parent: 0,
  title: 'Title 1',
  childrens: [{
      id: 11,
      parent: 1,
      title: 'Title 1.1',
      childrens: [{
          id: 111,
          parent: 11,
          title: 'Title 1.1.1'
        },
        {
          id: 112,
          parent: 11,
          title: 'Title 1.1.2',
          childrens: [{
            id: 1121,
            parent: 112,
            title: 'Title 1.1.2.1'
          }]
        },
        {
          id: 113,
          parent: 11,
          title: 'Title 1.1.3'
        }
      ]
    },
    {
      id: 12,
      parent: 1,
      title: 'Title 1.2',
      childrens: [{
        id: 121,
        parent: 12,
        title: 'Title 1.2.1'
      }]
    },
    {
      id: 13,
      parent: 1,
      title: 'Title 1.3'
    }
  ]
}];


const node1 = TreeOps.find(
  tree,
  x => x.id === 1,
  (node, parentNode) => node.parent === parentNode.id,
  'childrens'
);

const node13 = TreeOps.find(
  tree,
  x => x.id === 13,
  (node, parentNode) => node.parent === parentNode.id,
  'childrens'
);


const node112 = TreeOps.find(
  tree,
  x => x.id === 112,
  (node, parentNode) => node.parent === parentNode.id,
  'childrens'
);

const parentOf112 = TreeOps.find(
  tree,
  x => x.childrens && x.childrens.find(y => y.id === 112),
  (node, parentNode) => node.parent === parentNode.id,
  'childrens'
);

<pre>
    node1:
    {JSON.stringify(node1, null, 2)}

    node13:
    {JSON.stringify(node13, null, 2)}

    node112:
    {JSON.stringify(node112, null, 2)}

    parentOf112:
    {JSON.stringify(parentOf112, null, 2)}
</pre>
```

#### Parameters

-   `tree` **[array][1]** Hierarchical array
-   `predicateFind` **[function][2]** Function with 1 parameter (a node) that returns true if the node matches the search
-   `predicateChild` **[function][2]** Function has 2 parameters (2 array elements) that returns true if they are linked by the parent / child relationship.
-   `childrenPropertyName` **[string][3]** Name of new property in each node to store childrens (optional, default `childs`)

Returns **[array][1]** A located tree

### fromArray

Create a tree from an array of objects

```js
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

const tree = TreeOps.fromArray(flatten, (node, parentNode) => node.parent === parentNode.id, 'childrens');
// outputs:
<pre>{JSON.stringify(tree, null, 2)}</pre>
```

#### Parameters

-   `list` **[array][1]** Flat array of objects
-   `predicateChild` **[function][2]** Function has 2 parameters (2 array elements) that returns true
    if they are linked by the parent / child relationship
-   `childrenPropertyName` **[string][3]** Name of new property in each node to store childrens (optional, default `childs`)

Returns **[Array][1]** tree - A new tree created from the array

### orderBy

Order the leaves of the tree respecting the structure of the tree

```js
const tree = [{
  id: 1,
  tri: 5,
  title: 'Title 1',
  childrens: [{
      id: 11,
      title: 'Title 1.1',
      tri: 2,
      childrens: [{
          id: 111,
          title: 'Title 1.1.1'
        },
        {
          id: 112,
          title: 'Title 1.1.2',
          tri: 1,
          childrens: [{
            id: 1121,
            title: 'Title 1.1.2.1'
          }]
        },
        {
          id: 113,
          title: 'Title 1.1.3',
          tri: 5
        },
        {
          id: 114,
          title: 'Title 1.1.4',
          tri: 2
        }
      ]
    },
    {
      id: 12,
      title: 'Title 1.2',
      tri: 2,
      childrens: [{
          id: 121,
          title: 'Title 1.2.1',
          tri: 2
        },
        {
          id: 122,
          title: 'Title 1.2.2',
          tri: 1
        },
        {
          id: 123,
          title: 'Title 1.2.3',
          tri: 4
        }
      ]
    },
    {
      id: 13,
      title: 'Title 1.3',
      tri: 7
    },
    {
      id: 14,
      title: 'Title 1.4',
      tri: 6
    }
  ]
}];

// order the tree according value of tri
<pre>{JSON.stringify(TreeOps.orderBy(tree, (x, y) => (x.tri < y.tri) ? -1 : (x.tri > y.tri) ? 1 : 0, 'childrens'), null, 2)}</pre>
```

#### Parameters

-   `tree` **[array][1]** Hierarchical array
-   `childrenComparaison` **[function][2]** Comparaison function of two nodes (function with 2 arguments)
-   `childrenPropertyName` **[string][3]** Name of new property in each node to store childrens. (optional, default `childs`)

Returns **[array][1]** The ordered array

### selectNew

Filters the properties of the nodes of the tree

```js
const tree = [{
  id: 1,
  title: 'Title 1',
  childrens: [{
      id: 11,
      title: 'Title 1.1',
      childrens: [{
          id: 111,
          title: 'Title 1.1.1',
        },
        {
          id: 112,
          title: 'Title 1.1.2',
          childrens: [{
            id: 1121,
            title: 'Title 1.1.2.1',
          }]
        },
        {
          id: 113,
          title: 'Title 1.1.3'
        },
        {
          id: 114,
          title: 'Title 1.1.4'
        }
      ]
    },
    {
      id: 12,
      title: 'Title 1.2',
      childrens: [{
          id: 121,
          title: 'Title 1.2.1'
        },
        {
          id: 122,
          title: 'Title 1.2.2'
        },
        {
          id: 123,
          title: 'Title 1.2.3'
        }
      ]
    },
    {
      id: 13,
      title: 'Title 1.3'
    },
    {
      id: 14,
      title: 'Title 1.4'
    }
  ]
}];

// select id, tri and children in each node of tree
<pre>{JSON.stringify(TreeOps.selectNew(tree, 'childrens', 'id', 'tri'), null, 2)}</pre>
```

#### Parameters

-   `tree` **[Array][1]** Hierarchical array
-   `childrenPropertyName` **[string][3]** Name of new property in each node to store childrens (optional, default `childs`)
-   `fieldsNames` **...[string][3]** list of fields to keep

Returns **[Array][1]** The filtered tree

### toFlatArray

Create a flat list from a tree

```js
const tree = [
  {
    title: 'Title 1',
    childrens: [{
        title: 'Title 1.1',
        childrens: [{
            title: 'Title 1.1.1'
          },
          {
            title: 'Title 1.1.2',
          },
          {
            title: 'Title 1.1.3',
          },
        ],
      },
      {
        title: 'Title 1.2',
        childrens: [{
          title: 'Title 1.2.1',
          childrens: [{
              title: 'Title 1.2.1.3',
              childrens: [{
                  title: 'Title 1.2.1.3.1'
                },
                {
                  title: 'Title 1.2.1.3.2',
                },
              ],
            },
            {
              title: 'Title 1.2.1.1',
            },
            {
              title: 'Title 1.2.1.2',
            },
          ],
        }],
      },
      {
        title: 'Title 1.3',
      },
    ],
  },
  {
    title: 'Title 2',
    childrens: [{
      title: 'Title 2.1',
    }],
  },
];

const list = TreeOps.toFlatArray(tree, 'childrens', false);
<pre>{JSON.stringify(list, null, 2)}</pre>
```

#### Parameters

-   `tree` **[array][1]** Hierarchical array
-   `childrenPropertyName` **[string][3]** Name of new property in each node to store childrens. (optional, default `childs`)
-   `reversible` **[boolean][4]** If true, include \_id & \_parentId to each object of flat array for reversible to tree. (optional, default `false`)

Returns **[Array][1]** A new flat array

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[4]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean
