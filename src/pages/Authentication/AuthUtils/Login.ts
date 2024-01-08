import {
    AuthenticationDetails,
    ChallengeName,
    CognitoUser,
    CognitoUserAttribute,
    CognitoUserSession,
  } from 'amazon-cognito-identity-js';
import { getUser } from './GetUser';
  
export interface AuthenticateUserResp {
    type: 'SUCCESS' | 'NEW_PASSWORD_REQUIRED' | 'TOTP_REQUIRED';
    cognitoUser: CognitoUser;
  
    session?: CognitoUserSession;
    userConfirmationNecessary?: boolean;
    accessToken?: string;
    refreshToken?: string;
  
    userAttributes?: CognitoUserAttribute[];
    requiredAttributes?: any;
  
    challengeName?: ChallengeName;
    challengeParameters?: any;
  }
  
  
  export async function SignIn(
    {userName,password}:{userName: string,password: string}
  ): Promise<AuthenticateUserResp> {
    return new Promise((resolve, reject) => {
      const cognitoUser = getUser({userName});
  
      const authenticationData = {
        Username: userName,
        Password: password,
      };
      const authenticationDetails = new AuthenticationDetails(authenticationData);
  
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (session, userConfirmationNecessary) => {
          const accessToken = session.getAccessToken().getJwtToken();
          const refreshToken = session.getRefreshToken().getToken();
          resolve({
            type: 'SUCCESS',
            session,
            userConfirmationNecessary,
            cognitoUser,
            accessToken,
            refreshToken,
          });
        },
  
        onFailure: (err) => reject(err),
  
        newPasswordRequired: (
          userAttributes: CognitoUserAttribute[],
          requiredAttributes,
        ) => {
          resolve({
            type: 'NEW_PASSWORD_REQUIRED',
            userAttributes,
            requiredAttributes,
            cognitoUser,
          });
        },
        //timebased one time password
        totpRequired: (challengeName, challengeParameters) => {
          resolve({
            type: 'TOTP_REQUIRED',
            challengeName,
            challengeParameters,
            cognitoUser,
          });
        },

      });
    });
  }