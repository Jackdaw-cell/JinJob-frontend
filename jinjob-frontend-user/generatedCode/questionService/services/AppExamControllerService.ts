/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppExamPostDto } from '../models/AppExamPostDto';
import type { BaseResponse_AppExam_ } from '../models/BaseResponse_AppExam_';
import type { BaseResponse_AppExamVO_ } from '../models/BaseResponse_AppExamVO_';
import type { BaseResponse_date_time_ } from '../models/BaseResponse_date_time_';
import type { BaseResponse_List_AppExam_ } from '../models/BaseResponse_List_AppExam_';
import type { BaseResponse_object_ } from '../models/BaseResponse_object_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AppExamControllerService {

    /**
     * createExam
     * @param categoryIds categoryIds
     * @param token token
     * @returns BaseResponse_AppExam_ OK
     * @throws ApiError
     */
    public static createExamUsingGet(
categoryIds?: any,
token?: string,
): CancelablePromise<BaseResponse_AppExam_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/appExam/createExam',
            headers: {
                'token': token,
            },
            body: categoryIds,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * delExam
     * @param examId examId
     * @param token token
     * @returns BaseResponse_object_ OK
     * @throws ApiError
     */
    public static delExamUsingGet(
examId?: number,
token?: string,
): CancelablePromise<BaseResponse_object_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question/appExam/delExam',
            headers: {
                'token': token,
            },
            body: examId,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getExamQuestion
     * @param examId examId
     * @param token token
     * @returns BaseResponse_AppExamVO_ OK
     * @throws ApiError
     */
    public static getExamQuestionUsingGet(
examId?: number,
token?: string,
): CancelablePromise<BaseResponse_AppExamVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question/appExam/getExamQuestion',
            headers: {
                'token': token,
            },
            query: {
                'examId': examId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * loadNoFinishedExam
     * @param token token
     * @returns BaseResponse_List_AppExam_ OK
     * @throws ApiError
     */
    public static loadExamUsingGet(
status?: number,
pageNo?: number,
pageSize?: number,
): CancelablePromise<BaseResponse_List_AppExam_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question/appExam/loadExamByPage',
            query: {
                'status': status,
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
     * postExam
     * @param appExamPostDto appExamPostDto
     * @param token token
     * @returns BaseResponse_AppExam_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static postExamUsingPost(
appExamPostDto: AppExamPostDto,
token?: string,
): CancelablePromise<BaseResponse_AppExam_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/appExam/postExam',
            headers: {
                'token': token,
            },
            body: appExamPostDto,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * startExam
     * @param examId examId
     * @param token token
     * @returns BaseResponse_date_time_ OK
     * @throws ApiError
     */
    public static startExamUsingGet(
examId?: number,
token?: string,
): CancelablePromise<BaseResponse_date_time_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question/appExam/startExam',
            headers: {
                'token': token,
            },
            query: {
                'examId': examId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
