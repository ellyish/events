import React from "react";
import {storiesOf} from "@storybook/react-native";
import {View} from "react-native";
import Image from "./index";

storiesOf("Image", module)
  .addDecorator(story => <View style={{
    flex: 1,
    backgroundColor: "red"
  }}>{story()}</View>)
  .add("without props", () => <Image/>)
  .add("with background style green no image", () => (<Image style={{
    backgroundColor: "green"
  }}/>))
  .add("with background style green flex:0.5 no image", () => (<Image style={{
    flex: 0.5,
    backgroundColor: "green"
  }}/>))
  .add("with background style green flex:0.5 image", () => (<Image
    source={{
    uri: "http://eskipaper.com/images/image-2.jpg"
  }}
    style={{
    flex: 0.5,
    backgroundColor: "green"
  }}/>))
  .add("with background style green flex:0.5 no image placeholeder", () => (<Image
    placeholder={require("./placeHolder.png")}
    source={{
    uri: "https://amazingslider.com/wp-content/uploads/2012/12/dandelion.jpg"
  }}
    style={{
    flex: 0.5,
    backgroundColor: "green"
  }}/>))
  .add("with background style green flex:0.5 image placeholeder", () => (<Image
    placeholder={require("./placeHolder.png")}
    source={{
    uri: "https://amazingslider.com/wp-content/uploads/2012/12/dandelion.jpg"
  }}
    style={{
    flex: 0.5,
    backgroundColor: "green"
  }}/>))
  .add("with background style green flex:0.5 image placeholeder 10sec", () => (<Image
    delay={10000}
    placeholder={require("./placeHolder.png")}
    source={{
    uri: "https://amazingslider.com/wp-content/uploads/2012/12/dandelion.jpg"
  }}
    style={{
    flex: 0.5,
    backgroundColor: "green"
  }}/>))
