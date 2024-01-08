/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FileControllerService {

    /**
     * getImage
     * @param imageFolder imageFolder
     * @param imageName imageName
     * @returns any OK
     * @throws ApiError
     */
    public static getImageUsingPost(
imageFolder: string,
imageName: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/file/getImage/{imageFolder}/{imageName}',
            path: {
                'imageFolder': imageFolder,
                'imageName': imageName,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
