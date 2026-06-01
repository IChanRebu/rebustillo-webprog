import { useRef } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { BarChart } from '@mui/x-charts/BarChart';
import { Gauge } from '@mui/x-charts/Gauge';
import { PieChart } from '@mui/x-charts/PieChart';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const ReportsPage = () => {
  const printRef = useRef(null);

  const handlePrint = () => {
    const printContent = printRef.current;

    if (!printContent) {
      return;
    }

    const printWindow = window.open('', '_blank', 'width=1200,height=800');

    if (!printWindow) {
      return;
    }

    const headMarkup = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map((node) => node.outerHTML)
      .join('');

    const exportedAt = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(new Date());

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Print Report</title>
          ${headMarkup}
          <style>
            * { box-sizing: border-box; }
            body {
              margin: 0;
              font-family: Arial, Helvetica, sans-serif;
              background: #020617;
              color: #f5f5f5;
            }
            .report-shell {
              padding: 24px;
            }
            .report-header {
              margin-bottom: 24px;
              padding-bottom: 16px;
              border-bottom: 1px solid rgba(255, 106, 0, 0.25);
            }
            .report-header h1 {
              margin: 0 0 8px;
              font-size: 28px;
              font-weight: 700;
              color: #ff6a00;
            }
            .report-header p {
              margin: 0;
              color: #cbd5e1;
              font-size: 14px;
            }
            .report-content .MuiCard-root {
              break-inside: avoid;
              page-break-inside: avoid;
              margin-bottom: 16px;
              background: #111827 !important;
              border: 1px solid rgba(255, 106, 0, 0.25) !important;
            }
            .report-content .MuiCardContent-root { padding: 20px !important; }
            .report-content svg { max-width: 100%; }
            @media print {
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              .no-print { display: none !important; }
            }
          </style>
        </head>
        <body>
          <main class="report-shell">
            <header class="report-header">
              <h1>System Overview</h1>
              <p>Metrics summary for generated reports, category breakdowns, and completion performance.</p>
              <p>Prepared at: ${exportedAt}</p>
            </header>
            <section class="report-content">
              ${printContent.outerHTML}
            </section>
          </main>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <Box
      sx={{
        background: '#020617',
        minHeight: '100vh',
        padding: 4,
        color: '#f5f5f5',
      }}
    >
      <Stack spacing={3}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 700 }} gutterBottom>
              Reports
            </Typography>
            <Typography variant="body1" sx={{ color: '#d1d5db' }}>
              Export analytics and system-generated reports with a bold VLONE-inspired interface.
            </Typography>
          </Box>

          <Button
            variant="contained"
            onClick={handlePrint}
            sx={{
              backgroundColor: '#ff6a00',
              color: '#000',
              px: 3,
              py: 1.5,
              '&:hover': {
                backgroundColor: '#ff8a3c',
              },
            }}
          >
            Print Report
          </Button>
        </Box>

        <Stack ref={printRef} spacing={3}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 2,
            }}
          >
            {[
              { label: 'Total Reports', value: '1,240' },
              { label: 'Completed', value: '920' },
              { label: 'Pending', value: '320' },
              { label: 'Success Rate', value: '85%' },
            ].map((stat) => (
              <Card
                key={stat.label}
                sx={{
                  background: '#111827',
                  border: '1px solid rgba(255, 106, 0, 0.24)',
                  color: '#f5f5f5',
                }}
              >
                <CardContent>
                  <Typography variant="subtitle2" sx={{ color: '#ffb37d', textTransform: 'uppercase', letterSpacing: 1.2 }}>
                    {stat.label}
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1, color: '#ffffff', fontWeight: 700 }}>
                    {stat.value}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Card sx={{ background: '#111827', border: '1px solid rgba(255, 106, 0, 0.24)' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
                Requests by User
              </Typography>
              <Typography variant="body2" sx={{ color: '#d1d5db', mb: 3 }}>
                Daily and monthly request distribution generated over the last reporting window.
              </Typography>
              <BarChart
                xAxis={[
                  {
                    scaleType: 'band',
                    data: ['January', 'February', 'March', 'April'],
                  },
                ]}
                series={[
                  {
                    data: [15, 22, 31, 28],
                    label: 'Generated',
                  },
                ]}
                height={320}
              />
            </CardContent>
          </Card>

          <Card sx={{ background: '#111827', border: '1px solid rgba(255, 106, 0, 0.24)' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
                User Breakdown
              </Typography>
              <Typography variant="body2" sx={{ color: '#d1d5db', mb: 3 }}>
                Percentage share of generated requests by category over the current reporting cycle.
              </Typography>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 10, label: 'Admin' },
                      { id: 1, value: 15, label: 'Support' },
                      { id: 2, value: 20, label: 'Success' },
                    ],
                  },
                ]}
                width={400}
                height={260}
              />
            </CardContent>
          </Card>

          <Card sx={{ background: '#111827', border: '1px solid rgba(255, 106, 0, 0.24)' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
                Completion Rate
              </Typography>
              <Typography variant="body2" sx={{ color: '#d1d5db', mb: 3 }}>
                The gauge highlights the current percentage of reports completed on time during the latest reporting cycle.
              </Typography>
              <Box sx={{ width: 250, height: 250, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Gauge value={85} text={({ value }) => `${value}%`} />
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ background: '#111827', border: '1px solid rgba(255, 106, 0, 0.24)' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
                User Data Table
              </Typography>
              <Typography variant="body2" sx={{ color: '#d1d5db', mb: 3 }}>
                Editable user information generated from report entries.
              </Typography>
              <Box sx={{ height: 420, width: '100%' }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                  pageSizeOptions={[5]}
                  checkboxSelection
                  disableRowSelectionOnClick
                  sx={{
                    bgcolor: '#020617',
                    color: '#f5f5f5',
                    border: '1px solid rgba(255, 106, 0, 0.24)',
                    '& .MuiDataGrid-columnHeaders': {
                      backgroundColor: '#111827',
                      color: '#ffffff',
                      borderBottom: '1px solid rgba(255, 106, 0, 0.25)',
                    },
                    '& .MuiDataGrid-cell': {
                      borderBottom: '1px solid rgba(255, 106, 0, 0.12)',
                    },
                    '& .MuiDataGrid-row:hover': {
                      backgroundColor: 'rgba(255, 106, 0, 0.08)',
                    },
                    '& .MuiDataGrid-footerContainer': {
                      borderTop: '1px solid rgba(255, 106, 0, 0.25)',
                      backgroundColor: '#111827',
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ReportsPage;