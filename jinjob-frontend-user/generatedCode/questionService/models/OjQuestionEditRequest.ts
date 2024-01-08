/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JudgeCase } from './JudgeCase';
import type { JudgeConfig } from './JudgeConfig';

export type OjQuestionEditRequest = {
    answer?: string;
    content?: string;
    descript?: string;
    id?: number;
    judgeCase?: Array<JudgeCase>;
    judgeConfig?: JudgeConfig;
    mainMethod?: string;
    submitMethod?: string;
    tags?: Array<string>;
    title?: string;
};
