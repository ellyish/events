import React from "react";
import { Modal, Text, TouchableHighlight, View, TextInput } from "react-native";
import Cart from "../../lib/basket";
import styles from "./style";

export default class CounterModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1
    };
  }

  addToCart = count => {
    if (count < 1) {
      this.setState({ count: 1 });
      return;
    }
    let product = this.props.product;
    product["count"] = count;
    if (count < 4) product["price"] = product.priceOne;
    else if (count < 10) product["price"] = product.priceTwo;
    else product["price"] = product.priceThree;
    Cart.add(product, this.props.update);
    this.setState({ count: 1 });
    this.props.hide(false, count, product.price);
  };
  openCounter = () => {
    // console.log("show");
    if (this.props.count) this.setState({ count: this.props.count });
  };

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.show}
        onShow={this.openCounter}
        onRequestClose={() => {
          this.props.hide(false);
        }}
      >
        <View style={styles.main}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.textHeader}>Number of Items</Text>
            </View>
            <View style={styles.body}>
              <TextInput
                style={styles.textInput}
                underlineColorAndroid="rgba(0,0,0,0)"
                onChangeText={count =>
                  this.setState({
                    count: parseInt(count) ? parseInt(count) : 0
                  })
                }
                keyboardType="numeric"
                value={`${this.state.count}`}
              />
            </View>
            <View style={styles.footer}>
              <TouchableHighlight
                underlayColor="#518AFF"
                style={styles.touchableButtomC}
                onPress={() => {
                  this.setState({ count: 1 });
                  this.props.hide(false);
                }}
              >
                <Text style={styles.textButtom}>Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor="#518AFF"
                style={styles.touchableButtomO}
                onPress={() => {
                  this.addToCart(this.state.count);
                }}
              >
                <Text style={styles.textButtom}>OK</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
