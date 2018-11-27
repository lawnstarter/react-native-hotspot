# react-native-hotspot

[![npm version](https://badge.fury.io/js/react-native-hotspot.svg)](https://badge.fury.io/js/react-native-hotspot)

A React Native component that displays hotspots over desired components to help lead your users through an onboarding flow or direct them towards new UI elements

<!-- ![iOS Example](./example/ios-example.gif) -->

[Examples](https://github.com/lawnstarter/react-native-hotspot/tree/master/example)

<!-- [Run example](https://snack.expo.io/@lfkwtz/react-native-hotspot) -->

## Getting Started

### Installing

`npm install react-native-hotspot`

### Using

```js
import { RNHotspot, RNHotspotHelper } from "react-native-hotspot";

// in your screen's constructor, use the helper with an array of onPress actions you want your hotspots to trigger
this.componentRefs = RNHotspotHelper([
    () => {
        Alert.alert(null, "This button does this thing.");
    },
    () => {
        Alert.alert(null, "This button does other thing.");
    }
]);

// drop the component below the outer wrapping parent of your screen
<RNHotspot componentRefs={this.componentRefs} />


// expose the refs in the same order as the array definied above
<Button
    title="Button #1"
    onPress={() => {}}
    ref={this.componentRefs[0].ref}
/>
<Button
    title="Button #2"
    onPress={() => {}}
    ref={this.componentRefs[1].ref}
/>
```

## Testing

This component has been tested on React Native v0.57

## License

react-native-hotspot is [MIT licensed](https://github.com/lawnstarter/react-native-hotspot/tree/master/LICENSE)
