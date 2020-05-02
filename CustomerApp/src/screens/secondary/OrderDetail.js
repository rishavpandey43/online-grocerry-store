// * Import required modules/dependencies
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ScrollView, StyleSheet, View, ActivityIndicator} from 'react-native';
import {Header, Card, Text, Icon} from 'react-native-elements';

// * Import all store related stuffs

// * Import all screens/components
import Item from '../../components/OrderItem';

// * Import utilites
import {getOrderStatus, getpaymentMode} from '../../utils/helper';

// * Import all styling stuffs
import mainStyles from '../../styles/mainStyle';

class OrderDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: null,
    };
  }

  componentDidMount() {
    if (this.props.route.params) {
      this.setState({
        order: this.props.orders.orders.filter(
          order => order._id === this.props.route.params.orderId,
        )[0],
      });
    }
  }

  render() {
    return (
      <View>
        <Header
          leftComponent={
            <Icon
              type="font-awesome"
              name="arrow-left"
              size={20}
              color="#FFF"
              underlayColor="transparent"
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />
          }
          centerComponent={{
            text: 'ORDER #123456788',
            style: {color: '#fff'},
          }}
          containerStyle={{
            backgroundColor: '#933dd4',
            justifyContent: 'space-around',
          }}
        />
        <ScrollView>
          {!this.state.order ? (
            <ActivityIndicator />
          ) : (
            <View style={[mainStyles.container, {marginBottom: 100}]}>
              <Card>
                <View style={{flex: 1, flexDirection: 'row', marginBottom: 20}}>
                  <View style={{flex: 1}}>
                    <Text style={styles.label}>Ordered from:</Text>
                  </View>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{fontSize: 18}}>
                      {this.state.order.orderedFrom.storeDetail.name}
                    </Text>
                  </View>
                </View>

                <View style={{flex: 1, flexDirection: 'row', marginBottom: 20}}>
                  <View style={{flex: 1}}>
                    <Text style={styles.label}>Status:</Text>
                  </View>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: getOrderStatus(this.state.order.status).color,
                      }}>
                      {getOrderStatus(this.state.order.status).name}
                    </Text>
                  </View>
                </View>

                <Text style={{fontSize: 20, marginBottom: 20}}>
                  Order Summary:
                </Text>

                {this.state.order.items.map((item, i) => (
                  <Item
                    key={i}
                    name={item.name}
                    variant={item.value}
                    quantity={item.quantity}
                    price={item.price}
                  />
                ))}
                <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
                  <View style={{flex: 1}}>
                    <Text>Item Total:</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={{textAlign: 'right'}}>
                      ₹ {this.state.order.amount.itemsPrice}
                    </Text>
                  </View>
                </View>

                <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
                  <View style={{flex: 1}}>
                    <Text>Delivery Charge:</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={{textAlign: 'right'}}>
                      ₹ {this.state.order.amount.deliveryCharge}
                    </Text>
                  </View>
                </View>

                <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
                  <View style={{flex: 1}}>
                    <Text>Payment Mode:</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={{textAlign: 'right'}}>
                      {getpaymentMode(this.state.order.paymentMode)}
                    </Text>
                  </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
                  <View style={{flex: 1}}>
                    <Text>Payment Status:</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={{textAlign: 'right'}}>
                      {this.state.order.paymentMode === 'cod'
                        ? 'Pending'
                        : 'Completed'}
                    </Text>
                  </View>
                </View>
              </Card>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const mapStateToProps = state => {
  return {
    auth: state.auth,
    orders: state.orders,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderDetailScreen);
