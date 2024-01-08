/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OjQuestion } from '../models/OjQuestion';
import type { OjQuestionSubmit } from '../models/OjQuestionSubmit';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OjQuestionInnerControllerService {

    /**
     * getQuestionById
     * @param questionId questionId
     * @returns OjQuestion OK
     * @throws ApiError
     */
    public static getQuestionByIdUsingGet1(
questionId: number,
): CancelablePromise<OjQuestion> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question/inner/get/id',
            query: {
                'questionId': questionId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getQuestionSubmitById
     * @param questionId questionId
     * @returns OjQuestionSubmit OK
     * @throws ApiError
     */
    public static getQuestionSubmitByIdUsingGet(
questionId: number,
): CancelablePromise<OjQuestionSubmit> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question/inner/question_submit/get/id',
            query: {
                'questionId': questionId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * updateQuestionSubmitById
     * @param ojQuestionSubmit ojQuestionSubmit
     * @returns boolean OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateQuestionSubmitByIdUsingPost(
ojQuestionSubmit: OjQuestionSubmit,
): CancelablePromise<boolean | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/inner/question_submit/update',
            body: ojQuestionSubmit,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
