/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JudgeInfo } from './JudgeInfo';
import type { OjQuestionVO } from './OjQuestionVO';
import type { UserVO } from './UserVO';

export type OjQuestionSubmitVO = {
    code?: string;
    createTime?: string;
    id?: number;
    judgeInfo?: JudgeInfo;
    language?: string;
    ojQuestionVO?: OjQuestionVO;
    questionId?: number;
    status?: number;
    updateTime?: string;
    userId?: number;
    userVO?: UserVO;
};
