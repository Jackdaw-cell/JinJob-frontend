/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ExamQuestionItem } from './ExamQuestionItem';

export type ExamQuestion = {
    answerAnalysis?: string;
    categoryId?: number;
    categoryName?: string;
    createTime?: string;
    createUserId?: string;
    createUserName?: string;
    difficultyLevel?: number;
    postUserType?: number;
    question?: string;
    questionAnswer?: string;
    questionId?: number;
    questionItemList?: Array<ExamQuestionItem>;
    questionType?: number;
    status?: number;
    title?: string;
};
