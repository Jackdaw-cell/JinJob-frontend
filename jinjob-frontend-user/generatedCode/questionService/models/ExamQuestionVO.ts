/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ExamQuestionItem } from './ExamQuestionItem';

export type ExamQuestionVO = {
    answerAnalysis?: string;
    answerResult?: number;
    difficultyLevel?: number;
    examId?: number;
    haveCollect?: boolean;
    question?: string;
    questionAnswer?: string;
    questionId?: number;
    questionItemList?: Array<ExamQuestionItem>;
    questionType?: number;
    title?: string;
    userAnswer?: string;
};
