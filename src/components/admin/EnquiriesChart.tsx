import React, { useState, useMemo } from 'react';
import { CustomerRequirement, CustomerLead } from '../../types';

interface EnquiriesChartProps {
  requirements: CustomerRequirement[];
  leads: CustomerLead[];
}

type TimeframeOption = '7d' | '30d' | '90d' | '1y';

interface DataPoint {
  date: Date;
  label: string;
  count: number;
  rfqs: number;
  leads: number;
}

export const EnquiriesChart: React.FC<EnquiriesChartProps> = ({ requirements, leads }) => {
  const [timeframe, setTimeframe] = useState<TimeframeOption>('90d');
  const [hoveredPoint, setHoveredPoint] = useState<{ point: DataPoint; x: number; y: number } | null>(null);

  // Generate dynamic date buckets based on timeframe and aggregate real entries
  const chartData = useMemo(() => {
    const now = new Date();
    const points: DataPoint[] = [];

    if (timeframe === '7d') {
      // 7 Daily Points
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        d.setHours(0, 0, 0, 0);

        const endOfDay = new Date(d);
        endOfDay.setHours(23, 59, 59, 999);

        const dayRfqs = requirements.filter(r => {
          const t = new Date(r.createdAt).getTime();
          return t >= d.getTime() && t <= endOfDay.getTime();
        }).length;

        const dayLeads = leads.filter(l => {
          const t = new Date(l.createdAt).getTime();
          return t >= d.getTime() && t <= endOfDay.getTime();
        }).length;

        points.push({
          date: d,
          label: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
          count: dayRfqs + dayLeads,
          rfqs: dayRfqs,
          leads: dayLeads
        });
      }
    } else if (timeframe === '30d') {
      // 7 interval points across 30 days
      const intervalDays = 5;
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - (i * intervalDays));
        d.setHours(0, 0, 0, 0);

        const rangeStart = new Date(d);
        rangeStart.setDate(rangeStart.getDate() - (intervalDays / 2));
        const rangeEnd = new Date(d);
        rangeEnd.setDate(rangeEnd.getDate() + (intervalDays / 2));

        const dayRfqs = requirements.filter(r => {
          const t = new Date(r.createdAt).getTime();
          return t >= rangeStart.getTime() && t <= rangeEnd.getTime();
        }).length;

        const dayLeads = leads.filter(l => {
          const t = new Date(l.createdAt).getTime();
          return t >= rangeStart.getTime() && t <= rangeEnd.getTime();
        }).length;

        points.push({
          date: d,
          label: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
          count: dayRfqs + dayLeads,
          rfqs: dayRfqs,
          leads: dayLeads
        });
      }
    } else if (timeframe === '90d') {
      // 9 points across 90 days (spaced ~10 days)
      const numPoints = 9;
      const intervalDays = 10;
      for (let i = numPoints - 1; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - (i * intervalDays));
        d.setHours(0, 0, 0, 0);

        const rangeStart = new Date(d);
        rangeStart.setDate(rangeStart.getDate() - (intervalDays / 2));
        const rangeEnd = new Date(d);
        rangeEnd.setDate(rangeEnd.getDate() + (intervalDays / 2));

        const dayRfqs = requirements.filter(r => {
          const t = new Date(r.createdAt).getTime();
          return t >= rangeStart.getTime() && t <= rangeEnd.getTime();
        }).length;

        const dayLeads = leads.filter(l => {
          const t = new Date(l.createdAt).getTime();
          return t >= rangeStart.getTime() && t <= rangeEnd.getTime();
        }).length;

        points.push({
          date: d,
          label: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
          count: dayRfqs + dayLeads,
          rfqs: dayRfqs,
          leads: dayLeads
        });
      }
    } else {
      // 12 Monthly Points for This Year
      const currentYear = now.getFullYear();
      for (let m = 0; m <= now.getMonth(); m++) {
        const d = new Date(currentYear, m, 1);
        const monthStart = new Date(currentYear, m, 1);
        const monthEnd = new Date(currentYear, m + 1, 0, 23, 59, 59);

        const mRfqs = requirements.filter(r => {
          const t = new Date(r.createdAt).getTime();
          return t >= monthStart.getTime() && t <= monthEnd.getTime();
        }).length;

        const mLeads = leads.filter(l => {
          const t = new Date(l.createdAt).getTime();
          return t >= monthStart.getTime() && t <= monthEnd.getTime();
        }).length;

        points.push({
          date: d,
          label: d.toLocaleDateString('en-GB', { month: 'short' }),
          count: mRfqs + mLeads,
          rfqs: mRfqs,
          leads: mLeads
        });
      }
    }

    return points;
  }, [requirements, leads, timeframe]);

  // Chart dimensions & scaling
  const width = 680;
  const height = 240;
  const padding = { top: 25, right: 30, bottom: 35, left: 45 };

  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  // Calculate dynamic max Y scale with clean rounding
  const rawMax = Math.max(...chartData.map(p => p.count), 0);
  // Ensure nice round grid numbers (min 40 if zero/low, or round up to next 10/20)
  const maxY = rawMax <= 10 ? 40 : Math.ceil(rawMax / 10) * 10;
  const yTicks = [0, maxY * 0.25, maxY * 0.5, maxY * 0.75, maxY];

  // Map data points to pixel coordinates
  const points = useMemo(() => {
    if (chartData.length === 0) return [];
    return chartData.map((d, i) => {
      const x = padding.left + (i / (chartData.length - 1 || 1)) * innerWidth;
      const y = padding.top + innerHeight - (d.count / maxY) * innerHeight;
      return { ...d, x, y };
    });
  }, [chartData, innerWidth, innerHeight, maxY, padding.left, padding.top]);

  // Smooth cubic bezier spline algorithm
  const { pathD, areaD } = useMemo(() => {
    if (points.length === 0) return { pathD: '', areaD: '' };
    if (points.length === 1) {
      const p = points[0];
      return {
        pathD: `M ${p.x} ${p.y}`,
        areaD: `M ${p.x} ${padding.top + innerHeight} L ${p.x} ${p.y} L ${p.x} ${padding.top + innerHeight} Z`
      };
    }

    // Build smooth cubic Bezier curve through all points
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i === 0 ? 0 : i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;

      const tension = 0.28;
      const cp1x = p1.x + (p2.x - p0.x) * tension;
      const cp1y = p1.y + (p2.y - p0.y) * tension;
      const cp2x = p2.x - (p3.x - p1.x) * tension;
      const cp2y = p2.y - (p3.y - p1.y) * tension;

      d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }

    const firstPoint = points[0];
    const lastPoint = points[points.length - 1];
    const baselineY = padding.top + innerHeight;
    const area = `${d} L ${lastPoint.x} ${baselineY} L ${firstPoint.x} ${baselineY} Z`;

    return { pathD: d, areaD: area };
  }, [points, innerHeight, padding.top]);

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E5E7EB',
        borderRadius: '12px',
        padding: '1.5rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
        position: 'relative'
      }}
    >
      {/* Header with Title and Dropdown */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <h3
          style={{
            fontFamily: 'var(--font-heading, Georgia, serif)',
            fontSize: '1.15rem',
            fontWeight: 700,
            color: '#111827',
            margin: 0
          }}
        >
          Enquiries Overview
        </h3>

        <div style={{ position: 'relative' }}>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as TimeframeOption)}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #D1D5DB',
              borderRadius: '8px',
              padding: '0.45rem 2rem 0.45rem 0.85rem',
              fontSize: '0.85rem',
              fontWeight: 500,
              color: '#374151',
              outline: 'none',
              cursor: 'pointer',
              appearance: 'none',
              WebkitAppearance: 'none',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)'
            }}
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">This Year</option>
          </select>
          <span
            style={{
              position: 'absolute',
              right: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              fontSize: '0.7rem',
              color: '#6B7280'
            }}
          >
            ▼
          </span>
        </div>
      </div>

      {/* Interactive SVG Chart Viewport */}
      <div style={{ width: '100%', position: 'relative' }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
          onMouseLeave={() => setHoveredPoint(null)}
        >
          <defs>
            <linearGradient id="splineGreenGradientLive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0D5C3A" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#0D5C3A" stopOpacity="0.01" />
            </linearGradient>
          </defs>

          {/* Y-Axis Horizontal Grid Lines */}
          <g stroke="#F3F4F6" strokeWidth="1">
            {yTicks.map((tick, i) => {
              const y = padding.top + innerHeight - (tick / maxY) * innerHeight;
              return (
                <line
                  key={i}
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke={tick === 0 ? '#E5E7EB' : '#F3F4F6'}
                />
              );
            })}
          </g>

          {/* Y-Axis Numerical Labels */}
          <g fill="#9CA3AF" fontSize="11" textAnchor="end" fontFamily="sans-serif">
            {yTicks.map((tick, i) => {
              const y = padding.top + innerHeight - (tick / maxY) * innerHeight;
              return (
                <text key={i} x={padding.left - 10} y={y + 4}>
                  {Math.round(tick)}
                </text>
              );
            })}
          </g>

          {/* Gradient Spline Area Fill */}
          {areaD && <path d={areaD} fill="url(#splineGreenGradientLive)" />}

          {/* Smooth Stroke Line */}
          {pathD && (
            <path
              d={pathD}
              fill="none"
              stroke="#0D5C3A"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Active Hover Vertical Guideline */}
          {hoveredPoint && (
            <line
              x1={hoveredPoint.x}
              y1={padding.top}
              x2={hoveredPoint.x}
              y2={padding.top + innerHeight}
              stroke="#0D5C3A"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              opacity="0.6"
            />
          )}

          {/* Interactive Data Points */}
          {points.map((p, i) => {
            const isHovered = hoveredPoint?.point.label === p.label;
            return (
              <g
                key={i}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHoveredPoint({ point: p, x: p.x, y: p.y })}
              >
                {/* Transparent wider hit area for easy hover on touch/mouse */}
                <circle cx={p.x} cy={p.y} r="18" fill="transparent" />

                {/* Outer halo when hovered */}
                {isHovered && (
                  <circle cx={p.x} cy={p.y} r="9" fill="#0D5C3A" opacity="0.2" />
                )}

                {/* Main White-Bordered Data Point Dot */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? 5.5 : 4.5}
                  fill="#0D5C3A"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  style={{ transition: 'r 0.15s ease' }}
                />
              </g>
            );
          })}

          {/* X-Axis Date Labels */}
          <g fill="#9CA3AF" fontSize="11" textAnchor="middle" fontFamily="sans-serif">
            {points.map((p, i) => (
              <text key={i} x={p.x} y={padding.top + innerHeight + 22}>
                {p.label}
              </text>
            ))}
          </g>
        </svg>

        {/* Floating Tooltip Bubble on Hover */}
        {hoveredPoint && (
          <div
            style={{
              position: 'absolute',
              left: `${(hoveredPoint.x / width) * 100}%`,
              top: `${(hoveredPoint.y / height) * 100}%`,
              transform: 'translate(-50%, -125%)',
              backgroundColor: '#111827',
              color: '#FFFFFF',
              padding: '0.5rem 0.75rem',
              borderRadius: '8px',
              fontSize: '0.78rem',
              pointerEvents: 'none',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
              zIndex: 20,
              whiteSpace: 'nowrap',
              lineHeight: 1.3
            }}
          >
            <div style={{ fontWeight: 700, color: '#4ADE80' }}>
              {hoveredPoint.point.label}
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, marginTop: '2px' }}>
              {hoveredPoint.point.count} Total Enquiries
            </div>
            {(hoveredPoint.point.rfqs > 0 || hoveredPoint.point.leads > 0) && (
              <div style={{ fontSize: '0.7rem', color: '#9CA3AF', marginTop: '3px' }}>
                {hoveredPoint.point.rfqs} RFQs • {hoveredPoint.point.leads} General Leads
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
