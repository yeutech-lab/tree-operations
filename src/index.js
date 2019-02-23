/* eslint-disable no-restricted-syntax, no-continue, no-param-reassign, no-underscore-dangle */
/**
 * @public
 * @description
 * tree-operations
 */
class TreeOps {}

/**
 * @public
 * @description
 * Find a node in a tree
 *
 * ```js
 * const tree = [{
 *   id: 1,
 *   parent: 0,
 *   title: 'Title 1',
 *   childrens: [{
 *       id: 11,
 *       parent: 1,
 *       title: 'Title 1.1',
 *       childrens: [{
 *           id: 111,
 *           parent: 11,
 *           title: 'Title 1.1.1'
 *         },
 *         {
 *           id: 112,
 *           parent: 11,
 *           title: 'Title 1.1.2',
 *           childrens: [{
 *             id: 1121,
 *             parent: 112,
 *             title: 'Title 1.1.2.1'
 *           }]
 *         },
 *         {
 *           id: 113,
 *           parent: 11,
 *           title: 'Title 1.1.3'
 *         }
 *       ]
 *     },
 *     {
 *       id: 12,
 *       parent: 1,
 *       title: 'Title 1.2',
 *       childrens: [{
 *         id: 121,
 *         parent: 12,
 *         title: 'Title 1.2.1'
 *       }]
 *     },
 *     {
 *       id: 13,
 *       parent: 1,
 *       title: 'Title 1.3'
 *     }
 *   ]
 * }];
 *
 *
 * const node1 = TreeOps.find(
 *   tree,
 *   x => x.id === 1,
 *   (node, parentNode) => node.parent === parentNode.id,
 *   'childrens'
 * );
 *
 * const node13 = TreeOps.find(
 *   tree,
 *   x => x.id === 13,
 *   (node, parentNode) => node.parent === parentNode.id,
 *   'childrens'
 * );
 *
 *
 * const node112 = TreeOps.find(
 *   tree,
 *   x => x.id === 112,
 *   (node, parentNode) => node.parent === parentNode.id,
 *   'childrens'
 * );
 *
 * const parentOf112 = TreeOps.find(
 *   tree,
 *   x => x.childrens && x.childrens.find(y => y.id === 112),
 *   (node, parentNode) => node.parent === parentNode.id,
 *   'childrens'
 * );
 *
 * <pre>
 *     node1:
 *     {JSON.stringify(node1, null, 2)}
 *
 *     node13:
 *     {JSON.stringify(node13, null, 2)}
 *
 *     node112:
 *     {JSON.stringify(node112, null, 2)}
 *
 *     parentOf112:
 *     {JSON.stringify(parentOf112, null, 2)}
 * </pre>
 * ```
 *
 * @param {array} tree - Hierarchical array
 * @param {function} predicateFind - Function with 1 parameter (a node) that returns true if the node matches the search
 * @param {function} predicateChild - Function has 2 parameters (2 array elements) that returns true if they are linked by the parent / child relationship.
 * @param {string} [childrenPropertyName=childs] - Name of new property in each node to store childrens
 * @return {array} A located tree
 */
TreeOps.find = function find(tree, predicateFind, predicateChild, childrenPropertyName = 'childs') {
  if (!tree) { return undefined; }
  let found = tree.find(predicateFind);
  if (found) {
    return found;
  }
  for (const branch of tree) {
    const childrens = branch[childrenPropertyName];
    if (!childrens) { continue; }
    found = this.find(childrens, predicateFind, predicateChild, childrenPropertyName);
    if (found) { return found; }
  }
  return undefined;
};

/**
 * @public
 * @description
 * Create a tree from an array of objects
 *
 * ```js
 * const flatten = [
 *   { id: 1, parent: 0, title: 'Title 1' },
 *   { id: 11, parent: 1, title: 'Title 1.1' },
 *   { id: 111, parent: 11, title: 'Title 1.1.1' },
 *   { id: 112, parent: 11, title: 'Title 1.1.2' },
 *   { id: 113, parent: 11, title: 'Title 1.1.3' },
 *   { id: 1213, parent: 121, title: 'Title 1.2.1.3' },
 *   { id: 12131, parent: 1213, title: 'Title 1.2.1.3.1' },
 *   { id: 12132, parent: 1213, title: 'Title 1.2.1.3.2' },
 *   { id: 2, parent: 0, title: 'Title 2' },
 *   { id: 21, parent: 2, title: 'Title 2.1' },
 *   { id: 12, parent: 1, title: 'Title 1.2' },
 *   { id: 13, parent: 1, title: 'Title 1.3' },
 *   { id: 121, parent: 12, title: 'Title 1.2.1' },
 *   { id: 1211, parent: 121, title: 'Title 1.2.1.1' },
 *   { id: 1212, parent: 121, title: 'Title 1.2.1.2' },
 * ];
 *
 * const tree = TreeOps.fromArray(flatten, (node, parentNode) => node.parent === parentNode.id, 'childrens');
 * // outputs:
 * <pre>{JSON.stringify(tree, null, 2)}</pre>
 * ```
 * @param {array} list - Flat array of objects
 * @param {function} predicateChild - Function has 2 parameters (2 array elements) that returns true
 * if they are linked by the parent / child relationship
 * @param {string} [childrenPropertyName=childs] - Name of new property in each node to store childrens
 * @return {Array} tree - A new tree created from the array
 */
TreeOps.fromArray = function fromArray(list, predicateChild, childrenPropertyName = 'childs') {
  return list.reduce((tree, node) => {
    const parentNode = list.find((parent) => predicateChild(node, parent));
    if (parentNode === undefined) {
      tree.push(node);
    } else {
      if (!parentNode[childrenPropertyName]) {
        parentNode[childrenPropertyName] = [];
      }
      parentNode[childrenPropertyName].push(node);
    }
    return tree;
  }, []);
};

/**
 * @public
 * @description
 * Order the leaves of the tree respecting the structure of the tree
 *
 * ```js
 * const tree = [{
 *   id: 1,
 *   tri: 5,
 *   title: 'Title 1',
 *   childrens: [{
 *       id: 11,
 *       title: 'Title 1.1',
 *       tri: 2,
 *       childrens: [{
 *           id: 111,
 *           title: 'Title 1.1.1'
 *         },
 *         {
 *           id: 112,
 *           title: 'Title 1.1.2',
 *           tri: 1,
 *           childrens: [{
 *             id: 1121,
 *             title: 'Title 1.1.2.1'
 *           }]
 *         },
 *         {
 *           id: 113,
 *           title: 'Title 1.1.3',
 *           tri: 5
 *         },
 *         {
 *           id: 114,
 *           title: 'Title 1.1.4',
 *           tri: 2
 *         }
 *       ]
 *     },
 *     {
 *       id: 12,
 *       title: 'Title 1.2',
 *       tri: 2,
 *       childrens: [{
 *           id: 121,
 *           title: 'Title 1.2.1',
 *           tri: 2
 *         },
 *         {
 *           id: 122,
 *           title: 'Title 1.2.2',
 *           tri: 1
 *         },
 *         {
 *           id: 123,
 *           title: 'Title 1.2.3',
 *           tri: 4
 *         }
 *       ]
 *     },
 *     {
 *       id: 13,
 *       title: 'Title 1.3',
 *       tri: 7
 *     },
 *     {
 *       id: 14,
 *       title: 'Title 1.4',
 *       tri: 6
 *     }
 *   ]
 * }];
 *
 * // order the tree according value of tri
 * <pre>{JSON.stringify(TreeOps.orderBy(tree, (x, y) => (x.tri < y.tri) ? -1 : (x.tri > y.tri) ? 1 : 0, 'childrens'), null, 2)}</pre>
 * ```
 * @param {array} tree - Hierarchical array
 * @param {function} childrenComparaison - Comparaison function of two nodes (function with 2 arguments)
 * @param {string} [childrenPropertyName=childs] - Name of new property in each node to store childrens.
 * @return {array} - The ordered array
 */
TreeOps.orderBy = function orderBy(tree, childrenComparaison, childrenPropertyName = 'childs') {
  if (!tree) { return undefined; }
  for (const branch of tree) {
    const childrens = branch[childrenPropertyName];
    if (!childrens) { continue; }
    branch[childrenPropertyName] = childrens.sort(childrenComparaison);
    branch[childrenPropertyName] = this.orderBy(branch[childrenPropertyName], childrenComparaison, childrenPropertyName);
  }
  return tree;
};

/**
 * @public
 * @description
 * Filters the properties of the nodes of the tree
 *
 * ```js
 * const tree = [{
 *   id: 1,
 *   title: 'Title 1',
 *   childrens: [{
 *       id: 11,
 *       title: 'Title 1.1',
 *       childrens: [{
 *           id: 111,
 *           title: 'Title 1.1.1',
 *         },
 *         {
 *           id: 112,
 *           title: 'Title 1.1.2',
 *           childrens: [{
 *             id: 1121,
 *             title: 'Title 1.1.2.1',
 *           }]
 *         },
 *         {
 *           id: 113,
 *           title: 'Title 1.1.3'
 *         },
 *         {
 *           id: 114,
 *           title: 'Title 1.1.4'
 *         }
 *       ]
 *     },
 *     {
 *       id: 12,
 *       title: 'Title 1.2',
 *       childrens: [{
 *           id: 121,
 *           title: 'Title 1.2.1'
 *         },
 *         {
 *           id: 122,
 *           title: 'Title 1.2.2'
 *         },
 *         {
 *           id: 123,
 *           title: 'Title 1.2.3'
 *         }
 *       ]
 *     },
 *     {
 *       id: 13,
 *       title: 'Title 1.3'
 *     },
 *     {
 *       id: 14,
 *       title: 'Title 1.4'
 *     }
 *   ]
 * }];
 *
 * // select id, tri and children in each node of tree
 * <pre>{JSON.stringify(TreeOps.selectNew(tree, 'childrens', 'id', 'tri'), null, 2)}</pre>
 * ```
 * @param {Array} tree - Hierarchical array
 * @param {string} [childrenPropertyName=childs] - Name of new property in each node to store childrens
 * @param {...string} fieldsNames - list of fields to keep
 * @return {Array} - The filtered tree
 */
TreeOps.selectNew = function selectNew(tree, childrenPropertyName = 'childs', ...fieldsNames) {
  const arr = [];
  for (let i = 0; i < tree.length; i += 1) {
    const item = {};
    for (const f of fieldsNames) {
      item[f] = tree[i][f];
    }
    if (!item[childrenPropertyName] && tree[i][childrenPropertyName]) {
      item[childrenPropertyName] = tree[i][childrenPropertyName];
    }
    if (item[childrenPropertyName] && item[childrenPropertyName].length > 0) {
      item[childrenPropertyName] = this.selectNew(item[childrenPropertyName], childrenPropertyName, ...fieldsNames);
    }
    arr.push(item);
  }
  return arr;
};

/**
 * @public
 * @description
 * Create a flat list from a tree
 *
 * ```js
 * const tree = [
 *   {
 *     title: 'Title 1',
 *     childrens: [{
 *         title: 'Title 1.1',
 *         childrens: [{
 *             title: 'Title 1.1.1'
 *           },
 *           {
 *             title: 'Title 1.1.2',
 *           },
 *           {
 *             title: 'Title 1.1.3',
 *           },
 *         ],
 *       },
 *       {
 *         title: 'Title 1.2',
 *         childrens: [{
 *           title: 'Title 1.2.1',
 *           childrens: [{
 *               title: 'Title 1.2.1.3',
 *               childrens: [{
 *                   title: 'Title 1.2.1.3.1'
 *                 },
 *                 {
 *                   title: 'Title 1.2.1.3.2',
 *                 },
 *               ],
 *             },
 *             {
 *               title: 'Title 1.2.1.1',
 *             },
 *             {
 *               title: 'Title 1.2.1.2',
 *             },
 *           ],
 *         }],
 *       },
 *       {
 *         title: 'Title 1.3',
 *       },
 *     ],
 *   },
 *   {
 *     title: 'Title 2',
 *     childrens: [{
 *       title: 'Title 2.1',
 *     }],
 *   },
 * ];
 *
 * const list = TreeOps.toFlatArray(tree, 'childrens', false);
 * <pre>{JSON.stringify(list, null, 2)}</pre>
 * ```
 *
 * @param {array} tree - Hierarchical array
 * @param {string} [childrenPropertyName=childs] - Name of new property in each node to store childrens.
 * @param {boolean} [reversible=false] - If true, include _id & _parentId to each object of flat array for reversible to tree.
 * @return {Array} - A new flat array
 */
TreeOps.toFlatArray = function toFlatArray(tree, childrenPropertyName = 'childs', reversible) {
  if (reversible !== true) { reversible = false; }
  const stack = (tree && tree.length) ? [{ pointer: tree, offset: 0, ref: null }] : [];
  const flat = [];
  let current = null;
  let i = 1;
  while (stack.length) {
    current = stack.pop();
    current.parentId = (current.node) ? current.node._id : null;
    while (current.offset < current.pointer.length) {
      const node = current.pointer[current.offset];
      if (reversible) {
        node._id = i;
        node._parentId = current.ref;
      }
      const children = node[childrenPropertyName];
      delete node[childrenPropertyName];
      flat.push(node);
      current.offset += 1;
      if (children) {
        stack.push(current);
        current = {
          pointer: children,
          offset: 0,
          node,
          ref: node._id,
        };
      }
      i += 1;
    }
  }
  return flat;
};

/** TreeOps */
export default TreeOps;
