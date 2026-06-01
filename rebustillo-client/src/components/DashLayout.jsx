import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { styled, useTheme, alpha, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import Button from '@mui/material/Button';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ArticleIcon from '@mui/icons-material/Article';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 280;

// Modern theme configuration
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
        background: {
            default: '#000000',
            paper: '#000000',
        },
        text: {
            primary: '#f5f5f5',
            secondary: '#d1d5db',
        },
        divider: '#374151',
        action: {
            hover: '#111827',
            selected: 'rgba(255, 255, 255, 0.08)',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h6: { fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.5px', color: '#f5f5f5' },
        h5: { fontWeight: 700, fontSize: '1.5rem', color: '#f5f5f5' },
        body1: { fontSize: '0.95rem', lineHeight: 1.6, color: '#d1d5db' },
    },
    shape: { borderRadius: 12 },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#000000',
                    color: '#f5f5f5',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
                    borderBottom: '1px solid #374151',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#000000',
                    borderRight: '1px solid #374151',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 700,
                    borderRadius: '10px',
                },
            },
        },
    },
});

const dashBoardNavItems = [
    {
        label: "Dashboard",
        title: "Dashboard",
        to: "/dashboard",
        icon: DashboardIcon,
    },
    {
        label: "Reports",
        title: "Reports",
        to: "/dashboard/reports",
        icon: AssessmentIcon,
    },
    {
        label: "Users",
        title: "Users",
        to: "/dashboard/users",
        icon: PeopleIcon,
    },
    {
        label: "Articles",
        title: "Articles",
        to: "/dashboard/articles",
        icon: ArticleIcon,
    },
];

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(8)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#94a3b8',
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#111827',
    border: '1px solid rgba(255, 106, 0, 0.14)',
    '&:hover': {
        backgroundColor: '#161b26',
        borderColor: 'rgba(107, 114, 128, 0.24)',
    },
    '&:focus-within': {
        backgroundColor: '#111827',
        borderColor: '#6b7280',
        boxShadow: '0 0 0 3px rgba(107, 114, 128, 0.12)',
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
    transition: theme.transitions.create('all', {
        duration: theme.transitions.duration.shorter,
    }),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        fontSize: '0.95rem',
        color: '#f5f5f5',
        '&::placeholder': {
            color: '#94a3b8',
            opacity: 1,
        },
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const getPageTitle = (pathname) =>
    dashBoardNavItems.find((item) => item.to === pathname)?.title || "Welcome";

const DashLayout = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const pageTitle = getPageTitle(location.pathname);
    const navigate = useNavigate();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <ThemeProvider theme={dashboardTheme}>
            <Box sx={{ display: 'flex', bgcolor: '#000000', minHeight: '100vh' }}>
                <CssBaseline />
                {/* App Bar */}
                <AppBar position="fixed" open={open} elevation={0}>
                    <Toolbar sx={{ pr: '24px' }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={open ? handleDrawerClose : handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 3,
                                color: '#6b7280',
                                '&:hover': { backgroundColor: 'rgba(107, 114, 128, 0.18)' },
                            }}
                        >
                            {open ? <MenuOpenIcon /> : <MenuIcon />}
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                flexGrow: 1,
                                fontWeight: 700,
                                color: '#f5f5f5',
                                letterSpacing: '-0.5px',
                            }}
                        >
                            {pageTitle}
                        </Typography>
                        {/* Search */}
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                        <Button
                            color="inherit"
                            onClick={handleLogout}
                            endIcon={<LogoutIcon />}
                            sx={{
                                color: '#6b7280',
                                borderColor: '#6b7280',
                                border: '1px solid',
                                ml: 2,
                                '&:hover': {
                                    backgroundColor: 'rgba(107, 114, 128, 0.12)',
                                    borderColor: '#9ca3af',
                                },
                            }}
                        >
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
                {/* Drawer */}
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader>
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#6b7280',
                                fontWeight: 700,
                                mr: open ? 0 : 'auto',
                                opacity: open ? 1 : 0,
                                transition: 'opacity 0.3s',
                            }}
                        >
                            {open ? 'Menu' : ''}
                        </Typography>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? (
                                <ChevronRightIcon />
                            ) : (
                                <ChevronLeftIcon />
                            )}
                        </IconButton>
                    </DrawerHeader>
                    <Divider sx={{ borderColor: '#374151' }} />
                    {/* Drawer List */}
                    <List sx={{ pt: 2 }}>
                        {dashBoardNavItems.map(({ label, to, icon: Icon }) => {
                            const isActive = location.pathname === to;
                            return (
                                <ListItem key={to} disablePadding sx={{ display: 'block', mb: 1 }}>
                                    <ListItemButton
                                        component={Link}
                                        to={to}
                                        selected={isActive}
                                        sx={{
                                            minHeight: 44,
                                            px: 2,
                                            justifyContent: open ? 'initial' : 'center',
                                            borderRadius: '12px',
                                            mx: 1,
                                            color: isActive ? '#6b7280' : '#d1d5db',
                                            backgroundColor: isActive ? 'rgba(107, 114, 128, 0.16)' : 'transparent',
                                            '&:hover': {
                                                backgroundColor: isActive ? 'rgba(107, 114, 128, 0.22)' : 'rgba(255, 255, 255, 0.05)',
                                            },
                                            fontWeight: isActive ? 700 : 500,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 2.5 : 'auto',
                                                justifyContent: 'center',
                                                color: 'inherit',
                                            }}
                                        >
                                            <Icon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={label}
                                            sx={{
                                                opacity: open ? 1 : 0,
                                                '& .MuiListItemText-primary': {
                                                    fontSize: '0.95rem',
                                                    fontWeight: 'inherit',
                                                },
                                            }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#000000' }}>
                    <DrawerHeader />
                    {/* Content */}
                    <Outlet />
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default DashLayout;