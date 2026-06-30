export interface GateRecord {
  id: number;
  gateName: string;
  status: 'Idle' | 'Active' | 'QC Check';
  activeShipment?: {
    carrier: string;
    poRef: string;
    qcCheck: 'Passed' | 'Pending';
  };
}
