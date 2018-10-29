import React from "react";
import { storiesOf } from "@storybook/react-native";
import { View, Text } from "react-native";
import SliderImages from "./index";
const images = [
	"http://eskipaper.com/images/image-2.jpg",
	"http://www.snf.ch/SiteCollectionImages/ImageCompetition/33951030105_d6ad870441_k.jpg",
	"https://static.pexels.com/photos/248797/pexels-photo-248797.jpeg",
	"https://imagejournal.org/wp-content/uploads/bb-plugin/cache/23466317216_b99485ba14_o-panorama.jpg",
	"http://www.kinyu-z.net/data/wallpapers/73/956652.jpg",
	"http://globalmedicalco.com/photos/globalmedicalco/27/134596.jpg"
];
storiesOf("SliderImages", module)
	.addDecorator((story) => <View style={{ flex: 1, backgroundColor: "green" }}>{story()}</View>)
	.add("without props", () => <SliderImages />)
	.add("with main props", () => (
		<SliderImages items={images} style={{ flex: 0.5, backgroundColor: "red" }} />
	))
	.add("with image viewer", () => (
		<SliderImages items={images} type="imageviewer" style={{ flex: 0.5, backgroundColor: "red" }} />
	));
// .add("with main props", () => (
// 	<SliderImages items={images} style={{ flex: 0.5, backgroundColor: "red" }} />
// ))
// .add("with main props", () => (
// 	<SliderImages items={images} style={{ flex: 0.5, backgroundColor: "red" }} />
// ))
// // .add("with name props only", () => <List name="ios-hammer"/>)

// class Row extends React.Component {
// 	render() {
// 		return <Text>{this.props.item}</Text>;
// 	}
// }
