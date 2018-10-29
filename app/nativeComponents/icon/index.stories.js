import React from "react";
import {storiesOf} from "@storybook/react-native";
import {View} from "react-native";
import Icon from "./index";

storiesOf("Icon", module)
  .addDecorator(story => <View style={{
    flex: 1
  }}>{story()}</View>)
  .add("without props", () => <Icon/>)
  .add("with main props", () => <Icon name="search" font="FontAwesome"/>)
  .add("with name props only", () => <Icon name="ios-hammer"/>)
  .add("with overide defalut name props", () => {
    let props = {
      name: "ios-grid",
      font: "Ionicons"
    }
    return <Icon {...props}/>
  })
