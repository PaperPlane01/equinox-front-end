import {schema} from 'normalizr';

export const commentReportSchema = new schema.Entity('commentReports');
export const commentReportListSchema = new schema.Array(commentReportSchema);