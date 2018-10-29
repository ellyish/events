import React from "react";
import {storiesOf} from "@storybook/react-native";
import {View, Text} from "react-native";
import List from "./index";

storiesOf("List", module)
  .addDecorator(story => <View style={{
    flex: 1
  }}>{story()}</View>)
  .add("without props", () => <List/>)
  .add("with main props", () => <List data={["hi", "by", "ja"]} row={< Row />}/>
  )
  .add("with numColumns props", () => <List numColumns={2}  data={["hi", "by" ,"ja" ]} row={< Row />}/>
  )
// .add("with name props only", () => <List name="ios-hammer"/>)

class Row extends React.Component {
  render() {
    return (
      <Text>{this.props.item}</Text>
    )
  }
}