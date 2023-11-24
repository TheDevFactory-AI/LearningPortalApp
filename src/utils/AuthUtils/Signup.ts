import { getUser } from './GetUser';
import UserPool from './UserPool';
import {
    CognitoUserAttribute,
    ClientMetadata,
    ISignUpResult,
    CognitoUser,
  } from 'amazon-cognito-identity-js';
// This is the same user pool we created in the above step

export type SignUpProps={
  name: string,
  email: string,
  password?: string,
  phone_number?: string,
  metaData?: ClientMetadata,
}

export type SignUpResponse={
  status: 'success'|'error',
  message: Error | ISignUpResult

}


export const signUp=async ({
  name,
  email,
  password,
  phone_number,
  metaData
}:SignUpProps):Promise<SignUpResponse>=>{
  const attributeList = [
    new CognitoUserAttribute({
      Name: 'email',
      Value: email,
    }),
    new CognitoUserAttribute({
      Name: 'phone_number',
      Value: phone_number??'',
    }),
    new CognitoUserAttribute({
      Name: 'name',
      Value: name??'',
    }),
    // add other needed attributes here
  ];

  return await new Promise((resolve, reject) => {
    UserPool.signUp(
      name,
      password??'',
      attributeList,
      [],
      (error, result) => {
        if (error) {
          reject({status:'error',message:error.message});
        }

        if (result) {
          console.log('userName is'+result.user.getUsername());
          resolve({status:'success',message:result});
        }
      },
      { ...metaData },
    );
  });
}
//Auth flow: Sign up -> Confirm sign up (email verification code)-> Sign in
//idea: switch UI to become form to enter verification code


export async function confirmSignUp({code,userName}:{code: string, userName: string}):Promise<CognitoUser | Error> {
  const cognitoUser = getUser({userName});
  return await new Promise((resolve, reject) => {
    cognitoUser.confirmRegistration(code, false, (err: Error, result) => {
      if (err) {
       reject(err);
      }
      if (result) {
        resolve(cognitoUser);
      }
    });
  });
}

export function resendCode({userName}:{userName: string}) {
  const cognitoUser = getUser({userName});
  cognitoUser.resendConfirmationCode((err, result) => {
    if (err) {
      // Some error message on screen or a toast
      return;
    }
    return result;
    // Some toast or message displayed on screen of success
  });
}