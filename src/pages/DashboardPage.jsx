import React, { useState } from 'react';
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

// Modern dashboard theme
const dashboardTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#ffffff',
            light: '#f5f5f5',
            dark: '#d1d5db',
        },
        secondary: {
            main: '#f8fafc',
        },
        success: {
            main: '#9ca3af',
        },
        warning: {
            main: '#6b7280',
        },
        error: {
            main: '#ef4444',
        },
        background: {
            default: '#000000',
            paper: '#000000',
        },
        text: {
            primary: '#ffffff',
            secondary: '#d1d5db',
        },
        divider: '#374151',
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h3: {
            fontWeight: 800,
            fontSize: '1.875rem',
            letterSpacing: '-0.5px',
            marginBottom: '1.5rem',
            color: '#ffffff',
        },
        h5: {
            fontWeight: 700,
            fontSize: '1.25rem',
            letterSpacing: '-0.25px',
            color: '#f5f5f5',
        },
        h6: {
            fontWeight: 600,
            fontSize: '0.875rem',
            color: '#9ca3af',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
        },
        body2: {
            fontSize: '0.95rem',
            color: '#d1d5db',
            lineHeight: 1.6,
        },
    },
    shape: { borderRadius: 14 },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 18px 60px rgba(0, 0, 0, 0.25)',
                    border: '1px solid #374151',
                    backgroundColor: '#000000',
                    '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: '0 26px 70px rgba(0, 0, 0, 0.32)',
                        transition: 'all 0.25s ease',
                    },
                },
            },
        },
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    border: '1px solid #374151',
                    borderRadius: '16px',
                    backgroundColor: '#000000',
                },
                columnHeader: {
                    backgroundColor: '#000000',
                    fontWeight: 700,
                    color: '#ffffff',
                    borderBottom: '1px solid #374151',
                },
                row: {
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    },
                    borderColor: '#374151',
                },
                cell: {
                    color: '#e2e8f0',
                    borderColor: '#374151',
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
    const avgAge = (
        rows.reduce((sum, row) => sum + (row.age || 0), 0) /
        rows.filter((row) => row.age !== null).length
    ).toFixed(1);

    return (
        <ThemeProvider theme={dashboardTheme}>
            <Box sx={{ maxWidth: '1600px', mx: 'auto', pb: 4, color: '#f5f5f5', backgroundColor: '#000000', minHeight: '100vh' }}>
                {/* Page Header */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h3">Dashboard</Typography>
                    <Typography variant="body2" sx={{ mt: 0.5, color: '#cbd5e1' }}>
                        Welcome back! Here's your performance overview.
                    </Typography>
                </Box>

                {/* Summary Cards Section */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {/* Total Users Card */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ p: 3, backgroundColor: '#000000' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Box>
                                    <Typography variant="h6" sx={{ mb: 1.5, color: '#9ca3af' }}>
                                        Total Users
                                    </Typography>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: 800,
                                            fontSize: '2rem',
                                            color: '#ff6a00',
                                        }}
                                    >
                                        {rows.length}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1.5 }}>
                                        <TrendingUpIcon sx={{ fontSize: '1rem', color: '#ffb347', mr: 0.5 }} />
                                        <Typography variant="body2" sx={{ color: '#f59e0b' }}>
                                            12% increase
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>

                    {/* Average Age Card */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ p: 3, backgroundColor: '#000000' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Box>
                                    <Typography variant="h6" sx={{ mb: 1.5, color: '#9ca3af' }}>
                                        Average Age
                                    </Typography>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: 800,
                                            fontSize: '2rem',
                                            color: '#ff8a3c',
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
                                                borderColor: 'rgba(255, 255, 255, 0.16)',
                                                color: '#d1d5db',
                                            }}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>

                    {/* Active Status Card */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ p: 3, backgroundColor: '#000000' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Box>
                                    <Typography variant="h6" sx={{ mb: 1.5, color: '#9ca3af' }}>
                                        Active Users
                                    </Typography>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: 800,
                                            fontSize: '2rem',
                                            color: '#9ca3af',
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
                                                backgroundColor: '#9ca3af',
                                                mr: 0.5,
                                            }}
                                        />
                                        <Typography variant="body2" sx={{ color: '#9ca3af' }}>
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
                        <Card sx={{ p: 3, backgroundColor: '#000000' }}>
                            <Typography variant="h5" sx={{ mb: 3, color: '#f5f5f5' }}>
                                Performance Metrics
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: 2, flexWrap: 'wrap' }}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Gauge
                                        width={140}
                                        height={140}
                                        value={50}
                                        startAngle={-110}
                                        endAngle={110}
                                        sx={{
                                            '& .MuiGauge-arc': {
                                                stroke: '#6b7280',
                                            },
                                            '& .MuiGauge-valueText': {
                                                fill: '#6b7280',
                                            },
                                        }}
                                    />
                                    <Typography variant="body2" sx={{ mt: 1, color: '#d1d5db' }}>
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
                                                stroke: '#9ca3af',
                                            },
                                            '& .MuiGauge-valueText': {
                                                fill: '#9ca3af',
                                            },
                                        }}
                                    />
                                    <Typography variant="body2" sx={{ mt: 1, color: '#d1d5db' }}>
                                        Engagement
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>

                    {/* Pie Chart */}
                    <Grid item xs={12} sm={6}>
                        <Card sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#000000' }}>
                            <Typography variant="h5" sx={{ mb: 3, width: '100%', color: '#f5f5f5' }}>
                                Category Distribution
                            </Typography>
                            <PieChart
                                series={[
                                    {
                                        data: [
                                            { id: 0, value: 30, label: 'Premium', color: '#6b7280' },
                                            { id: 1, value: 25, label: 'Standard', color: '#9ca3af' },
                                            { id: 2, value: 20, label: 'Basic', color: '#d1d5db' },
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
                <Card sx={{ p: 3, mb: 4, backgroundColor: '#000000' }}>
                    <Typography variant="h5" sx={{ mb: 3, color: '#f5f5f5' }}>
                        Quarterly Performance
                    </Typography>
                    <Box sx={{ overflowX: 'auto' }}>
                        <BarChart
                            series={[
                                { data: [35, 44, 24, 34], label: 'Sales', color: '#6b7280' },
                                { data: [51, 6, 49, 30], label: 'Revenue', color: '#9ca3af' },
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
                <Card sx={{ mb: 4, p: 3, backgroundColor: '#000000' }}>
                    <Typography variant="h5" sx={{ mb: 3, color: '#f5f5f5' }}>
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
                                    color: '#e2e8f0',
                                },
                                '& .MuiDataGrid-columnHeaders': {
                                    backgroundColor: '#000000',
                                    borderBottom: '1px solid #374151',
                                    color: '#f5f5f5',
                                },
                                '& .MuiDataGrid-columnHeaderTitle': {
                                    fontWeight: 700,
                                },
                                '& .MuiDataGrid-virtualScroller': {
                                    backgroundColor: '#000000',
                                },
                            }}
                        />
                    </Box>
                </Card>

                {/* Map Section */}
                <Card sx={{ p: 3, overflow: 'hidden', backgroundColor: '#000000' }}>
                    <Typography variant="h5" sx={{ mb: 3, color: '#f5f5f5' }}>
                        Location Map
                    </Typography>
                    <Box sx={{ height: 500, width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
                        <MapContainer center={[14.604253, 120.984164]} zoom={13} style={{ height: '100%', width: '100%' }}>
                            <TileLayer
                                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={[14.604253, 120.984164]}>
                                <Popup>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5, color: '#f5f5f5' }}>
                                            National University Manila
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#d1d5db' }}>
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