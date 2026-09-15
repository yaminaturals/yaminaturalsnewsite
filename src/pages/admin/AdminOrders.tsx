import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card/Card';
import { Badge } from '../../components/ui/Badge/Badge';
import { requirementService } from '../../services/RequirementService';
import { CustomerRequirement } from '../../types';

export const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<CustomerRequirement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requirementService.getRequirements().then(reqs => {
      // Show fulfilled or active sourcing orders
      setOrders(reqs);
      setLoading(false);
    });
  }, []);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ borderBottom: '1px solid #E5E7EB', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111827', margin: 0 }}>Orders & Sourcing Pipeline</h1>
        <p style={{ fontSize: '0.875rem', color: '#6B7280', margin: '0.25rem 0 0' }}>
          Consolidated tracking of custom international consignments, bulk MOQ fulfillments, and purchase contracts.
        </p>
      </div>

      <Card variant="surface" padding="lg">
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 1.25rem 0' }}>Active Sourcing Log ({orders.length})</h3>

        {loading ? (
          <p style={{ color: '#6B7280' }}>Loading orders...</p>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#6B7280' }}>
            No orders in pipeline yet.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ textAlign: 'left', color: '#6B7280', borderBottom: '1px solid #E5E7EB', fontSize: '0.8rem' }}>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Contract Ref</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Customer / Importer</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Botanical Material</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Batch Volume</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Destination Port</th>
                  <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Workflow Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <td style={{ padding: '0.75rem 0.5rem', fontWeight: 700, color: '#0D5C3A' }}>
                      {o.referenceNumber}
                    </td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>
                      <strong>{o.contact.companyName || o.contact.fullName}</strong>
                      <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>{o.contact.country}</div>
                    </td>
                    <td style={{ padding: '0.75rem 0.5rem', fontWeight: 500 }}>
                      {o.productName}
                    </td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>
                      {o.requiredQuantity} {o.quantityUnit}
                    </td>
                    <td style={{ padding: '0.75rem 0.5rem', color: '#6B7280' }}>
                      {o.contact.cityOrPort || 'FOB Mumbai'}
                    </td>
                    <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>
                      <Badge variant={o.status === 'quoted' ? 'success' : 'primary'}>
                        {o.status.toUpperCase()}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};
