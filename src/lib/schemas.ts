// src/lib/schemas.ts

import { z } from 'zod';

// 定义定量硬指标的 Zod Schema
export const quantitativeSchema = z.object({
  companyName: z.string().min(1, { message: "公司名称不能为空" }),
  jobTitle: z.string().min(1, { message: "职位名称不能为空" }),
  
  // 薪酬相关
  baseSalary: z.coerce.number().min(0, { message: "基本月薪不能为负数" }),
  salaryMonths: z.coerce.number().min(12, { message: "薪资月数至少为12" }).max(24, { message: "薪资月数不能超过24" }),
  bonusRange: z.array(z.number()).length(2, "请选择奖金范围").default([0, 0]),
  annualSubsidies: z.coerce.number().min(0, { message: "年度补贴不能为负数" }).default(0),

  // 时间成本相关
  commuteTime: z.coerce.number().min(0, { message: "通勤时间不能为负数" }),
  workHours: z.array(z.number()).length(2, "请选择工作时长范围").default([40, 40]),
  paidLeave: z.coerce.number().min(0, { message: "年假天数不能为负数" }).default(5),
});

// 从 Schema 中推断出 TypeScript 类型，方便在组件中使用
export type QuantitativeData = z.infer<typeof quantitativeSchema>;

// 定性软指标 Schema
export const qualitativeSchema = z.object({
  careerDevelopment: z.number().min(1).max(10).default(5),
  workContent: z.number().min(1).max(10).default(5),
  workEnvironment: z.number().min(1).max(10).default(5),
  lifeBalance: z.number().min(1).max(10).default(5),
});
export type QualitativeFormData = z.infer<typeof qualitativeSchema>;

// 权重系统 Schema
export const weightsSchema = z.object({
  salary: z.coerce.number().min(0).max(100),
  development: z.coerce.number().min(0).max(100),
  environment: z.coerce.number().min(0).max(100),
  balance: z.coerce.number().min(0).max(100),
}).refine(data => data.salary + data.development + data.environment + data.balance === 100, {
  message: "所有权重总和必须等于100%",
  path: ["salary"], // 将错误消息附加到任意一个字段上
});
export type WeightsFormData = z.infer<typeof weightsSchema>;