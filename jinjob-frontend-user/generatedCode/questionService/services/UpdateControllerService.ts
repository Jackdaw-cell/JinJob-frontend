/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_object_ } from '../models/BaseResponse_object_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UpdateControllerService {

    /**
     * checkVersion
     * @param appVersion appVersion
     * @param deviceId deviceId
     * @returns BaseResponse_object_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static checkVersionUsingPost(
appVersion?: string,
deviceId?: string,
): CancelablePromise<BaseResponse_object_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/update/checkVersion',
            query: {
                'appVersion': appVersion,
            },
            body: deviceId,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * download
     * @param id id
     * @returns any OK
     * @throws ApiError
     */
    public static downloadUsingPost(
id?: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/update/download',
            body: id,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
