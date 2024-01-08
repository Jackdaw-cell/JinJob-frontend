/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_AppFeedback_ } from '../../questionService/models/BaseResponse_AppFeedback_';
import type { BaseResponse_List_AppFeedback_ } from '../../questionService/models/BaseResponse_List_AppFeedback_';
import type { BaseResponse_object_ } from '../../questionService/models/BaseResponse_object_';
import type { BaseResponse_PaginationResultVO_ } from '../../questionService/models/BaseResponse_PaginationResultVO_';

import type { CancelablePromise } from '../../questionService/core/CancelablePromise';
import { OpenAPI } from '../../questionService/core/OpenAPI';
import { request as __request } from '../../questionService/core/request';
import {UserAccountSaveRequest} from "../models/UserAccountSaveRequest";

export class MyControllerService {

    /**
     * getCollectNext
     * @param collectType collectType
     * @param currentId currentId
     * @param nextType nextType
     * @param token token
     * @returns BaseResponse_object_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getCollectNextUsingPost(
collectType?: number,
currentId?: number,
nextType?: number,
token?: string,
): CancelablePromise<BaseResponse_object_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/my/getCollectNext',
            headers: {
                'token': token,
            },
            query: {
                'nextType': nextType,
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
     * getUserInfo
     * @param token token
     * @returns BaseResponse_object_ OK
     * @throws ApiError
     */
    public static getUserInfoUsingGet(
token?: string,
): CancelablePromise<BaseResponse_object_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/my/getUserInfo',
            headers: {
                'token': token,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getExamInfoUsingGet
     * @returns BaseResponse_object_ OK
     * @throws ApiError
     */
    public static getExamInfoUsingGet(): CancelablePromise<BaseResponse_object_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/my/getUserExamInfo',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getCheckinInfo
     * @returns BaseResponse_object_ OK
     * @throws ApiError
     */
    public static getCheckinInfoUsingGet(
    ): CancelablePromise<BaseResponse_object_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/my/getCheckinInfo',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * loadCollect
     * @param collectType collectType
     * @param token token
     * @returns BaseResponse_PaginationResultVO_ OK
     * @throws ApiError
     */
    public static loadCollectUsingGet(
collectType?: number,
): CancelablePromise<BaseResponse_PaginationResultVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/my/loadCollect',
            query: {
                collectType
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * loadFeedback
     * @param pFeedbackId pFeedbackId
     * @param pageNo pageNo
     * @param token token
     * @returns BaseResponse_PaginationResultVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static loadFeedbackUsingPost(
pFeedbackId?: number,
pageNo?: number,
token?: string,
): CancelablePromise<BaseResponse_PaginationResultVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/my/loadFeedback',
            headers: {
                'token': token,
            },
            query: {
                'pageNo': pageNo,
            },
            body: pFeedbackId,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * loadFeedbackReply
     * @param pFeedbackId pFeedbackId
     * @param token token
     * @returns BaseResponse_List_AppFeedback_ OK
     * @throws ApiError
     */
    public static loadFeedbackReplyUsingGet(
pFeedbackId?: number,
token?: string,
): CancelablePromise<BaseResponse_List_AppFeedback_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/my/loadFeedbackReply',
            headers: {
                'token': token,
            },
            query: {
                'pFeedbackId': pFeedbackId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * loadMyExam
     * @param pageNo pageNo
     * @param token token
     * @returns BaseResponse_PaginationResultVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static loadMyExamUsingPost(
pageNo?: number,
token?: string,
): CancelablePromise<BaseResponse_PaginationResultVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/my/loadMyExam',
            headers: {
                'token': token,
            },
            query: {
                'pageNo': pageNo,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * loadWrongQuestion
     * @param pageNo pageNo
     * @param token token
     * @returns BaseResponse_PaginationResultVO_ OK
     * @throws ApiError
     */
    public static loadWrongQuestionUsingGet(
pageNo?: number,
token?: string,
): CancelablePromise<BaseResponse_PaginationResultVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/my/loadWrongQuestion',
            headers: {
                'token': token,
            },
            query: {
                'pageNo': pageNo,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * sendFeedback
     * @param content content
     * @param pFeedbackId pFeedbackId
     * @param token token
     * @returns BaseResponse_AppFeedback_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static sendFeedbackUsingPost(
content?: string,
pFeedbackId?: number,
token?: string,
): CancelablePromise<BaseResponse_AppFeedback_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/my/sendFeedback',
            headers: {
                'token': token,
            },
            body: pFeedbackId,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * updateUserInfo
     * @param password password
     * @param sex sex
     * @param token token
     * @returns BaseResponse_object_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateUserInfoUsingPost(
userAccountSaveRequest:UserAccountSaveRequest
): CancelablePromise<BaseResponse_object_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/my/updateUserInfo',
            body: userAccountSaveRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * uploadAvatar
     * @param file file
     * @param token token
     * @returns BaseResponse_object_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static uploadAvatarUsingPost(
file?: File,
token?: string,
): CancelablePromise<BaseResponse_object_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/my/uploadAvatar',
            headers: {
                'token': token,
            },
            formData: {
                'file': file,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
