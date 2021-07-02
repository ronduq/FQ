# 4. Removed property/key from object

Date: 2019-09-16

## Status

Accepted

## Context

For performance reasons we should avoid the use of `delete` and instead either recreate the object or use `omit` from ramda.
Although `omit` will be slower than using `delete` it will be faster in the long run, as `delete` stops the browser from optimizing that object.
You can read more about this subject here: https://draft.li/blog/2016/12/22/javascript-engines-hidden-classes/

## Decision

When having to remove a property/key from an object, either re-create the object without the key (spread operator), or use the `omit` function from ramda to remove the property.

## Consequences

Access to objects is faster.
