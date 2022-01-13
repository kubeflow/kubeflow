import { NativeModules } from 'react-native';
var getRandomBase64 = NativeModules.ExpoRandom ? NativeModules.ExpoRandom.getRandomBase64String : NativeModules.RNAWSCognito ? NativeModules.RNAWSCognito.getRandomBase64 : function () {
  throw new Error('Could not find a native getRandomBase64 implementation. Validate that amazon-cognito-identity-js is linked.');
};
export default getRandomBase64;