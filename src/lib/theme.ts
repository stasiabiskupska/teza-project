export const getThemeFromJob = (job: Frontier.Job) => ({
    color: {
      primary: job.theme.primary_color || '#3f51b5',
      secondary: job.theme.secondary_color || '#f50057',
      background: job.theme.background_color || '#fafafa',
      text: job.theme.text_color || 'rgba(0, 0, 0, 0.87)',
      contrastText: '#fff',
      error: '#ed2939',
    },
  });
  