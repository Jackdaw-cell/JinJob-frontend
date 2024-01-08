/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_object_ } from '../models/BaseResponse_object_';
import type { CollectAddRequest } from '../models/CollectAddRequest';
import type { CollectCancelRequest } from '../models/CollectCancelRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AppUserCollectControllerService {

    /**
     * addCollect
     * @param collectAddRequest collectAddRequest
     * @param token token
     * @returns BaseResponse_object_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addCollectUsingPost(
collectAddRequest: CollectAddRequest,
): CancelablePromise<BaseResponse_object_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/appUserCollect/addCollect',
            body: collectAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * cancelCollect
     * @param collectCancelRequest collectCancelRequest
     * @param token token
     * @returns BaseResponse_object_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static cancelCollectUsingPost(
collectCancelRequest: CollectCancelRequest,
token?: string,
): CancelablePromise<BaseResponse_object_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/appUserCollect/cancelCollect',
            headers: {
                'token': token,
            },
            body: collectCancelRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
