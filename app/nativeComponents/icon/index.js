import React from "react";
import {
	Entypo,
	EvilIcons,
	Feather,
	FontAwesome,
	Foundation,
	Ionicons,
	MaterialCommunityIcons,
	MaterialIcons,
	Octicons,
	SimpleLineIcons,
	Zocial
} from "@expo/vector-icons";

export class Icon extends React.PureComponent {
	render() {
		switch (this.props.font) {
			case "Entypo":
				return <Entypo {...this.props} />;
			case "EvilIcons":
				return <EvilIcons {...this.props} />;
			case "Feather":
				return <Feather {...this.props} />;
			case "FontAwesome":
				return <FontAwesome {...this.props} />;
			case "Foundation":
				return <Foundation {...this.props} />;
			case "Ionicons":
				return <Ionicons {...this.props} />;
			case "MaterialCommunityIcons":
				return <MaterialCommunityIcons {...this.props} />;
			case "MaterialIcons":
				return <MaterialIcons {...this.props} />;
			case "Octicons":
				return <Octicons {...this.props} />;
			case "SimpleLineIcons":
				return <SimpleLineIcons {...this.props} />;
			case "Zocial":
				return <Zocial {...this.props} />;
			default:
				return <Ionicons name="ios-hand" {...this.props} />;
		}
	}
}
