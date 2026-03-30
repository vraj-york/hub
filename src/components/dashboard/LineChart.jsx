import { useState, useMemo } from 'react';
import { Card, Box, Typography } from '@mui/material';
import { CustomSelect } from '../company-creation/CustomSelect';
import { IconHoverCard } from './IconHoverCard';

const CHART_PADDING = { top: 20, right: 20, bottom: 36, left: 44 };
const LINE_COLOR_1 = 'rgba(48, 95, 161, 1)';
const LINE_COLOR_2 = 'rgba(224, 184, 74, 1)';
const GRID_COLOR = 'rgba(221, 217, 235, 1)';
const AXIS_LABEL_COLOR = 'rgba(56, 89, 102, 1)';

export function LineChart({
  data = [],
  timeAggregationOptions = [],
  selectedTimeAggregation,
  onTimeAggregationChange,
  chartTitle = 'Login Activity',
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const width = 640;
  const height = 280;
  const innerWidth = width - CHART_PADDING.left - CHART_PADDING.right;
  const innerHeight = height - CHART_PADDING.top - CHART_PADDING.bottom;

  const { path1, path2, xScale, yScale, yMax } = useMemo(() => {
    if (!data.length) return { path1: '', path2: '', xScale: () => 0, yScale: () => 0, yMax: 100 };
    const allValues = data.flatMap((d) => [d.users, d.sessions]);
    const yMax = Math.max(...allValues, 1);
    const yMin = 0;
    const xStep = innerWidth / Math.max(data.length - 1, 1);
    const xScale = (i) => CHART_PADDING.left + i * xStep;
    const yScale = (v) =>
      CHART_PADDING.top + innerHeight - ((v - yMin) / (yMax - yMin)) * innerHeight;
    const points1 = data.map((d, i) => `${xScale(i)},${yScale(d.users)}`);
    const points2 = data.map((d, i) => `${xScale(i)},${yScale(d.sessions)}`);
    const path1 = `M ${points1.join(' L ')}`;
    const path2 = `M ${points2.join(' L ')}`;
    return { path1, path2, xScale, yScale, yMax };
  }, [data, innerWidth, innerHeight]);

  const yTicks = useMemo(() => {
    const max = yMax || 100;
    const step = max <= 20 ? 5 : max <= 100 ? 20 : 50;
    const ticks = [];
    for (let v = 0; v <= max; v += step) ticks.push(v);
    if (ticks[ticks.length - 1] < max) ticks.push(max);
    return ticks;
  }, [yMax]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const i = Math.round(((x - CHART_PADDING.left) / innerWidth) * (data.length - 1));
    const clamped = Math.max(0, Math.min(i, data.length - 1));
    setHoveredIndex(clamped);
    setHoverPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => setHoveredIndex(null);

  const hoverPoint = hoveredIndex != null ? data[hoveredIndex] : null;

  return (
    <Card
      role="graphics-document"
      aria-label="Login Activity Chart"
      sx={{
        background: 'rgba(255, 255, 255, 1)',
        borderRadius: '8px',
        p: 2,
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.06)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography
          component="h3"
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontWeight: 500,
            fontSize: '16px',
            color: 'rgba(73, 130, 145, 1)',
          }}
        >
          {chartTitle}
        </Typography>
        {timeAggregationOptions.length > 0 && (
          <CustomSelect
            options={timeAggregationOptions}
            value={selectedTimeAggregation}
            onChange={onTimeAggregationChange}
            placeholder="Monthly"
            selectedValueTextColor="rgba(47, 65, 74, 1)"
            inputBackground="rgba(255, 255, 255, 1)"
            aria-label="Select login activity time aggregation"
          />
        )}
      </Box>
      <Box
        sx={{ position: 'relative' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <svg width={width} height={height} style={{ display: 'block' }}>
          {/* Y-axis labels */}
          {yTicks.map((tick) => (
            <g key={tick}>
              <line
                x1={CHART_PADDING.left}
                y1={yScale(tick)}
                x2={CHART_PADDING.left + innerWidth}
                y2={yScale(tick)}
                stroke={GRID_COLOR}
                strokeWidth={1}
                strokeDasharray="4 2"
              />
              <text
                x={CHART_PADDING.left - 8}
                y={yScale(tick) + 4}
                textAnchor="end"
                fill={AXIS_LABEL_COLOR}
                style={{
                  fontFamily: 'Inter, Helvetica, Arial, sans-serif',
                  fontSize: '12px',
                  fontWeight: 400,
                }}
                aria-hidden
              >
                {tick}
              </text>
            </g>
          ))}
          {/* X-axis labels */}
          {data.map((d, i) => (
            <text
              key={d.month}
              x={xScale(i)}
              y={height - 12}
              textAnchor="middle"
              fill={AXIS_LABEL_COLOR}
              style={{
                fontFamily: 'Inter, Helvetica, Arial, sans-serif',
                fontSize: '12px',
                fontWeight: 400,
              }}
              aria-hidden
            >
              {d.month}
            </text>
          ))}
          {/* Data lines */}
          <path
            d={path1}
            fill="none"
            stroke={LINE_COLOR_1}
            strokeWidth={2}
            role="graphics-object"
            aria-label="Users activity line"
            aria-roledescription="line chart"
          />
          <path
            d={path2}
            fill="none"
            stroke={LINE_COLOR_2}
            strokeWidth={2}
            role="graphics-object"
            aria-label="Sessions activity line"
            aria-roledescription="line chart"
          />
          {/* Invisible wider path for hover target */}
          {data.length > 0 && (
            <path
              d={path1}
              fill="none"
              stroke="transparent"
              strokeWidth={24}
              style={{ cursor: 'pointer' }}
              aria-hidden
            />
          )}
        </svg>
        {hoverPoint != null && (
          <Box
            sx={{
              position: 'absolute',
              left: Math.min(hoverPosition.x + 12, width - 120),
              top: Math.max(hoverPosition.y - 40, 8),
              zIndex: 10,
            }}
          >
            <IconHoverCard
              label={hoverPoint.month}
              value={String(hoverPoint.users)}
              dotColor={LINE_COLOR_1}
              label2="Sessions"
              value2={String(hoverPoint.sessions)}
              dotColor2={LINE_COLOR_2}
            />
          </Box>
        )}
      </Box>
    </Card>
  );
}
