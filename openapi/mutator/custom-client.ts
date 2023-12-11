/* eslint-disable @typescript-eslint/ban-ts-comment */
 // custom-instance.ts
 
import Axios, { AxiosRequestConfig, AxiosError } from 'axios';

export const AXIOS_INSTANCE = Axios.create({ baseURL: 'https://5u2uhrjsi8.execute-api.us-east-1.amazonaws.com/Test' }); // use your own URL here or environment variable

// add a second `options` argument here if you want to pass extra options to each generated query
export const customClient = <T>(
    config: AxiosRequestConfig,
    options?: AxiosRequestConfig,
    ): Promise<T> => {
    const source = Axios.CancelToken.source();
    const promise = AXIOS_INSTANCE({
        ...config,
        ...options,
        cancelToken: source.token,
    }).then(({ data }) => data);

    // @ts-ignore
    promise.cancel = () => {
        source.cancel('Query was cancelled');
    };

    return promise;
};

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = AxiosError<Error>;

export type BodyType<BodyData> = BodyData;
 