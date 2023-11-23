import { CognitoUser, ICognitoUserData } from "amazon-cognito-identity-js";

export function getUser({email}:{email: string}) {
    const userData: ICognitoUserData = {
      Username: email,
      Pool: import.meta.env.VITE_COGNITO_USER_POOL_ID,
    };
  
    return new CognitoUser(userData);
  }