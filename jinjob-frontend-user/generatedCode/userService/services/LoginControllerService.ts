/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_AppUserLoginDto_ } from '../models/BaseResponse_AppUserLoginDto_';
import type { BaseResponse_object_ } from '../models/BaseResponse_object_';
import type { BaseResponse_string_ } from '../models/BaseResponse_string_';
import type { UserAccountSaveRequest } from '../models/UserAccountSaveRequest';
import type { UserAccountLoginRequest } from '../models/UserAccountLoginRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LoginControllerService {

    /**
     * autoLogin
     * @param token token
     * @returns BaseResponse_string_ OK
     * @throws ApiError
     */
    public static autoLoginUsingGet(
token: string,
): CancelablePromise<BaseResponse_string_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/account/autoLogin',
            query: {
                'token': token,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * checkCode
     * @param type type
     * @returns any OK
     * @throws ApiError
     */
    public static checkCodeUsingGet(
type: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/account/checkCode',
            query: {
                'type': type,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getLoginUser
     * @param token token
     * @returns BaseResponse_AppUserLoginDto_ OK
     * @throws ApiError
     */
    public static getLoginUserUsingGet(
token: string,
): CancelablePromise<BaseResponse_AppUserLoginDto_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/account/get/login',
            headers: {
                'Authorization': token,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * login
     * @param userAccountLoginRequest userAccountLoginRequest
     * @param checkCode checkCode
     * @returns BaseResponse_string_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static loginUsingPost(
userAccountLoginRequest: UserAccountLoginRequest,
checkCode?: string,
): CancelablePromise<BaseResponse_string_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/account/login',
            body: userAccountLoginRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * register
     * @param userAccountAddRequest userAccountAddRequest
     * @param checkCode checkCode
     * @returns BaseResponse_object_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static registerUsingPost(
userAccountAddRequest: UserAccountSaveRequest,
checkCode?: string,
): CancelablePromise<BaseResponse_object_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/account/register',
            body: userAccountAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
