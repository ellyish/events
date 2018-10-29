import React from "react";
import { Modal, View } from "react-native";
import { Spinner } from "native-base";
import styles from "./style";

export default class SpinnerModal extends React.Component {
  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.show}
        onRequestClose={() => {
          this.props.hide(false);
          alert("Modal has been closed.");
        }}
      >
        <View style={[styles.main,{backgroundColor: 'rgba(52, 52, 52, 0.8)'}]}>
          <Spinner color="blue" />
        </View>
      </Modal>
    );
  }
}
