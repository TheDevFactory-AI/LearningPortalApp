/* eslint-disable @typescript-eslint/no-explicit-any */

import { AuthenticateUserResp, SignIn } from "@/pages/Authentication/AuthUtils/Login";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { CognitoRefreshToken, CognitoUser, CognitoUserSession } from "amazon-cognito-identity-js";
import { executeWithin10Minutes } from "./SessionTime";
import { signUp } from "@/pages/Authentication/AuthUtils/Signup";

/**
 * @Session How it works =>
 * for a given parent and child route, if there is a match on a child route, the beforeLoad for 
 * both the parent AND the child routes will fire (parent then child's) THEN load fires for
 * both in that sequence
 * @usage Use beforeLoad of parent component to validate authentication, then the child 
 * beforeLoad to manage accessToken lifecycle (ensure API calls do not bounce), then parent load 
 * to relevant queryData then childs - this also promotes better separation of concerns
 * @param queryClient instance 
 */

export const useSignIn=({queryClient}:{queryClient:QueryClient})=>{
    return useMutation({
        mutationFn:SignIn,
        onSuccess:(data)=>{
            console.log(data)
            queryClient.setQueryData(['Auth'],data)
        },
    })
}

export const renewToken=({cognitoUser,refreshToken}:{cognitoUser:CognitoUser,refreshToken:CognitoRefreshToken}):Promise<Error | CognitoUserSession>=>{
    return new Promise((resolve, reject) => {
        cognitoUser.refreshSession(refreshToken, (err, session:CognitoUserSession) => {
          if (err) {
            reject(new Error('failed to refresh session'));
          } else {
            resolve(session);
          }
        });
      });
}

/**
 * Checks and refreshes token if needed to maintain session data based on signIn response
 * payload
 * @param AuthPayload signIn response payload
 * @todo Refresh token will eventually expire; if it does, sign the user out
 */
export const manageAccessToken=async ({AuthPayload}:{AuthPayload:AuthenticateUserResp})=>{
    const {session}=AuthPayload
    if (!session){
        throw Error('session data is missing')
    }
    const expirationTime=session.getAccessToken().getExpiration()
    const refreshToken=session.getRefreshToken()
    try{
        const newSessionData=await executeWithin10Minutes({
            callBack: async ()=> renewToken({
                cognitoUser:AuthPayload.cognitoUser,
                refreshToken:refreshToken
            }),
            deadLine:expirationTime
        }) 
        return newSessionData as CognitoUserSession | undefined
    }catch(e){
        throw Error ('Error renewing token')
    }}
    
export const useSignUp=()=>{
    return useMutation({
        mutationFn:signUp
    })
}