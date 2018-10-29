import React from "react";
import {storiesOf} from "@storybook/react-native";
import {View, Text} from "react-native";
import Messages from "./index";

storiesOf("Messages", module)
    .addDecorator(story => <View style={{
        flex: 1,
        backgroundColor: "red"
    }}>{story()}</View>)
    .add("without props", () => <Messages/>)
    .add("with main props", () => <Messages message={"Hiiii"}/>)
    .add("with dragable", () => <Messages
        message={"Hiiii"}
        isDragable
        onRefresh={() => {
        // console.log("test")
    }}/>)
    .add("with dragable top", () => <Messages
        message={"Hiiii"}
        isDragable
        position="top"
        onRefresh={() => {
        // console.log("test")
    }}/>)
    .add("with dragable bottom", () => <Messages
        message={"Hiiii"}
        isDragable
        position="bottom"
        onRefresh={() => {
        // console.log("test")
    }}/>)