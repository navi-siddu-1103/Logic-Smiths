'use client';

import type { MoodEntry } from '@/app/mood-tracking/page';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartTooltipContent, ChartContainer } from '@/components/ui/chart';

interface MoodChartProps {
  data: MoodEntry[];
}

const chartConfig = {
  mood: {
    label: "Mood",
    color: "hsl(var(--primary))",
  },
}

export default function MoodChart({ data }: MoodChartProps) {
  return (
    <div className="h-[300px]">
      <ChartContainer config={chartConfig} className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 0, bottom: 20, left: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}

              axisLine={false}
              tickMargin={8}
              domain={[0, 5]}
              ticks={[1, 2, 3, 4, 5]}
              tickFormatter={(value: any) => {
                const moods = ['','Angry', 'Sad', 'Okay', 'Happy', 'Excited'];
                return moods[value];
              }}
            />
             <Tooltip
                cursor={false}
                content={<ChartTooltipContent labelKey='mood' indicator="dot" />}
              />
            <Bar dataKey="value" name="mood" fill="var(--color-mood)" radius={8} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
