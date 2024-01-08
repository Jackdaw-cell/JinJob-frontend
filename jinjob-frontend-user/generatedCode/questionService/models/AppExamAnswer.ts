/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import {QuestionInfo} from "./QuestionInfo";

export type AppExamAnswer =  {
    id: string,
    userId: string,
    score: number,
    accuracy: number,
    createTime: string,
    updateTime: string,
    status: number,

    categoryId: number,
    appExamAnswerQuestionInfoList: Array<QuestionInfo>
};
