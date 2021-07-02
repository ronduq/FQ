# 6. Mobile touch events

Date: 2019-09-30

## Status

Accepted

## Approach

We have chosen HammerJS as our touch events library as it fulfils more of our needs than React Touch. It has a wider coverage of gestures so we would not need
to use the custom gestures to create our own. It also has fewer dependencies on third party libraries than react-touch and is more active in the community.

- https://github.com/JedWatson/react-hammerjs
- https://github.com/hammerjs/hammer.js

## Consequences

Some learnings we have discovered when implementing touch events within the codebase are that when wrapping a component within the react touch hoc,
you should keep it as contained as possible to avoid conflicts with existing event handlers within nested children.

```
import Hammer from 'react-hammerjs';
 
<Hammer onSwipe={swipeAction}>
  <div> content </div>
</Hammer>
```
