/* eslint-disable @typescript-eslint/no-explicit-any */
//this is the logic we're gonna be using to store the user's session
//use /Auth to fetch the user's session and push it inside the queryClient - navigate imperatively after fetch is done
// /Auth should lead to the default page after Auth is finished - by then the user should be logged in 

import { AuthenticateUserResp, SignIn } from "@/pages/Authentication/AuthUtils/Login";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { CognitoRefreshToken, CognitoUser, CognitoUserSession } from "amazon-cognito-identity-js";
import { executeWithin10Minutes } from "./SessionTime";


/**
Route hierarchy:

/Auth (rootRoute 1)
    |- /Portal (rootRoute 2)
            |- /Overview
            |- /Profile
            |- /Projects

A) /Auth will authenticate and then push data to the queryClient then navigate to /Portal
    - How ? wrap a queryOption around the singin function to cache the data in the queryClient
    - for child routes, beforeLoad will check if the user is authenticated, if not, redirect to /Auth
    - This implies:
        => Session data to be available top both components (using custom hook)
        => But also to routes for pre-navigation checks ()
*/
export const useSignIn=({queryClient}:{queryClient:QueryClient})=>{
    return useMutation({
        mutationFn:SignIn,
        onSuccess:(data)=>{
            queryClient.setQueryData(['Auth'],data)
        },
    })
}

const renewToken=({cognitoUser,refreshToken}:{cognitoUser:CognitoUser,refreshToken:CognitoRefreshToken})=>{
    let resp:{
        status: 'error' | 'success',
        payload: any
    }={status:'error', payload:null}

    cognitoUser.refreshSession(refreshToken,(err,session:CognitoUserSession)=>{
            if(err){
                throw Error('failed to refresh session')
            }
            return resp={
                status:'success',
                payload:{session}
            }

    })
    return resp
}

/**
 * Checks and refreshes token if needed to maintain session data
 * TO_DO: Refresh token will eventually expire; if it does, sign the user out
 */
export const manageSession=({AuthPayload}:{AuthPayload:AuthenticateUserResp})=>{
    const {session}=AuthPayload
    if (!session){
        throw Error('session data is missing')
    }
    const expirationTime=session.getAccessToken().getExpiration()
    const refreshToken=session.getRefreshToken()
    const newSessionData=executeWithin10Minutes({
        callBack:()=>renewToken({
            cognitoUser:AuthPayload.cognitoUser,
            refreshToken:refreshToken
        }),
        deadLine:expirationTime
    })
    return newSessionData
}