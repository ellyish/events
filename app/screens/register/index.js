import React from "react";
import PropTypes from "prop-types";
import {
	Image,
	View,
	KeyboardAvoidingView,
	StyleSheet,
	Dimensions,
	Text,
	TouchableOpacity,
	TextInput,
	Linking
} from "react-native";
import { Permissions, Notifications, Font } from "expo";
import { colors, fontSizes } from "../../theme";
import { MainHeader, SubHeader } from "../../semiScreen";
const deviceWidth = Dimensions.get("window").width;

export class RegisterPure extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			email: "",
			password: ""
		};
	}

	static propTypes = {
		login: PropTypes.func
	};

	static defaultProps = {
		login: () => console.log("login")
	};

	login = () => {
		this.props.login(this.state);
	};

	signup = async () => {
		this.props.register(this.state.email, this.state.name, this.props.userId);
		// let phoneNumber = this.props.salesNumber;
		// if (phoneNumber)
		// 	Linking.canOpenURL(`tel:${phoneNumber}`)
		// 		.then((supported) => {
		// 			if (supported) {
		// 				Linking.openURL(`tel:${phoneNumber}`);
		// 			}
		// 		})
		// 		.catch((error) => console.log("error", error));
	};

	render() {
		return (
			<KeyboardAvoidingView style={styles.container} behavior="height">
				<SubHeader title="Register" />
				<View style={styles.imageContainer}>
					<View style={{ flex: 0.5 }} />
					<Image
						resizeMode="contain"
						style={styles.image}
						source={require("../../../assets/icon/sheild.png")}
					/>
					<Text style={styles.title}>Register To City Feed</Text>
				</View>
				<View style={{ flex: 0.05 }} />
				<View style={styles.formContainer}>
					<View style={styles.formItemContainer}>
						<Text style={styles.inputTextLabel}>Full Name</Text>
						<TextInput
							style={styles.inputText}
							underlineColorAndroid={colors.transparent}
							// placeholder="Email"
							onChangeText={(name) => this.setState({ name })}
						/>
					</View>
					<View style={styles.formItemContainer}>
						<Text style={styles.inputTextLabel}>Password</Text>
						<TextInput
							style={styles.inputText}
							underlineColorAndroid={colors.transparent}
							secureTextEntry={true}
							// placeholder="Email"
							onChangeText={(password) => this.setState({ password })}
						/>
					</View>
					<View style={styles.formItemContainer}>
						<Text style={styles.inputTextLabel}>Email</Text>
						<TextInput
							style={styles.inputText}
							underlineColorAndroid={colors.transparent}
							// secureTextEntry={true}
							onChangeText={(email) => this.setState({ email })}
						/>
					</View>
					{/* <View style={styles.formItemContainer}>
            <TouchableOpacity style={styles.linkForget}>
              <Text style={styles.textForget}>Forget password?</Text>
            </TouchableOpacity>
          </View> */}
					{/* <View style={styles.formItemContainer}>
						<TouchableOpacity
							style={[styles.button, styles.buttonLogin]}
							onPress={() => this.login()}>
							<Text style={styles.textButton}>Login</Text>
						</TouchableOpacity>
					</View> */}
					<View style={styles.formItemContainer}>
						<TouchableOpacity
							style={[styles.button, styles.buttonSignup]}
							onPress={() => this.signup()}>
							<Text style={styles.textButton}>Signup</Text>
						</TouchableOpacity>
					</View>
				</View>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexGrow: 1,
		backgroundColor: colors.white
	},
	imageContainer: {
		flex: 0.4,
		backgroundColor: colors.black
	},
	image: {
		width: deviceWidth,
		height: deviceWidth / 3
	},
	title: {
		color: colors.white,
		fontSize: fontSizes.medium,
		textAlign: "center"
		// fontFamily: "Roboto_medium"
	},
	inputTextLabel: {
		// fontFamily: "Roboto_medium"
	},
	inputText: {
		fontSize: fontSizes.small.n,
		paddingBottom: 1,
		borderBottomWidth: 2,
		borderColor: colors.black
	},
	formContainer: {
		flex: 0.6,
		justifyContent: "flex-end",
		paddingHorizontal: 15
	},
	formItemContainer: {
		flex: 1
	},
	linkForget: {
		flex: 1,
		alignItems: "flex-end",
		justifyContent: "flex-start"
	},
	textForget: {
		marginBottom: 10,
		// fontFamily: "Roboto_medium",
		color: colors.black
	},
	button: {
		padding: 15,
		alignItems: "center",
		justifyContent: "center"
	},
	textButton: {
		// fontFamily: "Roboto_medium",
		fontSize: fontSizes.small.n,
		color: colors.white
	},
	buttonLogin: {
		backgroundColor: colors.black
	},
	buttonSignup: {
		backgroundColor: colors.black
	}
});

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { login, register } from "../../redux";

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ login, register }, dispatch);
};

const mapStateToProps = ({ app, user }) => ({
	open: app.drawerOpen,
	userId: user.userId
});

export const Register = connect(
	mapStateToProps,
	mapDispatchToProps
)(RegisterPure);
