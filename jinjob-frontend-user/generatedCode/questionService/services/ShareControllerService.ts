/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_PaginationResultVO_ShareInfo_ } from '../models/BaseResponse_PaginationResultVO_ShareInfo_';
import type { BaseResponse_ShareInfo_ } from '../models/BaseResponse_ShareInfo_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
import {ShareInfo} from "../models/ShareInfo";

export class ShareControllerService {

    /**
     * getShareDetailNext
     * @param currentId currentId
     * @param nextType nextType
     * @param token token
     * @returns BaseResponse_ShareInfo_ OK
     * @throws ApiError
     */
    public static getShareDetailNextUsingGet(
currentId?: number
): CancelablePromise<BaseResponse_ShareInfo_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question/share/getShareDetailNext',
            query: {
                'currentId': currentId,
            },
            body: currentId,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * loadShareList
     * @param pageNo pageNo
     * @returns BaseResponse_PaginationResultVO_ShareInfo_ OK
     * @throws ApiError
     */
    public static loadShareListUsingGet(
pageNo?: number,
pageSize?: number,
): CancelablePromise<BaseResponse_PaginationResultVO_ShareInfo_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question/share/loadShareList',
            query: {
                'pageNo': pageNo,
                'pageSize': pageSize,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * saveShareInfoByPost
     * @param currentId currentId
     * @param nextType nextType
     * @param token token
     * @returns BaseResponse_ShareInfo_ OK
     * @throws ApiError
     */
    public static saveShareInfoByPost(
shareInfo?: ShareInfo
    ): CancelablePromise<BaseResponse_ShareInfo_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/share/saveShareInfo',
            body: shareInfo,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
