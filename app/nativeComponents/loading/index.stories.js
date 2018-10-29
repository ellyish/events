import React from "react";
import {storiesOf} from "@storybook/react-native";
import {View, Text} from "react-native";
import Loading from "./index";

storiesOf("Loading", module)
    .addDecorator(story => <View style={{
        flex: 1,
        backgroundColor: "red"
    }}>{story()}</View>)
    .add("without props", () => <Loading/>)
    .add("center blue", () => <Loading position="center" color="blue"/>)
    .add("top blue", () => <Loading position="top" color="blue"/>)
    .add("bottom blue", () => <Loading position="bottom" color="blue"/>)
