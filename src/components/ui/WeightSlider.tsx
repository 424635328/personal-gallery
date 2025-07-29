// src/components/ui/WeightSlider.tsx

'use client';

import React, { useCallback } from 'react';
import { useWatch, useFormContext, Control } from 'react-hook-form';
import { FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { cn } from '@/lib/utils';
import type { WeightData } from '@/store/evaluation-store';

// 定义所有权重字段的常量（扁平化键名）
const ALL_WEIGHT_KEYS_FLAT: (keyof WeightData)[] = ['salary', 'longTerm', 'development', 'prospects', 'environment', 'balance'];
const STEP = 5;

interface WeightSliderProps {
  // `name` prop 必须是完整的路径字符串，例如 "salary" 或 "weights.salary"
  name: keyof WeightData | `weights.${keyof WeightData}`; 
  label: string;
}

export const WeightSlider = ({ name, label }: WeightSliderProps) => {
  // 通过 useFormContext 获取 form 方法
  const { getValues, setValue, trigger, control } = useFormContext();

  // useWatch 监听当前字段的值
  const value = useWatch({ control, name });
  const sliderValue = typeof value === 'number' && !isNaN(value) ? [value] : [0];

  // 从完整的 name 路径中提取基础字段名 (例如 "salary" from "weights.salary")
  const baseFieldName = name.split('.').pop() as keyof WeightData;

  const handleSliderChange = useCallback((newValueArray: number[]) => {
    const newCurrentSliderValue = newValueArray[0];

    // 获取当前权重对象 (无论是顶层还是嵌套)
    const currentWeights: WeightData = name.includes('.') 
      ? getValues('weights') // 如果是嵌套，获取 weights 对象
      : getValues();          // 否则获取根对象 (即 WeightData)
    
    // 如果值没有实际变化，则直接返回
    if (currentWeights[baseFieldName] === newCurrentSliderValue) {
      setValue(name, newCurrentSliderValue, { shouldValidate: true, shouldDirty: true });
      trigger();
      return;
    }

    let tempValues: WeightData = { ...currentWeights }; // 创建一个临时副本
    tempValues[baseFieldName] = newCurrentSliderValue; // 更新用户拖动的这个滑块的值

    const otherFields = ALL_WEIGHT_KEYS_FLAT.filter(field => field !== baseFieldName);
    let currentSumOfOthers = 0;
    let eligibleFieldsForProportionalAdjustment: (keyof WeightData)[] = [];

    for (const field of otherFields) {
      currentSumOfOthers += tempValues[field];
      if (tempValues[field] > 0 && tempValues[field] < 100) {
        eligibleFieldsForProportionalAdjustment.push(field);
      }
    }
    
    let desiredSumOfOthers = 100 - newCurrentSliderValue;
    if (desiredSumOfOthers < 0) desiredSumOfOthers = 0;

    if (currentSumOfOthers === 0 && desiredSumOfOthers > 0 && otherFields.length > 0) {
        const amountPerField = Math.floor(desiredSumOfOthers / otherFields.length / STEP) * STEP;
        otherFields.forEach(field => {
            tempValues[field] = Math.max(0, Math.min(100, amountPerField));
        });
    } else if (currentSumOfOthers > 0 && eligibleFieldsForProportionalAdjustment.length > 0) {
        const scaleFactor = desiredSumOfOthers / currentSumOfOthers;
        for (const field of eligibleFieldsForProportionalAdjustment) {
            let proportionalValue = tempValues[field] * scaleFactor;
            tempValues[field] = Math.max(0, Math.min(100, Math.round(proportionalValue / STEP) * STEP));
        }
    } else if (otherFields.length > 0) {
        const fieldToAdjust = otherFields.find(f => {
          const val = tempValues[f];
          return (desiredSumOfOthers > currentSumOfOthers && val < 100) || (desiredSumOfOthers < currentSumOfOthers && val > 0);
        });
        if (fieldToAdjust) {
            let adjustAmount = desiredSumOfOthers - currentSumOfOthers;
            adjustAmount = Math.round(adjustAmount / STEP) * STEP;
            tempValues[fieldToAdjust] = Math.max(0, Math.min(100, tempValues[fieldToAdjust] + adjustAmount));
        }
    }

    let finalTotal = Object.values(tempValues).reduce((sum, val) => sum + (Number(val) || 0), 0);
    let remainingDiff = 100 - finalTotal;

    if (remainingDiff !== 0) {
      const adjustmentOrder = [...otherFields, baseFieldName].sort((a, b) => Math.abs(tempValues[a] - 50) - Math.abs(tempValues[b] - 50));
      for (const field of adjustmentOrder) {
          if (remainingDiff === 0) break;
          let currentVal = tempValues[field];
          let adjustment = 0;
          if (remainingDiff > 0) {
              adjustment = Math.min(remainingDiff, 100 - currentVal);
              adjustment = Math.floor(adjustment / STEP) * STEP;
          } else {
              adjustment = Math.max(remainingDiff, -currentVal);
              adjustment = Math.ceil(adjustment / STEP) * STEP;
          }
          if (adjustment !== 0) {
              tempValues[field] = currentVal + adjustment;
              remainingDiff -= adjustment;
          }
      }
    }
    
    // 最终更新所有字段的值
    ALL_WEIGHT_KEYS_FLAT.forEach(field => {
      // 构建完整路径，例如 "salary" 或 "weights.salary"
      const fullFieldName = name.includes('.') ? `weights.${field}` : (field as string);
      if (getValues(fullFieldName) !== tempValues[field]) { // 检查实际值是否变化
        setValue(fullFieldName, tempValues[field], { shouldValidate: false, shouldDirty: true });
      }
    });
    trigger(); // 触发一次整体验证
  }, [getValues, setValue, trigger, name, baseFieldName]);

  return (
    <FormField control={control} name={name} render={({ field }) => (
      <FormItem className="space-y-4">
        <div className="flex justify-between items-center">
          <FormLabel className="text-base font-medium">{label}</FormLabel>
          <span className="text-xl font-bold text-primary min-w-[50px] text-right">{field.value}%</span>
        </div>
        <FormControl>
          <Slider min={0} max={100} step={STEP} onValueChange={handleSliderChange} value={sliderValue} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )} />
  );
};