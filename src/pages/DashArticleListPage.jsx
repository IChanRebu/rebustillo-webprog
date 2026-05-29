import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, Paper, Stack, Switch, TextField, Typography, useMediaQuery } from '@mui/material';
import { useTheme, createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import ArticleIcon from '@mui/icons-material/Article';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { useAuth } from '../context/AuthContext.jsx';
import articlesSeed from '../assets/article-content.js';

const ARTICLES_KEY = 'figura_articles';
const statusOptions = ['active', 'inactive'];

const dashboardTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#6b7280' },
    background: { default: '#000000', paper: '#000000' },
    text: { primary: '#f5f5f5', secondary: '#d1d5db' },
  },
  typography: {
    fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
    h4: { fontWeight: 700, color: '#f5f5f5' },
    body1: { color: '#d1d5db' },
  },
});

const blankForm = {
  name: '',
  title: '',
  image: '',
  contentText: '',
  status: 'active',
};

const parseSeedArticles = () => {
  try {
    return articlesSeed.map((article, index) => ({
      id: article.id ?? index + 1,
      name: String(article.name ?? '').trim(),
      title: String(article.title ?? '').trim(),
      image: String(article.image ?? '').trim(),
      content: Array.isArray(article.content)
        ? article.content.map((item) => String(item).trim()).filter(Boolean)
        : [String(article.content ?? '').trim()].filter(Boolean),
      status: article.status ? String(article.status).trim().toLowerCase() : 'active',
    }));
  } catch {
    return [];
  }
};

const loadArticles = () => {
  try {
    const raw = localStorage.getItem(ARTICLES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    }
    const seedArticles = parseSeedArticles();
    localStorage.setItem(ARTICLES_KEY, JSON.stringify(seedArticles));
    return seedArticles;
  } catch {
    return parseSeedArticles();
  }
};

const saveArticles = (articles) => {
  localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles));
};

const getPreview = (content) => {
  const excerpt = Array.isArray(content) ? String(content[0] || '') : String(content || '');
  return excerpt.length > 90 ? `${excerpt.slice(0, 90)}...` : excerpt;
};

const DashArticleListPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { currentUser } = useAuth();
  const [articles, setArticles] = useState(loadArticles());
  const [form, setForm] = useState(blankForm);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  if (!currentUser) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ mb: 2, color: '#fff' }}>
          Access denied
        </Typography>
        <Typography sx={{ color: '#d1d5db', mb: 3 }}>
          You must be signed in as an admin to manage articles.
        </Typography>
        <Button component={Link} to="/auth/signin" variant="contained" sx={{ backgroundColor: '#6b7280' }}>
          Go to Sign In
        </Button>
      </Box>
    );
  }

  const resetForm = () => {
    setForm(blankForm);
    setErrors({});
    setEditingId(null);
  };

  const handleOpenModal = (article = null) => {
    const contentText = article ? article.content.join('\n').trim() : '';
    setEditingId(article ? article.id : null);
    setForm(article ? { ...article, contentText } : blankForm);
    setErrors({});
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    resetForm();
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const validation = {};
    if (!form.name.trim()) validation.name = 'Article slug is required.';
    if (!form.title.trim()) validation.title = 'Article title is required.';
    if (!form.contentText.trim()) validation.contentText = 'Article content is required.';
    return validation;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }

    const normalizedName = form.name.trim().replace(/\s+/g, '-').toLowerCase();
    const contentArray = form.contentText
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    const existing = articles.some(
      (article) => article.id !== editingId && article.name === normalizedName
    );
    if (existing) {
      setErrors({ name: 'An article with this slug already exists.' });
      return;
    }

    const updatedArticles = editingId
      ? articles.map((article) =>
          article.id === editingId
            ? {
                ...article,
                name: normalizedName,
                title: form.title.trim(),
                image: form.image.trim(),
                content: contentArray,
                status: form.status,
              }
            : article
        )
      : [
          ...articles,
          {
            id: articles.reduce((max, article) => Math.max(max, article.id), 0) + 1,
            name: normalizedName,
            title: form.title.trim(),
            image: form.image.trim(),
            content: contentArray,
            status: form.status,
          },
        ];

    saveArticles(updatedArticles);
    setArticles(updatedArticles);
    handleCloseModal();
  };

  const toggleStatus = (id) => {
    const updated = articles.map((article) =>
      article.id === id
        ? { ...article, status: article.status === 'active' ? 'inactive' : 'active' }
        : article
    );
    saveArticles(updated);
    setArticles(updated);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleStatusFilter = (event) => {
    setStatusFilter(event.target.value);
  };

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const searchLower = search.trim().toLowerCase();
      const matchText = [article.name, article.title, article.status].join(' ').toLowerCase();
      const statusMatch = statusFilter ? article.status === statusFilter : true;
      return matchText.includes(searchLower) && statusMatch;
    });
  }, [articles, search, statusFilter]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Slug', width: 180 },
    { field: 'title', headerName: 'Title', width: 240, flex: 1 },
    {
      field: 'paragraphs',
      headerName: 'Paragraphs',
      width: 120,
      valueGetter: (params) => (Array.isArray(params?.row?.content) ? params.row.content.length : 0),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value === 'active' ? 'Active' : 'Inactive'}
          color={params.value === 'active' ? 'success' : 'default'}
          size="small"
          sx={{ textTransform: 'capitalize' }}
        />
      ),
    },
    {
      field: 'preview',
      headerName: 'Preview',
      width: 280,
      sortable: false,
      valueGetter: (params) => getPreview(params?.row?.content),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 210,
      sortable: false,
      renderCell: (params) => {
        const row = params?.row || {};
        return (
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              size="medium"
              onClick={() => handleOpenModal(row)}
              startIcon={<EditIcon />}
              sx={{ minWidth: 110, backgroundColor: '#1f2937' }}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              size="medium"
              onClick={() => toggleStatus(row.id)}
              startIcon={row.status === 'active' ? <ToggleOffIcon /> : <ToggleOnIcon />}
              sx={{ color: '#f5f5f5', borderColor: '#374151' }}
            >
              {row.status === 'active' ? 'Disable' : 'Activate'}
            </Button>
          </Stack>
        );
      },
    },
  ];

  return (
    <ThemeProvider theme={dashboardTheme}>
      <Box sx={{ color: '#f5f5f5' }}>
        <Stack direction={isMobile ? 'column' : 'row'} justifyContent="space-between" alignItems="center" sx={{ mb: 4, gap: 2 }}>
          <Box>
            <Typography variant="h4">Article Management</Typography>
            <Typography sx={{ color: '#9ca3af', mt: 1 }}>
              Create, edit, and publish articles that also appear on the public article page.
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenModal()}
            sx={{ backgroundColor: '#6b7280' }}
          >
            Add Article
          </Button>
        </Stack>

        <Paper sx={{ p: 3, mb: 3, backgroundColor: '#000000', border: '1px solid #374151' }}>
          <Stack direction={isMobile ? 'column' : 'row'} spacing={2} alignItems="center">
            <TextField
              label="Search articles"
              variant="filled"
              value={search}
              onChange={handleSearch}
              fullWidth
              InputProps={{ sx: { backgroundColor: '#111827', color: '#f5f5f5' } }}
            />
            <TextField
              select
              label="Status"
              variant="filled"
              value={statusFilter}
              onChange={handleStatusFilter}
              sx={{ width: isMobile ? '100%' : 200, backgroundColor: '#111827' }}
              InputProps={{ sx: { color: '#f5f5f5' } }}
            >
              <MenuItem value="">All statuses</MenuItem>
              {statusOptions.map((status) => (
                <MenuItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </Paper>

        <Paper sx={{ height: 620, p: 2, backgroundColor: '#000000', border: '1px solid #374151' }}>
          <DataGrid
            rows={filteredArticles}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 20]}
            disableSelectionOnClick
            sx={{
              color: '#f5f5f5',
              '.MuiDataGrid-cell': { borderColor: '#1f2937' },
              '.MuiDataGrid-columnHeaders': { backgroundColor: '#111827' },
              '.MuiDataGrid-footerContainer': { borderColor: '#1f2937' },
            }}
          />
        </Paper>

        <Dialog open={modalOpen} onClose={handleCloseModal} fullWidth maxWidth="sm">
          <DialogTitle>{editingId ? 'Edit Article' : 'Add Article'}</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                label="Slug"
                name="name"
                value={form.name}
                onChange={handleFormChange}
                error={Boolean(errors.name)}
                helperText={errors.name}
                fullWidth
                variant="filled"
                InputProps={{ sx: { backgroundColor: '#111827', color: '#f5f5f5' } }}
              />
              <TextField
                label="Title"
                name="title"
                value={form.title}
                onChange={handleFormChange}
                error={Boolean(errors.title)}
                helperText={errors.title}
                fullWidth
                variant="filled"
                InputProps={{ sx: { backgroundColor: '#111827', color: '#f5f5f5' } }}
              />
              <TextField
                label="Image URL"
                name="image"
                value={form.image}
                onChange={handleFormChange}
                fullWidth
                variant="filled"
                InputProps={{ sx: { backgroundColor: '#111827', color: '#f5f5f5' } }}
              />
              <TextField
                label="Content paragraphs"
                name="contentText"
                value={form.contentText}
                onChange={handleFormChange}
                error={Boolean(errors.contentText)}
                helperText={errors.contentText || 'Enter each paragraph on a new line.'}
                fullWidth
                multiline
                minRows={4}
                variant="filled"
                InputProps={{ sx: { backgroundColor: '#111827', color: '#f5f5f5' } }}
              />
              <TextField
                select
                label="Status"
                name="status"
                value={form.status}
                onChange={handleFormChange}
                variant="filled"
                InputProps={{ sx: { backgroundColor: '#111827', color: '#f5f5f5' } }}
              >
                {statusOptions.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={handleCloseModal} variant="outlined" sx={{ color: '#f5f5f5', borderColor: '#374151' }}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: '#6b7280' }}>
              Save Article
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default DashArticleListPage;