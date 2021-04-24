# rational-index

Implements the rational index spec, which allows for efficient implementation
of re-orderable lists in an indexed store.  Key principles are:

* Insertion anywhere in the list does not modify other elements.
* Thus, moving an item within a list also does not modify other elements.
* Ordering values are lexicographically comparable variable-length strings.
* No rebalancing is required - ordering values are kept as short as possible.

Non-goals are:

* Predictable values - only relative ordering is guaranteed
* Concurrent insert safety - preventing duplicate values requires serialization
* Infinite scalability - while this library should easily handle 100k items,
  the design has not yet been rigorously vetted for scale.
* Full service solution - this is a building block for ordered lists, not a
  fully realized implementation.

# Installation

This (will be) an npm package.  So, the standard `npm install` or `yarn add`
invocations should apply.  TODO(#16): update this section when I publish.
# Usage

WARNING: This package is currently under development and I'm not sure I love
the current API.  Until I commit to a 1.0 major version, the API may change at
will.  That said, it's effectively a single function package at present so
migration should be pretty straightforward.

```javascript

import { Positioner, LIST_HEAD, LIST_TAIL } from '@altmeta.org/positioner';

const positioner = new Positioner();

// Create a first entry
const [first] = positioner.insert(LIST_HEAD, LIST_TAIL);

// Insert before the first entry
const [zeroth] = positioner.insert(LIST_HEAD, first);

// Insert three items after the first
const [second, third, fourth] = positioner.insert(first, LIST_TAIL, 3);

// Insert between first and second
const [three_halves_th] = positioner.insert(first, second);
```


