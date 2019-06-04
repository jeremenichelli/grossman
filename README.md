# grossman

[![Build Status](https://travis-ci.org/jeremenichelli/grossman.svg?branch=master)](https://travis-ci.org/jeremenichelli/grossman)

📚 Utility belt to handle transformation matrices in DOM elements

_The name of the library comes from Stanley Grossman, author of Elementary Linear Algebra book._

## Install

Add it to your application using a package manager.

```sh
# npm
npm i grossman --save

# yarn
yarn add grossman
```

You can also drop it in the browser using a script with `https://unpkg.com/grossman` as source.

## `Matrix` class

The library relies on this class to do all transformations and math. You can import it, instantiate a new matrix with the values you want and transform it. 

```js
import { Matrix } from 'grossman'

const matrix = new Matrix()
```

If no specification is passed the consturctor will default to a four by four identity matrix. A representation of the transform matrix from a DOM element with effects applied.

```
[
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1]
]
```

The class expects a four rows and four columns matrix represented through arrays, though it won't error out if you pass a different number of them.

```js
import { Matrix } from 'grossman'

const matrix = new Matrix([
  [ 0.766, 0.642, 0.000, 0.000 ],
  [ 0.642, 0.766, 0.000, 0.000 ],
  [ 0.000, 0.000, 1.000, 0.000 ],
  [ 0.000, 0.000, 0.000, 1.000 ]
])
```

After an instance is created, the class containes methods to apply transformations to it and later obtain the resulting tranform matrix as a string.

### `scaleTo`

Applies a scaling transform to the matrix object

```js
import { Matrix } from 'grossman'

const matrix = new Matrix()
matrix.scaleTo(2, 1.5, 0.5)
```

Where the first argument applies to the _x axis_, the second to the _y axis_, and the third one to the _z axis_. If some of these are not provided `1` will be the default value.

### `translateTo`

Applies a translation transform to the matrix object.

```js
import { Matrix } from 'grossman'

const matrix = new Matrix()
matrix.translateTo(20, 10, -100)
```

Where the first argument applies to the _x axis_, the second to the _y axis_, and the third one to the _z axis_. If some of these are not provided `0` will be the default value.

### `rotateTo`

Applies a rotation transform to the matrix object.

```js
import { Matrix } from 'grossman'

const matrix = new Matrix()
matrix.rotateTo(45)
```

Where the first argument is the amount of degrees to rotate over the _z axis_. If this is not provided `0` will be the default value. For now the library only supports this form of 2D rotation as it's the most used one.

### `toArray`

Returns a representation of the matrix object using arrays.

```js
import { Matrix } from 'grossman'

const matrix = new Matrix()
matrix.rotateTo(40)
matrix.toArray()
```

Returns the resulting matrix as arrays inside arrays.

```
[
  [ 0.766, -0.642, 0.000, 0.000 ],
  [ 0.642, 0.766, 0.000, 0.000 ],
  [ 0.000, 0.000, 1.000, 0.000 ],
  [ 0.000, 0.000, 0.000, 1.000 ]
]
```

### `toString`

Returns the matrix as a 3d transform string for DOM elements.

```js
import { Matrix } from 'grossman'

const matrix = new Matrix()
matrix.rotateTo(40)
matrix.toString()
// matrix3d(0.766044,0.642788,0,0,-0.642788,0.766044,0,0,0,0,1,0,0,0,0,1)
```

The library will treat the matrix string always as a 3d transform, even if it only has 2d transformations applied. This is an opinionated decision and might not be changed or added as a feature.

## getMatrixFromElement

You might want to start from an element's transform matrix instead of creating one.

```js
import { getMatrixFromElement } from 'grossman'

const el = document.querySelector('.example')
const matrix = getMatrixFromElement(el)

// chain transformations
matrix
  .rotateTo(35)
  .scaleTo(1, 2)
  .translateTo(100, 200)

// apply new matrix to element
el.transform.style = matrix.toString()
```

_This is the actual motivation of the project, the easy extraction, incremental transformation and later application of a transformation matrix in a DOM element._

## Contributing

To contribute [Node.js](//nodejs.org) and [yarn](//yarnpkg.com) are required.

Before commit make sure to follow [conventional commits](//www.conventionalcommits.org) specification and check all tests pass by running `yarn test`.

## Disclaimer

**phena** works similar to basic time based tweening utility, but internally it relies on enqueueing callbacks in the paint thread so it's ideal for scheduling animation jobs.

This package is not an animation library and has no intentions to become one, so it won't expose a richful API like other tools out there. For now, it just provides the minimum set of options to iterate over value updates, focusing on animation of DOM elements.
