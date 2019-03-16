import {schema} from 'normalizr';

export const blogPostReportSchema = new schema.Entity('blogPostReports');
export const blogPostReportListSchema = new schema.Array(blogPostReportSchema);