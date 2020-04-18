import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import DashBoardStack from './stacks/DashBoardStack';
import ProfileStack from './stacks/ProfileStack';
import ProductsStack from './stacks/ProductsStack';
import AddNewProductStack from './stacks/AddNewProductStack';
import OrdersStack from './stacks/OrdersStack';

import variable from '../styles/variables.js';

const Drawer = createDrawerNavigator();

const MainDrawerNavigation = () => (
  <NavigationContainer>
    <Drawer.Navigator>
      <Drawer.Screen
        name="DashBoard"
        component={DashBoardStack}
        options={{
          drawerLabel: 'Dashboard',
          drawerIcon: () => (
            <Icon name="dashboard" size={30} color={variable.mainThemeColor} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          drawerLabel: 'Profile',
          drawerIcon: () => (
            <Icon name="user" size={30} color={variable.mainThemeColor} />
          ),
        }}
      />
      <Drawer.Screen
        name="Products"
        component={ProductsStack}
        options={{
          drawerLabel: 'Products',
          drawerIcon: () => (
            <Icon
              name="product-hunt"
              size={30}
              color={variable.mainThemeColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="AddNewProduct"
        component={AddNewProductStack}
        options={{
          drawerLabel: 'Add New Product',
          drawerIcon: () => (
            <Icon name="plus" size={30} color={variable.mainThemeColor} />
          ),
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={OrdersStack}
        options={{
          drawerLabel: 'Orders',
          drawerIcon: () => (
            <Icon name="reorder" size={30} color={variable.mainThemeColor} />
          ),
        }}
      />
    </Drawer.Navigator>
  </NavigationContainer>
);

export default MainDrawerNavigation;