import { getUser } from './GetUser';
import UserPool from './UserPool';
import {
    CognitoUserAttribute,
    ClientMetadata,
  } from 'amazon-cognito-identity-js';
// This is the same user pool we created in the above step

export type SignUpProps={
  name: string,
  email: string,
  password: string,
  phone_number: string,
  metaData?: ClientMetadata,
}

export const signUp=async ({
  name,
  email,
  password,
  phone_number,
  metaData
}:SignUpProps)=>{
  const attributeList = [
    new CognitoUserAttribute({
      Name: 'name',
      Value: name,
    }),
    new CognitoUserAttribute({
      Name: 'email',
      Value: email,
    }),
    new CognitoUserAttribute({
        Name: 'phone_number',
        Value: phone_number,
        }),
    // add other needed attributes here
  ];

  await new Promise((resolve, reject) => {
    UserPool.signUp(
      email,
      password,
      attributeList,
      [],
      (error, result) => {
        if (error) {
          reject({status:'error',message:error.message});
        }

        if (result) {
          console.log('userName is'+result.user.getUsername());
          resolve({status:'success',message:result.user});
        }
      },
      { ...metaData },
    );
  });
}
//Auth flow: Sign up -> Confirm sign up (email verification code)-> Sign in
//idea: switch UI to become form to enter verification code


export async function confirmSignUp({code,email}:{code: string, email: string}) {
  const cognitoUser = getUser({email});
  await new Promise((resolve, reject) => {
    cognitoUser.confirmRegistration(code, true, (err: Error, result) => {
      if (err) {
       reject(err);
      }
      if (result) {
        resolve(cognitoUser);
      }
    });
  });
}

export function resendCode({email}:{email: string}) {
  const cognitoUser = getUser({email});
  cognitoUser.resendConfirmationCode((err, result) => {
    if (err) {
      // Some error message on screen or a toast
      return;
    }
    return result;
    // Some toast or message displayed on screen of success
  });
}