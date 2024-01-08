/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_PaginationResultVO_Serializable_ } from '../models/BaseResponse_PaginationResultVO_Serializable_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SearchControllerService {

    /**
     * loadQuestion
     * @param keyword keyword
     * @param pageNo pageNo
     * @param type type
     * @returns BaseResponse_PaginationResultVO_Serializable_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static loadQuestionUsingPost1(
keyword?: string,
pageNo?: number,
type?: number,
): CancelablePromise<BaseResponse_PaginationResultVO_Serializable_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/search/search',
            query: {
                'pageNo': pageNo,
            },
            body: type,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
