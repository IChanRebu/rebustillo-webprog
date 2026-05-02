import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BarChart } from '@mui/x-charts/BarChart';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Gauge } from '@mui/x-charts/Gauge';
import { Typography, Card, CardContent, Button, Chip, ThemeProvider, createTheme } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
 
// Modern Ulquiorra dashboard theme
const dashboardTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#8b5cf6',
            light: '#a78bfa',
            dark: '#5b21b6',
        },
        secondary: {
            main: '#22d3ee',
            light: '#67e8f9',
            dark: '#0ea5e9',
        },
        success: {
            main: '#22c55e',
        },
        warning: {
            main: '#f59e0b',
        },
        error: {
            main: '#ef4444',
        },
        background: {
            default: '#000000',
            paper: '#050509',
        },
        text: {
            primary: '#f8fafc',
            secondary: '#94a3b8',
        },
        divider: 'rgba(148, 163, 184, 0.12)',
        action: {
            hover: 'rgba(139, 92, 246, 0.16)',
            selected: 'rgba(79, 70, 229, 0.22)',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h3: {
            fontWeight: 800,
            fontSize: '2rem',
            letterSpacing: '-0.5px',
            marginBottom: '1rem',
            color: '#f8fafc',
        },
        h5: {
            fontWeight: 700,
            fontSize: '1.35rem',
            color: '#f8fafc',
        },
        h6: {
            fontWeight: 600,
            fontSize: '0.9rem',
            color: '#94a3b8',
            textTransform: 'uppercase',
            letterSpacing: '0.4px',
        },
        body2: {
            fontSize: '0.95rem',
            color: '#cbd5e1',
            lineHeight: 1.7,
        },
    },
    shape: { borderRadius: 16 },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#050509',
                    border: '1px solid rgba(148, 163, 184, 0.12)',
                    boxShadow: '0 24px 60px rgba(0, 0, 0, 0.35)',
                    '&:hover': {
                        borderColor: 'rgba(139, 92, 246, 0.3)',
                        transform: 'translateY(-2px)',
                    },
                },
            },
        },
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    border: 'none',
                    borderRadius: '16px',
                    backgroundColor: '#020617',
                    color: '#e2e8f0',
                },
                columnHeaders: {
                    backgroundColor: '#0f172a',
                    borderBottom: '1px solid rgba(148, 163, 184, 0.12)',
                    color: '#e2e8f0',
                },
                row: {
                    '&:nth-of-type(odd)': {
                        backgroundColor: '#081126',
                    },
                    '&:hover': {
                        backgroundColor: '#111827',
                    },
                },
                cell: {
                    borderBottom: '1px solid rgba(148, 163, 184, 0.08)',
                },
            },
        },
    },
});
 
const columns = [
    { field: 'id', headerName: 'ID', width: 70, headerAlign: 'left' },
    {
        field: 'firstName',
        headerName: 'First Name',
        width: 140,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last Name',
        width: 140,
        editable: true,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 100,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Full Name',
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
 
function DashboardPage() {
    const location = useLocation();
 
    const avgAge = (
        rows.reduce((sum, row) => sum + (row.age || 0), 0) /
        rows.filter((row) => row.age !== null).length
    ).toFixed(1);
 
    return (
        <ThemeProvider theme={dashboardTheme}>
            <Box sx={{ maxWidth: '1600px', mx: 'auto', bgcolor: 'background.default', minHeight: '100vh', px: { xs: 2, md: 3 }, py: 6 }}> 
                {/* Page Header */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h3">Ulquiorra Dashboard</Typography>
                    <Typography variant="body2" sx={{ mt: 0.75, color: 'text.secondary' }}>
                        A calm, focused view of your performance data and system metrics.
                    </Typography>
                </Box>
 
                {/* Summary Cards Section */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {/* Total Users Card */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ p: 3, background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.96) 0%, rgba(17, 24, 39, 0.94) 100%)' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Box>
                                    <Typography variant="h6" sx={{ mb: 1.5 }}>
                                        Total Users
                                    </Typography>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: 700,
                                            fontSize: '2rem',
                                            color: '#4f46e5',
                                        }}
                                    >
                                        {rows.length}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1.5 }}>
                                        <TrendingUpIcon sx={{ fontSize: '1rem', color: '#10b981', mr: 0.5 }} />
                                        <Typography variant="body2" sx={{ color: '#10b981' }}>
                                            12% increase
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
 
                    {/* Average Age Card */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ p: 3, background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.96) 0%, rgba(17, 24, 39, 0.94) 100%)' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Box>
                                    <Typography variant="h6" sx={{ mb: 1.5 }}>
                                        Average Age
                                    </Typography>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: 700,
                                            fontSize: '2rem',
                                            color: '#06b6d4',
                                        }}
                                    >
                                        {avgAge}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1.5 }}>
                                        <Chip
                                            label="Current"
                                            size="small"
                                            variant="outlined"
                                            sx={{
                                                height: '24px',
                                                borderColor: '#cbd5e1',
                                                color: '#64748b',
                                            }}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
 
                    {/* Active Status Card */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ p: 3, background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.96) 0%, rgba(17, 24, 39, 0.94) 100%)' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Box>
                                    <Typography variant="h6" sx={{ mb: 1.5 }}>
                                        Active Users
                                    </Typography>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: 700,
                                            fontSize: '2rem',
                                            color: '#10b981',
                                        }}
                                    >
                                        {Math.round(rows.length * 0.85)}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1.5 }}>
                                        <Box
                                            sx={{
                                                width: '8px',
                                                height: '8px',
                                                borderRadius: '50%',
                                                backgroundColor: '#10b981',
                                                mr: 0.5,
                                            }}
                                        />
                                        <Typography variant="body2" sx={{ color: '#10b981' }}>
                                            Last 24h
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
 
                {/* Charts Section */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {/* Progress Gauges */}
                    <Grid item xs={12} sm={6}>
                        <Card sx={{ p: 3, background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.96) 0%, rgba(17, 24, 39, 0.94) 100%)' }}>
                            <Typography variant="h5" sx={{ mb: 3, color: '#f8fafc' }}>
                                Performance Metrics
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: 2 }}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Gauge
                                        width={140}
                                        height={140}
                                        value={50}
                                        startAngle={-110}
                                        endAngle={110}
                                        sx={{
                                            '& .MuiGauge-arc': {
                                                stroke: '#4f46e5',
                                            },
                                            '& .MuiGauge-valueText': {
                                                fill: '#4f46e5',
                                            },
                                        }}
                                    />
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        Performance
                                    </Typography>
                                </Box>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Gauge
                                        width={140}
                                        height={140}
                                        value={75}
                                        startAngle={-110}
                                        endAngle={110}
                                        valueMin={0}
                                        valueMax={100}
                                        sx={{
                                            '& .MuiGauge-arc': {
                                                stroke: '#06b6d4',
                                            },
                                            '& .MuiGauge-valueText': {
                                                fill: '#06b6d4',
                                            },
                                        }}
                                    />
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        Engagement
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
 
                    {/* Pie Chart */}
                    <Grid item xs={12} sm={6}>
                        <Card sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.96) 0%, rgba(17, 24, 39, 0.94) 100%)' }}>
                            <Typography variant="h5" sx={{ mb: 3, width: '100%', color: '#f8fafc' }}>
                                Category Distribution
                            </Typography>
                            <PieChart
                                series={[
                                    {
                                        data: [
                                            { id: 0, value: 30, label: 'Premium', color: '#4f46e5' },
                                            { id: 1, value: 25, label: 'Standard', color: '#06b6d4' },
                                            { id: 2, value: 20, label: 'Basic', color: '#10b981' },
                                        ],
                                    },
                                ]}
                                width={380}
                                height={250}
                                margin={{ top: 10, bottom: 10, left: 50, right: 50 }}
                                slotProps={{
                                    legend: {
                                        direction: 'row',
                                        position: { vAlign: 'bottom', hAlign: 'middle' },
                                    },
                                }}
                            />
                        </Card>
                    </Grid>
                </Grid>
 
                {/* Bar Chart */}
                <Card sx={{ p: 3, mb: 4, background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.96) 0%, rgba(17, 24, 39, 0.94) 100%)' }}>
                    <Typography variant="h5" sx={{ mb: 3, color: '#f8fafc' }}>
                        Quarterly Performance
                    </Typography>
                    <Box sx={{ overflowX: 'auto' }}>
                        <BarChart
                            series={[
                                { data: [35, 44, 24, 34], label: 'Sales', color: '#4f46e5' },
                                { data: [51, 6, 49, 30], label: 'Revenue', color: '#06b6d4' },
                            ]}
                            height={350}
                            xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
                            margin={{ top: 10, bottom: 30, left: 60, right: 10 }}
                            slotProps={{
                                legend: {
                                    direction: 'row',
                                    position: { vAlign: 'top', hAlign: 'right' },
                                },
                            }}
                        />
                    </Box>
                </Card>
 
                {/* Users Table Section */}
                <Card sx={{ mb: 4, p: 3, background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.96) 0%, rgba(17, 24, 39, 0.94) 100%)' }}>
                    <Typography variant="h5" sx={{ mb: 3, color: '#f8fafc' }}>
                        Users Overview
                    </Typography>
                    <Box sx={{ height: 450, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            experimentalFeatures={{ newEditingApi: true }}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 8,
                                    },
                                },
                            }}
                            pageSizeOptions={[5, 8, 10]}
                            checkboxSelection
                            disableRowSelectionOnClick
                            sx={{
                                '& .MuiDataGrid-root': {
                                    border: 'none',
                                },
                                '& .MuiDataGrid-cell': {
                                    paddingY: 1.5,
                                },
                                '& .MuiDataGrid-columnHeaders': {
                                    backgroundColor: '#0f172a',
                                    borderBottom: '1px solid rgba(148, 163, 184, 0.12)',
                                },
                            }}
                        />
                    </Box>
                </Card>
 
                {/* Map Section */}
                <Card sx={{ p: 3, overflow: 'hidden' }}>
                    <Typography variant="h5" sx={{ mb: 3 }}>
                        Location Map
                    </Typography>
                    <Box sx={{ height: 500, width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
                        <MapContainer center={[14.604253, 120.984164]} zoom={13} style={{ height: '100%', width: '100%' }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={[14.604253, 120.984164]}>
                                <Popup>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                                            National University Manila
                                        </Typography>
                                        <Typography variant="body2">
                                            551 M.F. Jhocson St, Sampaloc,<br />
                                            Manila, 1008 Metro Manila
                                        </Typography>
                                    </Box>
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </Box>
                </Card>
            </Box>
        </ThemeProvider>
    );
}
 
export default DashboardPage;