import React, { useEffect, useState, useMemo } from 'react';
import { requirementService } from '../../services/RequirementService';
import { CustomerRequirement, RequirementStatus } from '../../types';
import './AdminRequirements.css';

export const AdminRequirements: React.FC = () => {
  const [requirements, setRequirements] = useState<CustomerRequirement[]>([]);
  const [selectedReq, setSelectedReq] = useState<CustomerRequirement | null>(null);
  const [loading, setLoading] = useState(true);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<RequirementStatus | 'all'>('all');
  const [dateFilterType, setDateFilterType] = useState<'all' | 'year' | 'month' | 'range'>('all');
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
  const [selectedMonth, setSelectedMonth] = useState<string>(`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  // Internal Note State
  const [newNote, setNewNote] = useState('');
  const [exportFeedback, setExportFeedback] = useState<string | null>(null);

  const loadRequirements = async () => {
    setLoading(true);
    try {
      const res = await requirementService.getRequirements();
      setRequirements(res);
    } catch (err) {
      console.error('Failed to fetch requirements:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequirements();
  }, []);

  const handleStatusChange = async (reqId: string, status: RequirementStatus) => {
    await requirementService.updateStatus(reqId, status);
    loadRequirements();
    if (selectedReq && selectedReq.id === reqId) {
      setSelectedReq(prev => prev ? { ...prev, status } : null);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReq || !newNote.trim()) return;

    await requirementService.updateStatus(selectedReq.id, selectedReq.status, newNote.trim());
    setNewNote('');
    loadRequirements();
    const updated = await requirementService.getRequirementById(selectedReq.id);
    setSelectedReq(updated);
  };

  // Available Years from dataset
  const availableYears = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const years = new Set<string>([currentYear.toString(), (currentYear - 1).toString()]);
    requirements.forEach(r => {
      if (r.createdAt) {
        const y = new Date(r.createdAt).getFullYear().toString();
        if (y && !isNaN(Number(y))) years.add(y);
      }
    });
    return Array.from(years).sort((a, b) => Number(b) - Number(a));
  }, [requirements]);

  // Filtered Requirements
  const filteredRequirements = useMemo(() => {
    return requirements.filter((req) => {
      // 1. Status Filter
      if (statusFilter !== 'all' && req.status !== statusFilter) {
        return false;
      }

      // 2. Date Filter
      if (req.createdAt) {
        const reqDate = new Date(req.createdAt);
        const reqYear = reqDate.getFullYear().toString();
        const reqMonth = `${reqYear}-${String(reqDate.getMonth() + 1).padStart(2, '0')}`;
        const reqDateString = reqDate.toISOString().slice(0, 10);

        if (dateFilterType === 'year' && reqYear !== selectedYear) {
          return false;
        }
        if (dateFilterType === 'month' && reqMonth !== selectedMonth) {
          return false;
        }
        if (dateFilterType === 'range') {
          if (startDate && reqDateString < startDate) return false;
          if (endDate && reqDateString > endDate) return false;
        }
      }

      // 3. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const searchableFields = [
          req.referenceNumber,
          req.contact?.fullName,
          req.contact?.email,
          req.contact?.phone,
          req.contact?.country,
          req.contact?.cityOrPort,
          req.contact?.companyName,
          req.productName,
          req.botanicalOrInciName,
          req.applicationUse,
          req.specificationStandard,
          req.packagingPreference,
          req.additionalNotes,
          ...(req.adminNotes || [])
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        if (!searchableFields.includes(query)) {
          return false;
        }
      }

      return true;
    });
  }, [requirements, statusFilter, dateFilterType, selectedYear, selectedMonth, startDate, endDate, searchQuery]);

  // Dynamic Status Counts (overall & for quick view)
  const statusCounts = useMemo(() => {
    const counts = {
      all: requirements.length,
      new: 0,
      'in-review': 0,
      quoted: 0,
      fulfilled: 0,
      archived: 0
    };
    requirements.forEach(r => {
      if (counts[r.status] !== undefined) {
        counts[r.status]++;
      }
    });
    return counts;
  }, [requirements]);

  // Export to Excel / CSV Function
  const handleExportToExcel = () => {
    // If table has filtered items, export filtered. If no filter applied, exports all RFQ items till date.
    const dataToExport = filteredRequirements.length > 0 ? filteredRequirements : requirements;

    if (dataToExport.length === 0) {
      alert('No RFQ records available to export.');
      return;
    }

    const headers = [
      'Reference No',
      'Submission Date',
      'Status',
      'Client Name',
      'Company Name',
      'Email ID',
      'Phone Number',
      'Country',
      'City / Port',
      'Ingredient / Material Name',
      'Botanical / INCI Name',
      'Required Quantity',
      'Quantity Unit',
      'Application / Intended Use',
      'Specification Standard',
      'Packaging Preference',
      'Client Notes',
      'Attached Documents Count',
      'Attached File Names',
      'Internal Operational Notes'
    ];

    const escapeCsv = (val: string | number | undefined | null): string => {
      if (val === undefined || val === null) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const csvRows: string[] = [];
    csvRows.push(headers.map(escapeCsv).join(','));

    dataToExport.forEach((req) => {
      const formattedDate = req.createdAt ? new Date(req.createdAt).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }) : '';

      const docNames = (req.documents || []).map(d => d.name).join('; ');
      const adminNotesStr = (req.adminNotes || []).join(' | ');

      const row = [
        escapeCsv(req.referenceNumber),
        escapeCsv(formattedDate),
        escapeCsv(req.status.toUpperCase()),
        escapeCsv(req.contact?.fullName || ''),
        escapeCsv(req.contact?.companyName || ''),
        escapeCsv(req.contact?.email || ''),
        escapeCsv(req.contact?.phone || ''),
        escapeCsv(req.contact?.country || ''),
        escapeCsv(req.contact?.cityOrPort || ''),
        escapeCsv(req.productName || ''),
        escapeCsv(req.botanicalOrInciName || ''),
        escapeCsv(req.requiredQuantity || ''),
        escapeCsv(req.quantityUnit || ''),
        escapeCsv(req.applicationUse || ''),
        escapeCsv(req.specificationStandard || ''),
        escapeCsv(req.packagingPreference || ''),
        escapeCsv(req.additionalNotes || ''),
        escapeCsv(req.documents?.length || 0),
        escapeCsv(docNames),
        escapeCsv(adminNotesStr)
      ];

      csvRows.push(row.join(','));
    });

    // UTF-8 BOM for Excel native compatibility
    const csvContent = '\uFEFF' + csvRows.join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    const dateSlug = new Date().toISOString().slice(0, 10);
    const filterSlug = statusFilter !== 'all' ? `_${statusFilter}` : '_all';
    link.setAttribute('href', url);
    link.setAttribute('download', `Yami_Naturals_RFQs_${dateSlug}${filterSlug}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setExportFeedback(`Exported ${dataToExport.length} RFQ record(s) to Excel successfully!`);
    setTimeout(() => setExportFeedback(null), 4000);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setDateFilterType('all');
    setStartDate('');
    setEndDate('');
  };

  const isFiltered = searchQuery !== '' || statusFilter !== 'all' || dateFilterType !== 'all';

  return (
    <div className="rfq-admin-container animate-fade-in">
      {/* 1. Compact Header with RFQ Heading & Action Buttons Side-by-Side */}
      <div className="rfq-header">
        <div className="rfq-header-left">
          <h1 className="rfq-main-title">RFQ</h1>
        </div>

        <div className="rfq-header-actions">
          <a
            href="/submit-requirement"
            target="_blank"
            rel="noopener noreferrer"
            className="rfq-btn-link"
          >
            🌐 Public RFQ Form ↗
          </a>

          <button
            type="button"
            className="rfq-btn-refresh"
            onClick={loadRequirements}
            title="Refresh RFQs list"
          >
            🔄 Refresh
          </button>

          <button
            type="button"
            className="rfq-btn-export"
            onClick={handleExportToExcel}
            disabled={loading}
            title="Export RFQs to Excel CSV"
          >
            📥 Export to Excel
          </button>
        </div>
      </div>

      {/* Export Confirmation Feedback */}
      {exportFeedback && (
        <div style={{
          backgroundColor: '#ECFDF5',
          color: '#065F46',
          border: '1px solid #A7F3D0',
          padding: '0.65rem 1rem',
          borderRadius: '6px',
          fontSize: '0.8125rem',
          fontWeight: 600,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>✅ {exportFeedback}</span>
          <button
            type="button"
            onClick={() => setExportFeedback(null)}
            style={{ background: 'none', border: 'none', color: '#065F46', cursor: 'pointer', fontWeight: 'bold' }}
          >
            ✕
          </button>
        </div>
      )}

      {/* 2. Compact Search & Filter Toolbar */}
      <div className="rfq-filters-card">
        {/* Search Box */}
        <div className="rfq-search-box">
          <span className="rfq-search-icon">🔍</span>
          <input
            type="text"
            className="rfq-search-input"
            placeholder="Search Ref No, Client, Email, Country, Ingredient..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="rfq-search-clear"
              onClick={() => setSearchQuery('')}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Status Pills */}
        <div className="rfq-status-pills">
          {(['all', 'new', 'in-review', 'quoted', 'archived'] as const).map((st) => (
            <button
              key={st}
              type="button"
              className={`rfq-status-pill ${statusFilter === st ? 'active' : ''}`}
              onClick={() => setStatusFilter(st)}
            >
              <span>{st === 'all' ? 'ALL' : st === 'in-review' ? 'IN-REVIEW' : st.toUpperCase()}</span>
              <span className="rfq-pill-count">{statusCounts[st] || 0}</span>
            </button>
          ))}
        </div>

        {/* Date Filters Inline */}
        <div className="rfq-date-filters">
          <select
            className="rfq-select"
            value={dateFilterType}
            onChange={(e) => setDateFilterType(e.target.value as any)}
            title="Filter by Date"
          >
            <option value="all">📅 All Dates</option>
            <option value="year">📅 Year wise</option>
            <option value="month">📅 Month wise</option>
            <option value="range">📅 Date Range</option>
          </select>

          {dateFilterType === 'year' && (
            <select
              className="rfq-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {availableYears.map((yr) => (
                <option key={yr} value={yr}>Year {yr}</option>
              ))}
            </select>
          )}

          {dateFilterType === 'month' && (
            <input
              type="month"
              className="rfq-date-input"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            />
          )}

          {dateFilterType === 'range' && (
            <div className="rfq-date-range-inputs">
              <input
                type="date"
                className="rfq-date-input"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                title="From Date"
              />
              <span className="rfq-date-separator">-</span>
              <input
                type="date"
                className="rfq-date-input"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                title="To Date"
              />
            </div>
          )}

          {isFiltered && (
            <button
              type="button"
              className="rfq-btn-reset-filters"
              onClick={handleResetFilters}
              title="Reset all filters"
            >
              ✕ Reset
            </button>
          )}
        </div>
      </div>

      {/* 3. RFQ Table */}
      <div className="rfq-table-card">
        <div className="rfq-table-wrapper">
          <table className="rfq-table">
            <thead>
              <tr>
                <th>Ref. Number</th>
                <th>Date</th>
                <th>Client Name</th>
                <th>Email ID</th>
                <th>Phone Number</th>
                <th>Country</th>
                <th>Company Name</th>
                <th>Ingredient Name</th>
                <th>Status</th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={10} style={{ textAlign: 'center', padding: '3rem', color: '#6B7280' }}>
                    Loading RFQ records...
                  </td>
                </tr>
              ) : filteredRequirements.length === 0 ? (
                <tr>
                  <td colSpan={10} style={{ textAlign: 'center', padding: '3.5rem 1rem', color: '#6B7280' }}>
                    <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>📭</div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#374151' }}>No RFQs found matching criteria.</div>
                    <div style={{ fontSize: '0.8125rem', marginTop: '0.25rem' }}>
                      {isFiltered ? 'Try adjusting your search or filters.' : 'Inbound requirements submitted via /submit-requirement will appear here.'}
                    </div>
                    {isFiltered && (
                      <button
                        type="button"
                        onClick={handleResetFilters}
                        style={{
                          marginTop: '0.75rem',
                          padding: '0.35rem 0.75rem',
                          fontSize: '0.75rem',
                          color: '#0F5338',
                          background: '#ECFDF5',
                          border: '1px solid #A7F3D0',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontWeight: 600
                        }}
                      >
                        Reset All Filters
                      </button>
                    )}
                  </td>
                </tr>
              ) : (
                filteredRequirements.map((req) => {
                  const reqDate = req.createdAt ? new Date(req.createdAt) : null;
                  const formattedDate = reqDate ? reqDate.toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  }) : '—';

                  const getStatusClass = (st: RequirementStatus) => {
                    switch (st) {
                      case 'new': return 'rfq-status-new';
                      case 'in-review': return 'rfq-status-in-review';
                      case 'quoted': return 'rfq-status-quoted';
                      case 'fulfilled': return 'rfq-status-fulfilled';
                      case 'archived': return 'rfq-status-archived';
                      default: return '';
                    }
                  };

                  return (
                    <tr key={req.id}>
                      {/* 1. Ref. Number */}
                      <td>
                        <span className="rfq-ref-badge" title={req.referenceNumber}>
                          {req.referenceNumber}
                        </span>
                      </td>

                      {/* 2. Date */}
                      <td style={{ whiteSpace: 'nowrap', fontSize: '0.75rem', color: '#6B7280' }}>
                        {formattedDate}
                      </td>

                      {/* 3. Client Name */}
                      <td>
                        <div className="rfq-cell-client">
                          <span className="rfq-client-name">{req.contact?.fullName || '—'}</span>
                        </div>
                      </td>

                      {/* 4. Email ID */}
                      <td>
                        {req.contact?.email ? (
                          <a
                            href={`mailto:${req.contact.email}?subject=RFQ Ref: ${req.referenceNumber} - Yami Naturals`}
                            className="rfq-cell-link"
                            title={`Send email to ${req.contact.email}`}
                          >
                            {req.contact.email}
                          </a>
                        ) : '—'}
                      </td>

                      {/* 5. Phone Number */}
                      <td>
                        {req.contact?.phone ? (
                          <a
                            href={`tel:${req.contact.phone.replace(/\s+/g, '')}`}
                            className="rfq-cell-link"
                            title={`Call ${req.contact.phone}`}
                          >
                            {req.contact.phone}
                          </a>
                        ) : '—'}
                      </td>

                      {/* 6. Country */}
                      <td>
                        <div className="rfq-cell-country">
                          <span>{req.contact?.country || '—'}</span>
                          {req.contact?.cityOrPort && (
                            <span style={{ fontSize: '0.6875rem', color: '#6B7280' }}>
                              ({req.contact.cityOrPort})
                            </span>
                          )}
                        </div>
                      </td>

                      {/* 7. Company Name */}
                      <td style={{ fontWeight: 500, color: '#111827' }}>
                        {req.contact?.companyName || '—'}
                      </td>

                      {/* 8. Ingredient Name */}
                      <td>
                        <div className="rfq-cell-ingredient">
                          <div className="rfq-ingredient-title" title={req.productName}>
                            {req.productName}
                          </div>
                          <div className="rfq-ingredient-qty">
                            {req.requiredQuantity} {req.quantityUnit}
                          </div>
                        </div>
                      </td>

                      {/* 9. Status Quick Action */}
                      <td>
                        <select
                          className={`rfq-status-select ${getStatusClass(req.status)}`}
                          value={req.status}
                          onChange={(e) => handleStatusChange(req.id, e.target.value as RequirementStatus)}
                          title="Change RFQ status"
                        >
                          <option value="new">NEW</option>
                          <option value="in-review">IN-REVIEW</option>
                          <option value="quoted">QUOTED</option>
                          <option value="fulfilled">FULFILLED</option>
                          <option value="archived">ARCHIVED</option>
                        </select>
                      </td>

                      {/* 10. View Button */}
                      <td style={{ textAlign: 'center' }}>
                        <div className="rfq-action-btns" style={{ justifyContent: 'center' }}>
                          <button
                            type="button"
                            className="rfq-btn-view"
                            onClick={() => setSelectedReq(req)}
                            title="View Full RFQ Details"
                          >
                            👁️ View
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer Summary */}
        <div className="rfq-table-footer">
          <div>
            Showing <strong>{filteredRequirements.length}</strong> of <strong>{requirements.length}</strong> total RFQs
            {isFiltered && ' (filtered view)'}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button
              type="button"
              className="rfq-btn-link"
              onClick={handleExportToExcel}
              style={{ padding: '0.3rem 0.65rem' }}
            >
              📥 Export {isFiltered ? 'Filtered' : 'All'} to Excel
            </button>
          </div>
        </div>
      </div>

      {/* 4. Detailed RFQ View Modal */}
      {selectedReq && (
        <div className="rfq-modal-overlay" onClick={() => setSelectedReq(null)}>
          <div className="rfq-modal-dialog" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            {/* Modal Header with Ref No, Close Button & Pinned Workflow Actions */}
            <div className="rfq-modal-header">
              <div className="rfq-modal-header-top">
                <div className="rfq-modal-header-info">
                  <span className="rfq-ref-badge" style={{ fontSize: '0.85rem' }}>
                    {selectedReq.referenceNumber}
                  </span>
                  <h3 className="rfq-modal-title">RFQ Details</h3>
                  <span className={`rfq-status-select ${
                    selectedReq.status === 'new' ? 'rfq-status-new' :
                    selectedReq.status === 'in-review' ? 'rfq-status-in-review' :
                    selectedReq.status === 'quoted' ? 'rfq-status-quoted' :
                    selectedReq.status === 'fulfilled' ? 'rfq-status-fulfilled' : 'rfq-status-archived'
                  }`}>
                    {selectedReq.status.toUpperCase()}
                  </span>
                </div>
                <button
                  type="button"
                  className="rfq-modal-close"
                  onClick={() => setSelectedReq(null)}
                  title="Close"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {/* Integrated Workflow & Meta Toolbar */}
              <div className="rfq-modal-workflow-bar">
                <div className="rfq-workflow-actions">
                  <span className="rfq-workflow-label">Workflow:</span>
                  {(['new', 'in-review', 'quoted', 'fulfilled', 'archived'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      className={`rfq-workflow-btn ${selectedReq.status === st ? 'active' : ''}`}
                      onClick={() => handleStatusChange(selectedReq.id, st)}
                      title={`Change status to ${st}`}
                    >
                      {st === 'in-review' ? 'In-Review' : st.toUpperCase()}
                    </button>
                  ))}
                </div>
                <div className="rfq-workflow-meta">
                  <span>📅 {new Date(selectedReq.createdAt).toLocaleDateString()}</span>
                  <span className="rfq-ref-badge" style={{ fontSize: '0.72rem' }}>
                    {selectedReq.requirementType}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="rfq-modal-body">
              {/* Section 1: Material & Specs */}
              <div className="rfq-modal-section">
                <h4 className="rfq-section-title">🌿 Material & Quantity Specifications</h4>
                <div className="rfq-grid-2">
                  <div className="rfq-detail-item">
                    <span className="rfq-detail-label">Ingredient / Target Material</span>
                    <span className="rfq-detail-value" style={{ fontWeight: 700, color: '#0F5338', fontSize: '0.95rem' }}>
                      {selectedReq.productName}
                    </span>
                  </div>

                  {selectedReq.botanicalOrInciName && (
                    <div className="rfq-detail-item">
                      <span className="rfq-detail-label">Botanical / INCI Name</span>
                      <span className="rfq-detail-value" style={{ fontStyle: 'italic' }}>
                        {selectedReq.botanicalOrInciName}
                      </span>
                    </div>
                  )}

                  <div className="rfq-detail-item">
                    <span className="rfq-detail-label">Required Quantity & Unit</span>
                    <span className="rfq-detail-value" style={{ fontWeight: 700 }}>
                      {selectedReq.requiredQuantity} {selectedReq.quantityUnit}
                    </span>
                  </div>

                  <div className="rfq-detail-item">
                    <span className="rfq-detail-label">Intended Application</span>
                    <span className="rfq-detail-value">{selectedReq.applicationUse || 'General Wholesale / Formulation'}</span>
                  </div>

                  {selectedReq.specificationStandard && (
                    <div className="rfq-detail-item">
                      <span className="rfq-detail-label">Specification Standard</span>
                      <span className="rfq-detail-value">{selectedReq.specificationStandard}</span>
                    </div>
                  )}

                  {selectedReq.packagingPreference && (
                    <div className="rfq-detail-item">
                      <span className="rfq-detail-label">Packaging Preference</span>
                      <span className="rfq-detail-value">{selectedReq.packagingPreference}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Section 2: Buyer Contact & Port Details */}
              <div className="rfq-modal-section">
                <h4 className="rfq-section-title">👤 Buyer & Delivery Information</h4>
                <div className="rfq-grid-2">
                  <div className="rfq-detail-item">
                    <span className="rfq-detail-label">Full Name</span>
                    <span className="rfq-detail-value" style={{ fontWeight: 600 }}>
                      {selectedReq.contact?.fullName}
                    </span>
                  </div>

                  <div className="rfq-detail-item">
                    <span className="rfq-detail-label">Company Name</span>
                    <span className="rfq-detail-value">
                      {selectedReq.contact?.companyName || '— (Direct Buyer)'}
                    </span>
                  </div>

                  <div className="rfq-detail-item">
                    <span className="rfq-detail-label">Email ID</span>
                    <a
                      href={`mailto:${selectedReq.contact?.email}?subject=RFQ ${selectedReq.referenceNumber} - Yami Naturals`}
                      className="rfq-cell-link"
                      style={{ fontWeight: 600 }}
                    >
                      ✉️ {selectedReq.contact?.email}
                    </a>
                  </div>

                  <div className="rfq-detail-item">
                    <span className="rfq-detail-label">Phone / WhatsApp</span>
                    <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                      <a
                        href={`tel:${selectedReq.contact?.phone?.replace(/\s+/g, '')}`}
                        className="rfq-cell-link"
                      >
                        📞 {selectedReq.contact?.phone}
                      </a>
                      {selectedReq.contact?.phone && (
                        <a
                          href={`https://wa.me/${selectedReq.contact.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            fontSize: '0.75rem',
                            color: '#059669',
                            textDecoration: 'none',
                            fontWeight: 600,
                            backgroundColor: '#ECFDF5',
                            padding: '0.1rem 0.4rem',
                            borderRadius: '3px',
                            border: '1px solid #A7F3D0'
                          }}
                        >
                          💬 WhatsApp
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="rfq-detail-item">
                    <span className="rfq-detail-label">Country</span>
                    <span className="rfq-detail-value">
                      🌍 {selectedReq.contact?.country || '—'}
                    </span>
                  </div>

                  {selectedReq.contact?.cityOrPort && (
                    <div className="rfq-detail-item">
                      <span className="rfq-detail-label">Destination Port / City</span>
                      <span className="rfq-detail-value">
                        ⚓ {selectedReq.contact.cityOrPort}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Section 3: Client Notes / Message */}
              {selectedReq.additionalNotes && (
                <div className="rfq-modal-section">
                  <h4 className="rfq-section-title">📝 Client Requirements Note</h4>
                  <div style={{ padding: '0.75rem 1rem', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '6px', fontSize: '0.8125rem', color: '#374151', whiteSpace: 'pre-wrap' }}>
                    {selectedReq.additionalNotes}
                  </div>
                </div>
              )}

              {/* Section 4: Attached Files */}
              <div className="rfq-modal-section">
                <h4 className="rfq-section-title">
                  📎 Attached Files & Test Specs ({selectedReq.documents?.length || 0})
                </h4>
                {(!selectedReq.documents || selectedReq.documents.length === 0) ? (
                  <p style={{ fontSize: '0.8125rem', color: '#6B7280', margin: 0 }}>
                    No spec sheets or COA documents were attached with this submission.
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {selectedReq.documents.map((doc) => (
                      <div key={doc.id} className="rfq-doc-card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '1.1rem' }}>📄</span>
                          <div>
                            <div style={{ fontWeight: 600, color: '#111827' }}>{doc.name}</div>
                            <div style={{ fontSize: '0.6875rem', color: '#6B7280' }}>
                              {(doc.sizeBytes / 1024).toFixed(1)} KB • {doc.mimeType || 'Document'}
                            </div>
                          </div>
                        </div>
                        {doc.previewUrl && (
                          <a
                            href={doc.previewUrl}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              color: '#0F5338',
                              padding: '0.3rem 0.6rem',
                              backgroundColor: '#ECFDF5',
                              borderRadius: '4px',
                              border: '1px solid #A7F3D0',
                              textDecoration: 'none'
                            }}
                          >
                            Inspect / Download ↗
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Section 5: Internal Admin Operational Notes */}
              <div className="rfq-modal-section">
                <h4 className="rfq-section-title">🔒 Internal Admin Logs & Notes</h4>
                {(!selectedReq.adminNotes || selectedReq.adminNotes.length === 0) ? (
                  <p style={{ fontSize: '0.8125rem', color: '#6B7280', margin: 0 }}>
                    No internal operational notes logged yet.
                  </p>
                ) : (
                  <ul className="rfq-notes-list">
                    {selectedReq.adminNotes.map((note, index) => (
                      <li key={index} className="rfq-note-item">
                        {note}
                      </li>
                    ))}
                  </ul>
                )}

                <form onSubmit={handleAddNote} style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <input
                    type="text"
                    placeholder="Log internal note (e.g. Quoted $14/kg FOB, sent COA to buyer)..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.8125rem',
                      border: '1px solid #D1D5DB',
                      borderRadius: '6px'
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      padding: '0.5rem 0.85rem',
                      backgroundColor: '#0F5338',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    + Add Note
                  </button>
                </form>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="rfq-modal-footer">
              <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                ID: {selectedReq.id}
              </span>
              <button
                type="button"
                className="rfq-btn-export"
                style={{ padding: '0.4rem 0.85rem' }}
                onClick={() => setSelectedReq(null)}
              >
                Done / Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
