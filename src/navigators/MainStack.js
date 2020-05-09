import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MunicipioAfetadoCovid from '../pages/MunicipioAfetadoCovid/index';
import Maps from '../pages/Maps/index';

const MainStack = createDrawerNavigator();

export default () => {
  return (
    <MainStack.Navigator initialRouteName="Municípios">
      <MainStack.Screen name="Municípios" component={MunicipioAfetadoCovid} />
      <MainStack.Screen name="Map" component={Maps} />
    </MainStack.Navigator>
  );
};
