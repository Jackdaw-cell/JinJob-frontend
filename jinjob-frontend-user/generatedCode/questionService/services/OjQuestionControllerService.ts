/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_OjQuestion_ } from '../models/BaseResponse_OjQuestion_';
import type { BaseResponse_OjQuestionSubmit_ } from '../models/BaseResponse_OjQuestionSubmit_';
import type { BaseResponse_OjQuestionVO_ } from '../models/BaseResponse_OjQuestionVO_';
import type { BaseResponse_Page_OjQuestion_ } from '../models/BaseResponse_Page_OjQuestion_';
import type { BaseResponse_Page_OjQuestionSubmitVO_ } from '../models/BaseResponse_Page_OjQuestionSubmitVO_';
import type { BaseResponse_Page_OjQuestionVO_ } from '../models/BaseResponse_Page_OjQuestionVO_';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { OjQuestionAddRequest } from '../models/OjQuestionAddRequest';
import type { OjQuestionEditRequest } from '../models/OjQuestionEditRequest';
import type { OjQuestionQueryRequest } from '../models/OjQuestionQueryRequest';
import type { OjQuestionSubmitAddRequest } from '../models/OjQuestionSubmitAddRequest';
import type { OjQuestionSubmitQueryRequest } from '../models/OjQuestionSubmitQueryRequest';
import type { OjQuestionUpdateRequest } from '../models/OjQuestionUpdateRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OjQuestionControllerService {

    /**
     * addQuestion
     * @param ojQuestionAddRequest ojQuestionAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addQuestionUsingPost(
ojQuestionAddRequest: OjQuestionAddRequest,
): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/add',
            body: ojQuestionAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * deleteQuestion
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteQuestionUsingPost(
deleteRequest: DeleteRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * editQuestion
     * @param ojQuestionEditRequest ojQuestionEditRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static editQuestionUsingPost(
ojQuestionEditRequest: OjQuestionEditRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/edit',
            body: ojQuestionEditRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getQuestionById
     * @param id id
     * @returns BaseResponse_OjQuestion_ OK
     * @throws ApiError
     */
    public static getQuestionByIdUsingGet(
id?: number,
): CancelablePromise<BaseResponse_OjQuestion_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question/get',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getQuestionVOById
     * @param id id
     * @returns BaseResponse_OjQuestionVO_ OK
     * @throws ApiError
     */
    public static getQuestionVoByIdUsingGet(
id?: number,
): CancelablePromise<BaseResponse_OjQuestionVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question/get/vo',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listQuestionByPage
     * @param ojQuestionQueryRequest ojQuestionQueryRequest
     * @returns BaseResponse_Page_OjQuestion_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listQuestionByPageUsingPost(
ojQuestionQueryRequest: OjQuestionQueryRequest,
): CancelablePromise<BaseResponse_Page_OjQuestion_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/list/page',
            body: ojQuestionQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listQuestionVOByPage
     * @param ojQuestionQueryRequest ojQuestionQueryRequest
     * @returns BaseResponse_Page_OjQuestionVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listQuestionVoByPageUsingPost(
ojQuestionQueryRequest: OjQuestionQueryRequest,
): CancelablePromise<BaseResponse_Page_OjQuestionVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/list/page/vo',
            body: ojQuestionQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listMyQuestionVOByPage
     * @param ojQuestionQueryRequest ojQuestionQueryRequest
     * @returns BaseResponse_Page_OjQuestionVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listMyQuestionVoByPageUsingPost(
ojQuestionQueryRequest: OjQuestionQueryRequest,
): CancelablePromise<BaseResponse_Page_OjQuestionVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/my/list/page/vo',
            body: ojQuestionQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * doQuestionSubmit
     * @param ojQuestionSubmitAddRequest ojQuestionSubmitAddRequest
     * @returns BaseResponse_OjQuestionSubmit_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static doQuestionSubmitUsingPost(
ojQuestionSubmitAddRequest: OjQuestionSubmitAddRequest,
): CancelablePromise<BaseResponse_OjQuestionSubmit_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/question_submit/do',
            body: ojQuestionSubmitAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listQuestionSubmitByPage
     * @param ojQuestionSubmitQueryRequest ojQuestionSubmitQueryRequest
     * @returns BaseResponse_Page_OjQuestionSubmitVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listQuestionSubmitByPageUsingPost(
ojQuestionSubmitQueryRequest: OjQuestionSubmitQueryRequest,
): CancelablePromise<BaseResponse_Page_OjQuestionSubmitVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/question_submit/list/page',
            body: ojQuestionSubmitQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * updateQuestion
     * @param ojQuestionUpdateRequest ojQuestionUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateQuestionUsingPost(
ojQuestionUpdateRequest: OjQuestionUpdateRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/update',
            body: ojQuestionUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
