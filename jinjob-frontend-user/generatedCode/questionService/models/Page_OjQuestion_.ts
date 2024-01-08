/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OjQuestion } from './OjQuestion';
import type { OrderItem } from './OrderItem';

export type Page_OjQuestion_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<OjQuestion>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};
