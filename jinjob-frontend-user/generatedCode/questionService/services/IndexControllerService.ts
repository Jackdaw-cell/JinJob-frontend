/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_ExamQuestion_ } from '../models/BaseResponse_ExamQuestion_';
import type { BaseResponse_List_AppCarousel_ } from '../models/BaseResponse_List_AppCarousel_';
import type { BaseResponse_List_Category_ } from '../models/BaseResponse_List_Category_';
import type { BaseResponse_object_ } from '../models/BaseResponse_object_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class IndexControllerService {

    /**
     * getExamQuestionById
     * @param questionId questionId
     * @returns BaseResponse_ExamQuestion_ OK
     * @throws ApiError
     */
    public static getExamQuestionByIdUsingGet(
questionId?: number,
): CancelablePromise<BaseResponse_ExamQuestion_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question/index/getExamQuestionById',
            body: questionId,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * loadAllCategory
     * @param type type
     * @returns BaseResponse_List_Category_ OK
     * @throws ApiError
     */
    public static loadAllCategoryUsingGet(
type?: number,
): CancelablePromise<BaseResponse_List_Category_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question/index/loadAllCategory',
            query: {
                type: 0
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * loadCarousel
     * @returns BaseResponse_List_AppCarousel_ OK
     * @throws ApiError
     */
    public static loadCarouselUsingGet(): CancelablePromise<BaseResponse_List_AppCarousel_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question/index/loadCarousel',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * report
     * @param deviceBrand deviceBrand
     * @param deviceId deviceId
     * @returns BaseResponse_object_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static reportUsingPost(
deviceBrand?: string,
deviceId?: string,
): CancelablePromise<BaseResponse_object_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/index/report',
            body: deviceId,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
