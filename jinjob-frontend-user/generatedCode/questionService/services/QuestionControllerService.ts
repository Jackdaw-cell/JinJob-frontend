/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_PaginationResultVO_QuestionInfo_ } from '../models/BaseResponse_PaginationResultVO_QuestionInfo_';
import type { BaseResponse_QuestionInfo_ } from '../models/BaseResponse_QuestionInfo_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
import {
    BaseResponse_PaginationResultVO_AppExamAnswerQuestion_
} from "../models/BaseResponse_PaginationResultVO_AppExamAnswerQuestion_";
import {BaseResponse_PaginationResultVO_AppExamAnswer_} from "../models/BaseResponse_PaginationResultVO_AppExamAnswer_";
import {BaseResponse_AppExamAnswer_} from "../models/BaseResponse_AppExamAnswer_";
import {BaseResponse_AppExamAnswerQuestion_} from "../models/BaseResponse_AppExamAnswerQuestion_";

export class QuestionControllerService {

    /**
     * getQuestionDetailNext
     * @param currentId currentId
     * @param nextType nextType
     * @param token token
     * @returns BaseResponse_QuestionInfo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getQuestionDetailUsingPost(
currentId?: number,
nextType?: number,
): CancelablePromise<BaseResponse_QuestionInfo_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/question/getQuestionDetail',
            query: {
                currentId,
                nextType,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * loadQuestion
     * @param categoryId categoryId
     * @param pageNo pageNo
     * @returns BaseResponse_PaginationResultVO_QuestionInfo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static loadQuestionUsingPost(
        categoryId?: number,
        pageNo?: number,
        pageSize?: number,
    ): CancelablePromise<BaseResponse_PaginationResultVO_QuestionInfo_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/question/loadQuestion',
            query: {
                'categoryId': categoryId,
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
     * loadAppExamAnswer
     * @param pageNo pageNo
     * @returns BaseResponse_PaginationResultVO_QuestionInfo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static loadAppExamAnswer(
        pageNo?: number,
        pageSize?: number,
    ): CancelablePromise<BaseResponse_PaginationResultVO_AppExamAnswer_ | any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question/question/loadAppExamAnswer',
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
     * loadAppExamAnswerQuestion
     * @param pageNo pageNo
     * @returns BaseResponse_PaginationResultVO_QuestionInfo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static loadAppExamAnswerQuestion(
        pageNo?: number,
        pageSize?: number,
    ): CancelablePromise<BaseResponse_PaginationResultVO_AppExamAnswerQuestion_ | any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question/question/loadAppExamAnswerQuestion',
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
     * createAppExamAnswer
     * @param categoryId categoryId
     * @param pageNo pageNo
     * @returns BaseResponse_PaginationResultVO_QuestionInfo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static createAppExamAnswer(
        categoryId?: number,
        pageNo?: number,
        pageSize?: number,
    ): CancelablePromise<BaseResponse_AppExamAnswer_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/question/createAppExamAnswer',
            body: {
                'categoryId': categoryId,
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
     * postAppExamAnswer
     * @param categoryId categoryId
     * @param pageNo pageNo
     * @returns BaseResponse_PaginationResultVO_QuestionInfo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static postAppExamAnswer(
        id?: string
    ): CancelablePromise<BaseResponse_AppExamAnswer_ | any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question/question/postAppExamAnswer',
            query: {
                'id': id
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * postAppExamAnswerQuestion
     * @param categoryId categoryId
     * @param pageNo pageNo
     * @returns BaseResponse_PaginationResultVO_QuestionInfo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static postAppExamAnswerQuestion(
        questionId?: number,
        appExamAnswerId?: string,
        userAnswer?: string,
        pageNo?: number,
        pageSize?: number,
    ): CancelablePromise<BaseResponse_AppExamAnswerQuestion_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/question/postAppExamAnswerQuestion',
            body: {
                questionId: questionId,
                appExamAnswerId: appExamAnswerId,
                userAnswer: userAnswer,
                pageNo: pageNo,
                pageSize: pageSize,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getAppExamAnswerDetail
     * @param categoryId categoryId
     * @param pageNo pageNo
     * @returns BaseResponse_PaginationResultVO_QuestionInfo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getAppExamAnswerDetail(
        id?: string,
    ): CancelablePromise<BaseResponse_AppExamAnswer_ | any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question/question/getAppExamAnswerDetail',
            query: {
                id: id
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
