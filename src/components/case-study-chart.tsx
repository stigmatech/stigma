"use client";

import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  TooltipProps
} from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

type ChartProps = {
  type: 'line' | 'bar' | 'area';
  data: { label: string; value: number }[];
  title: string;
  valueSuffix?: string;
};

const CustomTooltip = ({ active, payload, label, suffix }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0b0c10] border border-white/10 p-3 shadow-2xl backdrop-blur-md">
        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-lg font-display font-black text-indigo-400">
          {payload[0].value}{suffix}
        </p>
      </div>
    );
  }
  return null;
};

export const CaseStudyChart = ({ type, data, title, valueSuffix = "" }: ChartProps) => {
  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis 
              dataKey="label" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 700 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 700 }}
            />
            <Tooltip content={<CustomTooltip suffix={valueSuffix} />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
            <Bar 
              dataKey="value" 
              fill="#6366f1" 
              radius={[4, 4, 0, 0]} 
              barSize={40}
              animationDuration={1500}
            />
          </BarChart>
        );
      case 'area':
        return (
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis 
              dataKey="label" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 700 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 700 }}
            />
            <Tooltip content={<CustomTooltip suffix={valueSuffix} />} />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#6366f1" 
              fillOpacity={1} 
              fill="url(#colorValue)" 
              strokeWidth={3}
              animationDuration={1500}
            />
          </AreaChart>
        );
      case 'line':
      default:
        return (
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis 
              dataKey="label" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 700 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 700 }}
            />
            <Tooltip content={<CustomTooltip suffix={valueSuffix} />} />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#6366f1" 
              strokeWidth={3} 
              dot={{ fill: '#6366f1', strokeWidth: 2, r: 4, stroke: '#0b0c10' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              animationDuration={1500}
            />
          </LineChart>
        );
    }
  };

  return (
    <div className="bg-[#0b0c10] border border-white/5 p-8 my-12 group overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-indigo-500/10 transition-colors" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-4 bg-indigo-500" />
          <h3 className="text-sm font-bold text-white uppercase tracking-[0.2em]">
            {title}
          </h3>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>

        <div className="mt-6 flex justify-end">
          <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">
            Source: Stigma Technologies Analytics Internal Data
          </p>
        </div>
      </div>
    </div>
  );
};
