# 7. Use reselect to derive logic from state

Date: 2019-10-07

## Status

Accepted

## Context

As a data driven application, we rely heavily on selectors to retrieve properties from `state`. 
Often we will need multiple properties to to make a logical decision as to how a certain component behaves.
In these scenarios we should use [reselect](https://github.com/reduxjs/reselect).

## Decision

When having to select multiple properties from `state` to infer a single decision, we should move the logic to a single selector using `reselect`.

## Consequences

* Selectors are a facade API to the redux store, which makes refactoring easier.  
* The logic is moved to the selectors and can be shared across components.    
* Selectors can be memoized, to improve performance on expensive calculations.  

## Example

Where we previously had this piece of logic:

```javascript
const { allows } = selectors.getSelectedAperture(state);
const activeIndex = selectors.getActiveIndex(state);
const isToolboxOpen = selectors.getIsToolboxOpen(state);
if (isToolboxOpen && activeIndex === BROWSER_TABS.PHOTOS && allows === 'image') {
  return;
}
```

We should instead create a selector that combines the 3 selectors being used above and abstract the logic behind a new selector with a clear naming convention to describe what is happening.

```javascript
export const isPhotosToolboxOpenWithImageApertureSelected = createSelector(
  getSelectedAperture,
  getActiveIndex,
  isToolboxOpen,
  ({ allows }, activeIndex, showToolbox) => {
    return showToolbox && activeIndex === BROWSER_TABS.PHOTOS && allows === 'image';
  }
);
```
The initial code then becomes:
```javascript
if (selectors.isPhotosToolboxOpenWithImageApertureSelected(state)) return;
```

## Testing

Testing with reselect is also extremely easy as the library allows us to mock the return values of each selector directly in the function call:

```javascript
expect(selectors.isPhotosToolboxOpenWithImageApertureSelected.resultFunc(
  { allows: 'image' },
  1,
  true
)).toBeFalsy();
```
