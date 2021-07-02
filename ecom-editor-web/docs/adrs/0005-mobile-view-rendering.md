# 5. Mobile view rendering

Date: 2019-09-30

## Status

Accepted

## Context

- we have introduced "wrapper" components that are responsible for getting device support information
- the goal is that those components are easy to remove and to list all usages (find based on the component)
- components are using the react-responsive MediaQuery package
- it uses the tablet breakpoint from packages/ecom-editor-web/src/uiConfig.js which is set at 769px

## Example

```
import {
  SmallScreenWrapper,
  LargeScreenWrapper
} from '@photobox/ecom-editor-web/src/components/ScreenWrapper/ScreenWrapper';
 
<SmallScreenWrapper>
  <div> some content </div>
</SmallScreenWrapper>
 
<LargeScreenWrapper>
  <div> some content </div>
</LargeScreenWrapper>
```

We also added selectors `isOnSmallScreen` and `isOnLargeScreen` which are based on `windowSize` state. 
windowSize` uses the `redux-windowsize` package

```
import { isOnSmallScreen } from '@photobox/ecom-editor-web/src/redux/device/selectors';
 
export const mapStateToProps = state => ({
  isOnSmallScreen: isOnSmallScreen(state),
});
```
