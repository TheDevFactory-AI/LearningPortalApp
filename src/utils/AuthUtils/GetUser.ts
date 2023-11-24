import { CognitoUser, ICognitoUserData } from "amazon-cognito-identity-js";
import UserPool from './UserPool';

export function getUser({userName}:{userName: string}) {
    const userData: ICognitoUserData = {
      Username: userName,
      Pool: UserPool,
    };
  
    return new CognitoUser(userData);
  }