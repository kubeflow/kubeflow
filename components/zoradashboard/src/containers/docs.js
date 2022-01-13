import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import matter from 'gray-matter';
import { styled } from '@material-ui/core/styles';
import { DocsContent } from '../components/docs/docs-content';
import { DocsNavbar } from '../components/docs/docs-navbar';
import { DocsSidebar } from '../components/docs/docs-sidebar';

const DocsWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  height: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 256
  }
}));

const DocsContainer = styled('div')((() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%'
})));

export const Docs = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState(false);
  const [file, setFile] = useState(null);

  const getFile = useCallback(async () => {
    try {
      // Allow only paths starting with /docs.
      // If you'll use this on another route, remember to check this part.
      if (!pathname.startsWith('/docs')) {
        navigate('/404', { replace: true });
        return;
      }

      const response = await fetch(`/static${pathname}.md`);

      if (response.status !== 200) {
        navigate(response.status === 404
          ? '/404'
          : '/500', { replace: true });
        return;
      }

      const data = await response.text();

      setFile(matter(data));
    } catch (err) {
      console.error(err);
      navigate('/500');
    }
  }, [pathname]);

  useEffect(() => {
    getFile().catch(console.error);
  }, [pathname]);

  return (
    <>
      <DocsNavbar onSidebarMobileOpen={() => setIsSidebarMobileOpen(true)} />
      <DocsSidebar
        onMobileClose={() => setIsSidebarMobileOpen(false)}
        openMobile={isSidebarMobileOpen}
      />
      <DocsWrapper>
        <DocsContainer>
          {file && <DocsContent file={file} />}
        </DocsContainer>
      </DocsWrapper>
    </>
  );
};
