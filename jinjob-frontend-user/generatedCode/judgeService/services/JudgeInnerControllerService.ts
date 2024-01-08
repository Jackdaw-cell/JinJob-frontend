/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OjQuestionSubmit } from '../models/OjQuestionSubmit';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class JudgeInnerControllerService {

    /**
     * doJudge
     * @param questionSubmitId questionSubmitId
     * @returns OjQuestionSubmit OK
     * @returns any Created
     * @throws ApiError
     */
    public static doJudgeUsingPost(
questionSubmitId: number,
): CancelablePromise<OjQuestionSubmit | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/judge/inner/do',
            query: {
                'questionSubmitId': questionSubmitId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
