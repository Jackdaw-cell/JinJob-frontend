/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JudgeConfig } from './JudgeConfig';
import type { UserVO } from './UserVO';

export type OjQuestionVO = {
    acceptedNum?: number;
    content?: string;
    createTime?: string;
    favourNum?: number;
    id?: number;
    judgeCase?: string;
    judgeConfig?: JudgeConfig;
    submitMethod?: string;
    submitNum?: number;
    tags?: Array<string>;
    thumbNum?: number;
    title?: string;
    updateTime?: string;
    userId?: number;
    userVO?: UserVO;
};
